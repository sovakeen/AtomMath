from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse
from django.core.mail import EmailMessage
from django.views.decorators.csrf import csrf_exempt
from django.core import serializers
from django.contrib import messages
from django.conf import settings
from datetime import datetime
from pathlib import Path
import csv
import json
import os

from .models import Term


def index(request):
    term_list = Term.objects.order_by("id")
    shorts = {"Term": "Def", "Theorem": "The", "Article": "Art", "Undefined": "Und", "Example": "Exp"}
    return render(request, "summary_app/index.html", { "term_list": term_list, "shorts": shorts })


def add(request):
    return render(request, "summary_app/add.html", { "term_types": Term.Type.labels })


def read(request, term_id):
    term = get_object_or_404(Term, pk=term_id)
    prev = Term.objects.filter(id__lt=term_id).order_by("id").last()
    next = Term.objects.filter(id__gt=term_id).order_by("id").first()
    return render(request, "summary_app/read.html", { "term": term, "next": next, "prev": prev })


def edit(request, term_id):
    term = get_object_or_404(Term, pk=term_id)
    return render(request, "summary_app/edit.html", { "term": term, "term_types": Term.Type.labels })


def sequential(request):
    term_list = Term.objects.order_by("id")
    return render(request, "summary_app/sequential.html", { "term_list": term_list })


def test(request, data={}):
    return render(request, "summary_app/test.html", { "result": data })


def backup(request):
    return render(request, "summary_app/backup.html")


# Functions listed below are not actually views representing pages but request processors


def add_term(request):
    try:
        term = Term(name=request.POST['term_name'], definition=request.POST['term_definition'], type=request.POST['term_type'])
    except KeyError:
        return render(request, "summary_app/add.html", { "error_message": "KEY ERROR" })
    else:
        term.save()
        return redirect("summary_app:add")
    

# why redirect is not working (mb problem with args form)?
def modify_term(request, term_id):
    term = get_object_or_404(Term, pk=term_id)
    term.name = request.POST['term_name']
    term.definition = request.POST['term_definition']
    term.type = request.POST['term_type']
    entered_id = request.POST['term_id']
    if str(term_id) == entered_id or not Term.objects.filter(pk=entered_id).exists():
        term.pk = entered_id
        Term.objects.filter(pk=term_id).delete()
        term.save()
        return HttpResponseRedirect(reverse("summary_app:read", args=(entered_id,)))
    else:
        return redirect(reverse("summary_app:edit", args=[term_id]) + "?error=id_exists")


def delete_all(request):
    Term.objects.all().delete()
    return redirect("summary_app:index")


def delete_term(request, term_id):
    term = get_object_or_404(Term, pk=term_id)
    term.delete()
    return redirect("summary_app:index")


# doesn't redirect, so url remains .../exec_sql/
def execute_raw_sql(request):
    sql_query = request.POST["sql_query"]
    res = Term.objects.raw(sql_query)
    return render(request, "summary_app/test.html", { "result": res, "res_dict": res.__dict__, "item_dict": res[0].__dict__ }) # add/rem "item_dict" makes diff
    # return test(request, res)
    # return redirect("summary_app:test")   # why use redirect?


def send_backup(request):
    email = EmailMessage(
        request.POST["mail_topic"],
        "Sending data backup for " + str(datetime.now()) + ". Provided text comment:\n" + request.POST["mail_text"],
        "from@example.com",
        ["rabykin2005@gmail.com"],
        []
    )
    email.attach_file(Path(__file__).parent.parent.absolute().joinpath('db.sqlite3'))
    email.send(fail_silently=False)
    return redirect("summary_app:index")


# to deprecate or to replace csv with json
def prepopulate(request):
    Term.objects.all().delete()
    with open(Path(__file__).parent.parent.absolute().joinpath('example_data.csv'), 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            Term.objects.create(
                id=row['id'],
                name=row['name'],
                definition=row['definition'],
                type=row['type']
            )
    return redirect("summary_app:index")


@csrf_exempt
def swap_terms(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        id1, id2 = data['id1'], data['id2']
        # id1, id2 = request.POST['id1'], request.POST['id2']
        try:
            term1, term2 = Term.objects.get(id=id1), Term.objects.get(id=id2)
            term1.id, term2.id = term2.id, term1.id
            term1.save()
            term2.save()
            return JsonResponse({'status': 'success'})
        except Term.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Term not found'}, status=404)
    return JsonResponse({'status': 'error', 'message': 'Invalid request'}, status=400)


def export_terms(request):
    try:
        # Serialize Term objects to JSON
        terms = Term.objects.all()
        serialized_data = serializers.serialize('json', terms, indent=2)
        # Create HTTP response with JSON content
        response = HttpResponse(serialized_data, content_type='application/json')
        # Trigger download with a default filename
        response['Content-Disposition'] = 'attachment; filename=\"terms.json\"'
        return response
    except Exception as e:
        messages.error(request, f'Error exporting: {str(e)}')
        return redirect('summary_app:index')


def import_terms(request):
    json_file = request.FILES['json_file']
    try:
        data = json_file.read().decode('utf-8')
        for obj in serializers.deserialize('json', data):
            obj.save()
        messages.success(request, 'Successfully imported Terms')
        return redirect('summary_app:index')
    except Exception as e:
        messages.error(request, f'Error importing: {str(e)}')

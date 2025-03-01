from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse
from django.core.mail import EmailMessage
from datetime import datetime
from pathlib import Path

from .models import Term


def index(request):
    term_list = Term.objects.order_by("id")
    return render(request, "summary_app/index.html", { "terms_list": term_list })


def test(request, data={}):
    return render(request, "summary_app/test.html", { "result": data })


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


#   Functions listed below are not actually views representing pages but request processors


def add_term(request):
    try:
        term = Term(name=request.POST['term_name'], definition=request.POST['term_definition'], type=request.POST['term_type'])
    except KeyError:
        return render(request, "summary_app/add.html", { "error_message": "KEY ERROR" })
    else:
        term.save()
        return redirect("summary_app:add")


def delete_all(request):
    Term.objects.all().delete()
    return redirect("summary_app:index")


def delete_term(request, term_id):
    term = get_object_or_404(Term, pk=term_id)
    term.delete()
    return redirect("summary_app:index")


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


# to deprecate (prepopulate from some file)
def prepopulate(request):
    Term(name="Def 1.3 \"$\\sigma$-алгебра (сигма-алгебра)\"", definition="$\\sigma$-алгеброй (сигма-алгеброй) называется алгебра $\\mathscr{A}$ такая, что $A_n \\in \\mathscr{A} ~ \\forall ~ n \\in N \\Rightarrow \\bigcup_{n=1}^{\\infty} A_n \\in \\mathscr{A}$.").save()
    Term(name="Def 1.7 \"Произведение (пересечение) событий $A$ и $B$\"", definition='Произведением (пересечение) событий $A$ и $B$ называется событие, обозначаемое $A \\cap B$ или $A B$, которое происходит тогда и только тогда, когда одновременно происходят события $A$ и $B$.').save()
    Term(name="Глава 1 Дубль 1", definition="smth", type=Term.Type.SECTION).save()
    Term(name=r'Def 1.8 "Несовместные события"', definition=r'События $A$ и $B$ назовём несовместными, если $A \cap B=\varnothing$ (т. е. вместе произойти они не могут).').save()
    Term(name=r'Def 1.9 "Сумма (объединение) событий $A$ и $B$"', definition=r'Суммой (объединением) событий $A$ и $B$ назовём событие, обозначаемое $A \cup B$ или $A+B$ (в случае, когда они несовместны), которое происходит тогда и только тогда, когда происходят $A$ или $B$, или оба вместе.').save()
    Term(name=r'Def 1.10 "Разность событий $A$ и $B$"', definition=r'Разностью событий $A$ и $B$ назовём событие $A \backslash B$, происходящее тогда и только тогда, когда произошло $A$, но не произошло $B$.').save()
    Term(name="Test term 1", definition="$\\int_{-\\infty}^\\infty\\xi\\,e^{2 \\pi i \\xi x}\\,d\\xi$").save()
    Term(name="Test term 2", definition="$$\\int_{-\\infty}^\\infty\\xi\\,e^{2 \\pi i \\xi x}\\,d\\xi$$").save()
    return redirect("summary_app:index")


# doesn't redirect, so url remains .../exec_sql/
def execute_raw_sql(request):
    sql_query = request.POST['sql_query']
    res = Term.objects.raw(sql_query)
    return render(request, "summary_app/test.html", { "result": res })
    # return test(request, res)
    # return redirect("summary_app:test")   # why use redirect?


def send_backup(request):
    email = EmailMessage(
        "Django data backup",
        "Sending data backup for " + str(datetime.now()),
        "from@example.com",
        ["rabykin2005@gmail.com"],
        []
    )
    email.attach_file(Path(__file__).parent.parent.absolute().joinpath('db.sqlite3'))
    email.send(fail_silently=False)
    return redirect("summary_app:test")
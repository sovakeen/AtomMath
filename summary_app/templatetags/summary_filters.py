from django import template
from django.utils.html import conditional_escape
from django.utils.safestring import mark_safe
from django.urls import reverse
from django.template.defaultfilters import stringfilter
from ..models import Term

register = template.Library()

@register.filter(is_safe=True)
@stringfilter
def link_terms(value, current_term_id=None):
    # Get all terms except current one
    terms = Term.objects.exclude(id=current_term_id) if current_term_id else Term.objects.all()
    
    # Sort terms by name length (longest first) to avoid partial matches
    terms = sorted(terms, key=lambda x: len(x.name), reverse=True)
    
    # For each term, replace its occurrences with a link
    for term in terms:
        term_name = term.name
        link = f'<a style="background-color: cyan;" href="{reverse("summary_app:read", args=[term.id])}">{term_name}</a>'
        # Case-insensitive replacement
        value = value.replace(term_name.lower(), link.lower())
        value = value.replace(term_name.upper(), link.upper())
        value = value.replace(term_name, link)
    
    return mark_safe(value)

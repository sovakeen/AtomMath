from django.db import models
import os
import json


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SHORTCUTS_FILE = os.path.join(BASE_DIR, 'static', 'type_shortcuts', 'type_shortcuts.json')

with open(SHORTCUTS_FILE, 'r') as f:
    SHORTCUTS = json.load(f)

TERM_TYPE_3L_SHORTCUTS = SHORTCUTS['3L_shortcuts']
TERM_TYPE_2L_SHORTCUTS = SHORTCUTS['2L_shortcuts']

class Term(models.Model):
	class Type(models.TextChoices):
		UNSPECIFIED = "Unspecified",
		SECTION = "Section",
		TERM = "Term",
		ARTICLE = "Article",
		EXAMPLE = "Example",
		THEOREM = "Theorem"

	type = models.CharField(max_length=20, choices=Type, default=Type.UNSPECIFIED)
	name = models.CharField(max_length=100)
	definition = models.CharField(max_length=1000)

	def short_type_3L(self):
		return TERM_TYPE_3L_SHORTCUTS.get(self.type, "Unk")

	def short_type_2L(self):
		return TERM_TYPE_2L_SHORTCUTS.get(self.type, "??")

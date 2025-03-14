from django.db import models
from .static.type_shortcuts import Term_type_3L_shortcuts 

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

	def short_type(self):
		# return Term_type_3L_shortcuts.__members__[self.type]
		return Term_type_3L_shortcuts.__dict__[self.type]

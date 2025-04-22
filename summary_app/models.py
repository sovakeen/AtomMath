from django.db import models
# from enum import Enum


class Term_type_3L_shortcuts():
		Unspecified = "Unk"
		Term = "Def"
		Article = "Art"
		Example = "Exm"
		Theorem = "The"

class Term_type_2L_shortcuts():
	Unspecified = "??"
	Term = "Df"
	Article = "Ar"
	Example = "Ex"
	Theorem = "Lw"


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
		# return Term_type_3L_shortcuts.__members__[self.type]
		return Term_type_3L_shortcuts.__dict__[self.type]
	
	def short_type_2L(self):
		return Term_type_2L_shortcuts.__dict__[self.type]

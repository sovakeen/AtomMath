from django.db import models

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

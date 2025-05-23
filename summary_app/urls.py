from django.urls import path

from . import views


app_name = "summary_app"
urlpatterns = [
    path("", views.index, name="index"),
    path("test/", views.test, name="test"),
    path("add/", views.add, name="add"),
    path("<int:term_id>/", views.read, name="read"),
    path("<int:term_id>/edit/", views.edit, name="edit"),
    path("sequential/", views.sequential, name="sequential"),
    path("backup/", views.backup, name="backup"),

    # urls below are for processing functions, not for actual views

    path("add_term/", views.add_term, name="add_term"),
    path("delete_all/", views.delete_all, name="delete_all"),
    path("delete_term/<int:term_id>/", views.delete_term, name="delete_term"),
    path("modify_term/<int:term_id>/", views.modify_term, name="modify_term"),
    path("execute_raw_sql/", views.execute_raw_sql, name="execute_raw_sql"),
    path("send_backup/", views.send_backup, name="send_backup"),
    path("prepopulate/", views.prepopulate, name="prepopulate"),
    path('swap_terms/', views.swap_terms, name='swap_terms'),
    path('export_terms/', views.export_terms, name='export_terms'),
    path('import_terms/', views.import_terms, name='import_terms'),
]

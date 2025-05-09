# AtomMath

AtomMath is a Django web application for learning math disciplines through concise summaries, broken down into atomic "terms" (definitions, theorems, examples, etc).
   
To install this project, just run

```bash
git clone https://github.com/sovakeen/AtomMath.git
```

# Hosting

Following steps were followed to host project on PythonAnywhere:

- settings.py project file was configured:
   - "DEBUG" in settings.py was set to "False"
   - "sovakeen.pythonanywhere.com" was added to "ALLOWED_HOSTS"
   - "STATIC_ROOT" was specified
- project was set up on pythonanywhere.com:
   - project files were uploaded via GitHub (4pa branch)
   - paths to source code and static files were specified
   - static files URL was set to "/static/"
   - following commands were run in bash console in project dir: 
      ```bash
      git checkout 4pa
      python3 manage.py migrate
      python3 manage.py collectstatic
      ```
   - configured wsgi file
   - also password protection was set (for debug)
   - finally, reloaded site for changes to take effect


### Install
Python3 is required.  
```sh
pip install -r requirements.txt
```

### Init db
```sh
python manage.py makemigrations
python manage.py migrate
python manage.py loaddata data.json
```

### Run

```sh
python manage.py runserver
```
The superuser is `admin` with password `admin1234`


### TODO
 - Implement CRUD (Create, Read, Update, Delete) views for:
	 - [x] Contest `/api/contest`
	 - [x] Juror `/api/Juror`
	 - [x] Round `/api/round`
	 - [x] Series `/api/series`
	 - [x] Participant `/api/participant`
	 - [x] Grade `/api/grade`
 - [ ] Documentation for endpoints
 - [ ] Login in `/api/auth` using `oauth2_provider`
 - [ ] Permissions
 - [ ] Voting logic accesible via `/vote` endpoint

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


### OAuth2 Login
To obtain a token:  
```sh
 curl -X POST -d "grant_type=password&username=admin&password=admin1234" -u"36jJ6SE8lVSkfeT9loQ7nii5b17szZDIL8Y82WFi:5C2iKsLzRlkwnkulqFgmvf4rkdECDHlVpMV50nJhNltzCDcz5DFV4bybz523uN5hASKxQoqomzvjzoiVw34KyZVUCWDVt6GoSnSlJhuoSQmhi76J99WE8GwpXl14p2YX" http://localhost:8000/api/auth/token/
```
Then to access a resource:
```sh
 curl -X GET \
   http://localhost:8000/api/contest/ \
   -H 'authorization: Bearer <access_token>' \
   -H 'cache-control: no-cache' \
   -H 'content: application/json' \

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

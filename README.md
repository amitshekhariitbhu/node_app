# NODE.JS APPLICATION
This application is mainly for testing purposes.
### Installing and running this app
```sh
$ brew install node
```
```sh
$ git clone https://github.com/amitshekhariitbhu/node_app.git
```
```sh
$ cd node_app
```
```sh
$ vim config.json
```
Copy and paste this in config.json , configure it with your password, username , database name and save it.
```sh
{
  "production": {
    "database": {
      "host": "host",
      "user": "username",
      "pwd": "password",
      "db": "database name"
    }
  },
  "development": {
    "database": {
      "host": "host",
      "user": "username",
      "pwd": "password",
      "db": "database name"
    }
  }
}
```
```sh
$ npm install
```
```sh
$ node bin/www
```
### Now you can make api request on 
http://localhost:3000/api
## API DOCUMENTATION
### GET REQUEST API
```sh
/getAllUsers/{pageNumber}

Input :
pageNumber to be provided as path parameter.
limit can be provided as query parameter.

Output :
JsonArray of users data if success
 [
    {
        "id": 1,
        "firstname": "Amit",
        "lastname": "Shekhar"
    },
    {
        "id": 2,
        "firstname": "Rohit",
        "lastname": "Kumar"
    },
    {
        "id": 3,
        "firstname": "Mohit",
        "lastname": "Kumar"
    }
]
```

```sh
/getAnUser/{userId}

Input :
userId to be provided as path parameter.

Output :
JsonObject of an user data if success
 {
    "message": "Success",
    "id": 1,
    "firstname": "Amit",
    "lastname": "Shekhar"
}
```

```sh
/checkForHeader

Input :
token to be provided in header.
valid token is 1234

Output :
If token is valid it returns the same token otherwise unauthorized
 {
    "message": "Success",
    "token": "1234"
}
or
{
    "status": 401,
    "message": "unauthorized"
}
```
### POST REQUEST API
```sh
/createAnUser

Input :
firstname
lastname

Output :
It firstname and lastname is valid it returns the id with which it is created otherwise badRequest.
{
    "message": "Success",
    "id": 27
}
```

```sh
/checkForHeader

Input :
token to be provided in header.
valid token is 1234

Output :
If token is valid it returns the same token otherwise unauthorized
{
    "message": "Success",
    "token": "1234"
}
or
{
    "status": 401,
    "message": "unauthorized"
}
```

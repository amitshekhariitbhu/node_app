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
$ node server.js
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
{
  "status_code": "success",
  "message": "success",
  "data": [
    {
      "id": 1,
      "firstname": "Amit",
      "lastname": "Shekhar"
    },
    {
      "id": 2,
      "firstname": "Lionel",
      "lastname": "Messi"
    }
  ]
}
```

```sh
/getAnUser/{userId}

Input :
userId to be provided as path parameter.

Output :
JsonObject of an user data if success
{
  "status_code": "success",
  "message": "success",
  "data": {
    "id": 1,
    "firstname": "Amit",
    "lastname": "Shekhar"
  }
}
```

```sh
/checkForHeader

Input :
token to be provided in header.
valid token is 1234

Output :
If token is valid it returns the same token otherwise failed
{
  "status_code": "success",
  "message": "token is valid"
}
or
{
  "status_code": "failed",
  "message": "token is invalid"
}
```
### POST REQUEST API
```sh
/createAnUser

Input :
firstname
lastname

Output :
It firstname and lastname is valid it returns the id with which it is created otherwise failed.
{
  "status_code": "success",
  "message": "User Created Successfully.",
  "data": {
    "id": 1,
    "firstname": "Amit",
    "lastname": "Shekhar"
  }
}
```

```sh
/checkForHeader

Input :
token to be provided in header.
valid token is 1234

Output :
If token is valid it returns the same token otherwise failed
{
  "status_code": "success",
  "message": "token is valid"
}
or
{
  "status_code": "failed",
  "message": "token is invalid"
}
```

## UPLOAD IMAGE ENDPOINT
http://localhost:3000/upload
```sh
Input :
image(as key) - image file which is less than 20 MB

Output :
{
  "status_code": "success",
  "message": "Image Uploaded Successfully"
}
or
{
  "status_code": "failed",
  "message": "Invalid Image Upload Request"
}
```
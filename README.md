# API Specification

## Users
***
**Request**
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`POST /user`
    <br />
**Errors**
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- **400** -- Must send email and password
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- **409** -- User already exists
    <br />
**Header**
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Accept: application/x-www-form-urlencoded`
    <br />
**Body**
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`email=testemail8@test.com&password=1234`
    <br />
**Response**
``` json
{
  "__v": 0,
  "email": "testemail8@test.com",
  "password": "1234",
  "signupDate": "2017-02-03T18:42:08.195Z",
  "admin": false,
  "_id": "5894cf00ccb0df2bbb1d1bdb",
  "jobs": []
}
```
***
**Request**
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`GET /user`
    <br />
**Errors**
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- **400** -- Must send email and password
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- **404** -- User not found
    <br />
**Query**
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`email=testemail8@test.com&password=1234`
    <br />
**Response**
``` json
{
  "_id": "5894cf00ccb0df2bbb1d1bdb",
  "email": "testemail8@test.com",
  "password": "1234",
  "signupDate": "2017-02-03T18:42:08.195Z",
  "admin": false,
  "__v": 1,
  "jobs": [
    "5894d08f2141b92d1e3319d6"
  ]
}
```
## Jobs
***
**Request**
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`POST /job`
    <br />
**Errors**
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- **400** -- Must send job title, company name, and user ID
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- **500** -- Internal Error
    <br />
**Header**
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`Accept: application/x-www-form-urlencoded`
    <br />
**Body**
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`userID=5894cf00ccb0df2bbb1d1bdb&title=Cook&company=Outback&url=www.outback.com`
    <br />
**Response**
``` json
{
  "__v": 0,
  "title": "Cook",
  "company": "Outback",
  "url": "www.outback.com",
  "_id": "5894d08f2141b92d1e3319d6"
}
```
***
**Request**
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`GET /job`
    <br />
**Errors**
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- **400** -- Must send job ID
    <br />
**Query**
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`id=5894d08f2141b92d1e3319d6`
    <br />
**Response**
``` json
{
  "__v": 0,
  "title": "Cook",
  "company": "Outback",
  "url": "www.outback.com",
  "_id": "5894d08f2141b92d1e3319d6"
}
``` 

***
**Request**
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`GET /jobsforuser`
    <br />
**Errors**
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- **400** -- Must user ID
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-- **404** -- Jobs not found
    <br />
**Query**
    <br />
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`id=589b3c19a012bb133d1d49e5`
    <br />
**Response**
``` json
[ { "_id": "589b3c19a012bb133d1d49e6",
    "_creator": "589b3c19a012bb133d1d49e5",
    "title": "job-title",
    "company": "company-name",
    "__v": 0 },
  { "_id": "589b3c19a012bb133d1d49e7",
    "_creator": "589b3c19a012bb133d1d49e5",
    "title": "job-title2",
    "company": "company-name2",
    "__v": 0 } ]
```  



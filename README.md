##### Routing : Express
##### ORM Database : Sequelize
##### Authentication : Passport, JWT

##### Install Node Modules
    npm install

##### db configs
/configs/config.js

##### URL:

```
localhost:3000/v1
https://twback.herokuapp.com/v1
```

###### users
```
/users/create
POST
{
	"first":"xxx",
	"middle":"xxxx",
	"last":"xxx",
	"email":"xxx@xx.xx",
	"id_number":"xxxxx",
	"phone":"xxx",
	"password":"xxx"
}

Results
{
    "message": "Successfully created new user.",
    "user": {
        "id": "xxxx",
        "first": "xxx",
        "middle": "xxx",
        "last": "xxx",
        "email": "xxx",
        "id_number": "xxx",
        "phone": "xxx",
        "password": "xxxx",
        "updatedAt": "2018-07-09T12:24:44.141Z",
        "createdAt": "2018-07-09T12:24:44.141Z"
    },
    "token": "Bearer xxxx",
    "success": true
}
/users/login

{
	"email":"xxx@xx.xx",
	"password":"xxx"
}
or
{
	"phone":"xxx",
	"password":"xxx"
}

Results
{
    "token": "Bearer xxx",
    "user": {
        "id": "xxxx",
        "first": "xxxx",
        "middle": "xxx",
        "last": "xxx",
        "id_number": "xxxx",
        "email": "xxxx",
        "phone": "xx",
        "password": "xxxx",
        "createdAt": "2018-07-09T12:24:44.000Z",
        "updatedAt": "2018-07-09T12:24:44.000Z"
    },
    "success": true
}
/users/get
GET :: [{"key":"Authorization","type":"text","name":"Authorization","value":"Bearer xxxxxx"}]

Results
{
    "user": {
        "id": "xxxx",
        "first": "xxxx",
        "middle": "xxx",
        "last": "xxx",
        "id_number": "xxxx",
        "email": "xxxx",
        "phone": "xx",
        "password": "xxxx",
        "createdAt": "2018-07-09T12:24:44.000Z",
        "updatedAt": "2018-07-09T12:24:44.000Z"
    },
    "success": true
}
/users/update

--provide the fields for editing

Results
{
    "message": "Updated User: xxx@xxx.xxx",
    "success": true
}
```
###### Users Info

/user_info/get
```
GET :: [{"key":"Authorization","type":"text","name":"Authorization","value":"Bearer xxxxxx"}]

Results
{
    "user": {
            "id": "xxx",
            "nationality": "xxx",
            "date_of_birth": "xxx",
            "gender": "xxx",
            "branch": "xxx",
            "occupation": "xxx",
            "createdAt": "2018-07-11T09:48:02.000Z",
            "updatedAt": "2018-07-11T09:48:02.000Z",
            "userId": "xxx"
    },
    "success": true
}
```

```
/user_info/create
POST :: [{"key":"Authorization","type":"text","name":"Authorization","value":"Bearer xxxxxx"}]
{
	"nationality":"kenyan",
	"date_of_birth": "xx-xx-xxxx",
    "gender": "xxx",
    "branch": "xxx",
    "occupation": "xxx"
}

Results
```

```
/user_info/update
POST :: [{"key":"Authorization","type":"text","name":"Authorization","value":"Bearer xxxxxx"}]

{
	"nationality":"kenyan",
	"date_of_birth": "xx-xx-xxxx",
    "gender": "xxx",
    "branch": "xxx",
    "occupation": "xxx"
}

Results
{
    "message": "User Info Update ",
    "success": true
}
```

###### Users Beneficiary Info

```
/user_beneficiary/create
POST :: [{"key":"Authorization","type":"text","name":"Authorization","value":"Bearer xxxxxx"}]
{
	"first"     : "xxx",
    "middle"    : "xxx",
    "last"      : "xxx",
    "relation"  : "xxx",
    "id_number" : "xxx",
    "email"     : "xxx@xxx.xxx",
    "phone" 	: "xxx"
}

Results
{
    "message": "Successfully Added User Beneficiary.",
    "user": {
        "id": "xxx",
        "first": "xxx",
        "middle": "xxx",
        "last": "xxx",
        "relation": "xxx",
        "id_number": "xxx",
        "email": "xxx@xxx.xxx",
        "phone": "xxx",
        "userId": "xxx",
        "updatedAt": "2018-07-12T14:19:04.622Z",
        "createdAt": "2018-07-12T14:19:04.622Z"
    },
    "success": true
}
```

80%
webservice 
two weeks
security to end

1k for every missed call/interaction

##########MPESA
go to daraja get started
safaricom github


prompt from site
->lipa na mpesa(mpesa express)

apifeedback@safaricom.co.ke













*Hey Guys,*
*So we Need to have a complete process flow of the system, with a dummy account for mpesa and have maturity*

*Lets Do this LEO*

auth false

#####Next meeting wednesday



#####CHANGES
```
- [x] add bank info on profile (acc no, acc name, branch, )
- [ ] add a prompt if one does not have a bank info filled and he tries to do withdrawal.   
- [ ] add prefilled on gender and branches 
- [ ] on policy assign beneficiary to policy
- [ ] take client to transactions after creatin a policy
- [ ] give client notifications on all created policy that no action has taken place on them
- [ ] assign to admin to move cash 
- [ ] include bulk notifications platform on admin
- [ ] base graph colors on maturity, red if not , green if mature  with a tick .
- [ ] pop up on with withdrawal info
- [ ] note payment of cash is done after 3-4 days of request, a client to get notification ion day     of cash is deposited.
- [ ] if policy is mature and client has not withdrawn, get a weekly twice and then  therest of notifications to be monthly notification (sms, email)
- [ ] a client will get a 6% deduction before the policy matures.
- [ ] pop up info when clicked, shows sumarrived @ 6%
- [x] beneficiary is only linked to life policy not cash
- [ ] add frequency of payment on policy setup, ie weekly , mothly ie get a notification every frequency chosen
- [ ] include tawk on page.
- [ ] view as pdf, download, print, email.
- [ ] if a client stays too long in unactive page is logged out.
- [ ] questions on time of log in for security.

```
#Deliverables USER
```
- sign up
- sign in  
- fill more info/beneficieries/bank info
- create a policy.
- dummy for transaction placed
```
#Deliverables ADMIN
```
- Admin and super Admin Dashboards

- registration
- policy setup
- policy payment
- viewing policy
- viewing transactions 
- viewing progress of graphs
- withdrawals
- cluster maturity by dates 

-

```
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
https://twback.herokuapp.com/v1/user_transaction/mpesa_callback
##### Client:

url | Action | Desc
--- | --- | ---
*/users/create* | **POST** |
*/users/login* | **POST** |
*/users/get* | **GET** | Get all user data (beneficiary, policies)
*/users/update* | **PUT** |
*/user_info/get* | **GET** |
*/user_info/create* | **POST** |
*/user_info/update* | **PUT** |
*/user_beneficiary/create* | **POST** |
*/user_beneficiary/get* | **GET** |
*/user_beneficiary/update* | **PUT** |
*/user_kin/create* | **POST** |
*/user_kin/get* | **GET** |
*/user_kin/update* | **PUT** |
*/user_bank/create* | **POST** |
*/user_bank/get* | **GET** |
*/user_bank/update* | **PUT** |
*/policy_years* | **GET** | Get the types of policies
*/user/create_policy* | **POST** | create a user policy , includes user_id, policy_id 
*/user/policy_withdrawal_request* | **POST** | Client Request for a policy Withdrawal (amount is all money saved)
*/user_transaction/create* | **POST** |

##### Admin:
```
admin login test:
email: sam@geminia.co.ke
password: wandah
```
url | Action | Desc
--- | --- | ---
*/admin/staff/create* | **POST** | Create a new Staff
*/admin/staff/get_staff* | **GET** | Get Logged in staff data 
*/admin/staff/get_staffs* | **GET**  | Get All the Staffs info
*/admin/staff/get_staff_info/:staff_id* | **GET** | Get Single Staff Info
*/admin/user/get_users* | **GET** | Get Users
*/admin/user/get_user_info/:user_id* | **GET** | Get Single User Info
*/admin/user/withdrawal_response/:user_id* | **POST** | Set User Aproval of withdrawal
*/admin/staff/update/:staff_id* | **PUT** | Update Staff Info From Super Admin
*/admin/get_all_policies* | **GET** | Get All the Policises
*/admin/get_maturity* | **GET** | Get All Maturity
*/admin/get_transactions* | **GET** | Get All Transactions

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
    "admin": 'boolean',
    "success": true
}
/users/get
GET :: [{"key":"Authorization","type":"text","name":"Authorization","value":"Bearer xxxxxx"}]

Results
{
    "user": {
        "id": "xxx",
        "first": "xxx",
        "middle": "xx",
        "last": "xxx",
        "id_number": "xx",
        "email": "xxx@xx.xx",
        "phone": "xx",
        "createdAt": "2018-07-11T09:47:34.000Z",
        "updatedAt": "2018-07-11T09:47:34.000Z",
        "user_info": {
            "id": "xxxx",
            "nationality": "xxx",
            "date_of_birth": "1-12-20181",
            "gender": "xx",
            "branch": "xx",
            "occupation": "xx",
            "createdAt": "2018-07-11T09:48:02.000Z",
            "updatedAt": "2018-07-12T13:49:49.000Z",
            "userId": "xxxx"
        },
        "beneficiary": {
            "id": "xxx",
            "first": "xx",
            "middle": "xx",
            "last": "xxx",
            "relation": "xxx",
            "id_number": "xxx",
            "email": "xx@xx.xx",
            "phone": "xxx",
            "createdAt": "2018-07-12T14:19:04.000Z",
            "updatedAt": "2018-07-13T00:07:58.000Z",
            "userId": "xxx"
        },
        "user_bank": {
            "id": "xxxx",
            "name": "bank kuu",
            "number": "123456789",
            "branch": "kimathi",
            "createdAt": "2018-08-01T11:44:47.000Z",
            "updatedAt": "2018-08-01T11:44:47.000Z",
            "userId": "xxxxxx"
        },
        "user_policies": [
            {
                "id": "xxx",
                "inception_date": "2018-07-11T00:00:00.000Z",
                "maturity_date": "2018-07-11T00:00:00.000Z",
                "actual_premium": xxx,
                "createdAt": "2018-07-19T12:41:39.000Z",
                "updatedAt": "2018-07-19T12:41:39.000Z",
                "userId": "xxxx",
                "policyId": "xxx",
                "policy": {
                    "id": "xxx",
                    "policy_name": "xxxx",
                    "createdAt": "2018-07-11T09:47:34.000Z",
                    "updatedAt": "2018-07-11T09:47:34.000Z"
                }
            }
        ]
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

###### Users Bank Info
```
/user_bank/create
POST :: [{"key":"Authorization","type":"text","name":"Authorization","value":"Bearer xxxxxx"}]
{
	"name"     : "xxx",
    "number"    : "xxx",
    "branch"      : "xxx"
}

Results
{
    "message": "Successfully Added User Bank.",
    "user": {
        "id": "xxx",
        "name": "xxx",
        "number": "xxx",
        "branch": "xxx",
        "userId": "xxx",
        "updatedAt": "2018-07-12T14:19:04.622Z",
        "createdAt": "2018-07-12T14:19:04.622Z"
    },
    "success": true
}
```

```
/user_bank/get
GET :: [{"key":"Authorization","type":"text","name":"Authorization","value":"Bearer xxxxxx"}]

Results
{
    "user": {
        "id": "xxxxx",
        "name": "xx",
        "number": "xx",
        "branch": "xx"
        "createdAt": "2018-07-12T14:19:04.000Z",
        "updatedAt": "2018-07-12T14:19:04.000Z",
        "userId": "xxxx"
    },
    "success": true
}
```
```
/user_bank/update
PUT :: [{"key":"Authorization","type":"text","name":"Authorization","value":"Bearer xxxxxx"}]

{
	"name"     : "xxx",
    "number"    : "xxx",
    "branch"      : "xxx"
}

Results
{
    "message": "User Bank Update ",
    "success": true
}
```
###### Users Kin Info

```
/user_kin/create
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
    "message": "Successfully Added User Kin.",
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

```
/user_kin/get
GET :: [{"key":"Authorization","type":"text","name":"Authorization","value":"Bearer xxxxxx"}]

Results
{
    "user": {
        "id": "xxxxx",
        "first": "xx",
        "middle": "xx",
        "last": "xx",
        "relation": "xx",
        "id_number": "xx",
        "email": "xx@xx.xx",
        "phone": "xx",
        "createdAt": "2018-07-12T14:19:04.000Z",
        "updatedAt": "2018-07-12T14:19:04.000Z",
        "userId": "xxxx"
    },
    "success": true
}
```
```
/user_kin/update
PUT :: [{"key":"Authorization","type":"text","name":"Authorization","value":"Bearer xxxxxx"}]

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
    "message": "User Kin Update ",
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

```
/user_beneficiary/get
GET :: [{"key":"Authorization","type":"text","name":"Authorization","value":"Bearer xxxxxx"}]

Results
{
    "user": {
        "id": "xxxxx",
        "first": "xx",
        "middle": "xx",
        "last": "xx",
        "relation": "xx",
        "id_number": "xx",
        "email": "xx@xx.xx",
        "phone": "xx",
        "createdAt": "2018-07-12T14:19:04.000Z",
        "updatedAt": "2018-07-12T14:19:04.000Z",
        "userId": "xxxx"
    },
    "success": true
}
```
```
/user_beneficiary/update
PUT :: [{"key":"Authorization","type":"text","name":"Authorization","value":"Bearer xxxxxx"}]

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
    "message": "User Beneficiary Update ",
    "success": true
}
```

###### Users Transactions Info

```
/user_transaction/create
POST :: [{"key":"Authorization","type":"text","name":"Authorization","value":"Bearer xxxxxx"}]
{
	"amount_paid" : "2000",
    "transaction_ID" : "xxxx",
    "type_of_transaction" : "Mpesa",
    "userPolicyId" : "xxxx",
    "phone": "xxxxxxxxxxx"
}

Results
{
    "message": "Successfully Added Transaction.",
    "user": {
        "id": "xxxxx",
        "amount_paid": "2000",
        "transaction_ID": "xxx",
        "type_of_transaction": "xxxx",
        "userPolicyId": "xxxxx",
        "phone": "xxxxxxxxxxx",
        "updatedAt": "2018-08-18T09:22:47.495Z",
        "createdAt": "2018-08-18T09:22:47.495Z"
    },
    "success": true
}
```

```
/user/create_policy
POST :: [{"key":"Authorization","type":"text","name":"Authorization","value":"Bearer xxxxxx"}]

{
	"inception_date" : "2018-07-11",
    "maturity_date"  : "2018-07-11",
    "actual_premium" : "20000",
    "userId": "4da04498-1f4e-4eeb-a96c-3f63f3f80d9b",
    "policyId":1
}
Results
{
    "message": "Successfully Added Policy.",
    "user": {
        "id": "37d23197-4b36-4ace-bbe2-32ac88e6be98",
        "inception_date": "2018-07-11T00:00:00.000Z",
        "maturity_date": "2018-07-11T00:00:00.000Z",
        "actual_premium": "20000",
        "userId": "4da04498-1f4e-4eeb-a96c-3f63f3f80d9b",
        "policyId": 1,
        "updatedAt": "2018-07-19T12:41:39.051Z",
        "createdAt": "2018-07-19T12:41:39.051Z"
    },
    "success": true
}
```
```
/admin/get_all_policies
GET :: [{"key":"Authorization","type":"text","name":"Authorization","value":"Bearer xxxxxx"}]

Results
{
    "policy": [
        {
            "id": "b5969dd6-1ef0-4dd1-a46a-636f60b72ed2",
            "inception_date": "2018-07-11T00:00:00.000Z",
            "maturity_date": "2018-07-11T00:00:00.000Z",
            "actual_premium": xxx,
            "createdAt": "2018-07-28T09:08:00.000Z",
            "updatedAt": "2018-07-28T09:08:00.000Z",
            "userId": "xxxxx",
            "policyId": "xxxxx",
            "user": {
                "id": "xxx",
                "first": "xxx",
                "middle": "xxxx",
                "last": "xxx",
                "id_number": "xxx",
                "email": "xxx@xxx.xxx",
                "phone": "xxx",
                "createdAt": "2018-07-12T11:31:13.000Z",
                "updatedAt": "2018-07-12T11:31:13.000Z"
            },
            "policy": {
                "id": "xxx",
                "policy_name": "xxxx",
                "createdAt": "2018-07-11T09:47:34.000Z",
                "updatedAt": "2018-07-11T09:47:34.000Z"
            }
        }
    ],
    "success": true
}
```

```
/user/policy_withdrawal_request
POST :: [{"key":"Authorization","type":"text","name":"Authorization","value":"Bearer xxxxxx"}]
{
	"userPolicyId":"xxxx",
	"amount":"xxx"
}
Results
{
    "message": "Successfully Policy Withdrawal Accepted.",
    "withdrawal": {
        "id": "xxxx",
        "userPolicyId": "xxxx",
        "amount": "xxxxxx",
        "updatedAt": "2018-08-07T12:57:59.810Z",
        "createdAt": "2018-08-07T12:57:59.810Z"
    },
    "success": true
}
```
```
/admin/user/withdrawal_response/:user_id
POST :: [{"key":"Authorization","type":"text","name":"Authorization","value":"Bearer xxxxxx"}]
{
	"status":"xxxx",
    "userPolicyId":"xxxx",
	"amount":"xxxx",
    "mode_of_pay":"xxxxx",
    "transaction_id":"xxxxx"
}
Results
{
    "message": "Successfully Policy Withdrawal Approved.",
    "withdrawal": {
        "id": "xxxx",
        "status": "xxxx",
        "userPolicyId": "xxxx",
        "amount": "xxxxxx",
        "mode_of_pay":"xxxxx",
        "transaction_id":"xxxxx",
        "updatedAt": "2018-08-07T12:57:59.810Z",
        "createdAt": "2018-08-07T12:57:59.810Z"
    },
    "success": true
}
```

```
/admin/get_maturity
GET :: [{"key":"Authorization","type":"text","name":"Authorization","value":"Bearer xxxxxx"}]
{
    "policy": [
        {
            "id": "xxxxxxxxxxxx",
            "inception_date": "2018-03-07T00:00:00.000Z",
            "maturity_date": "2023-03-07T00:00:00.000Z",
            "actual_premium": xxxx,
            "paid_premium": null,
            "policy_number": "",
            "policy_name": null,
            "createdAt": "2018-08-15T13:45:01.000Z",
            "updatedAt": "2018-08-15T13:45:01.000Z",
            "userId": "xxxxxxx",
            "policyId": "xxxxx",
            "user": {
                "id": "xxxxx",
                "first": "xx",
                "middle": "xxx",
                "last": "xxx",
                "email": "xx@xx.xx.xx",
                "createdAt": "2018-08-09T10:35:15.000Z",
                "updatedAt": "2018-08-09T10:35:15.000Z"
            }
        },
        {
            "id": "xx",
            "inception_date": "2018-03-07T00:00:00.000Z",
            "maturity_date": "2021-03-07T00:00:00.000Z",
            "actual_premium": xx,
            "paid_premium": nuxxll,
            "policy_number": "xx",
            "policy_name": xx,
            "createdAt": "2018-08-15T12:32:14.000Z",
            "updatedAt": "2018-08-15T12:32:14.000Z",
            "userId": "xxx",
            "policyId": "xxx",
            "user": {
                "id": "xxxx",
                "first": "xx",
                "middle": "xx",
                "last": "xx",
                "email": "xx@xx.xx.xx",
                "createdAt": "2018-08-09T10:35:15.000Z",
                "updatedAt": "2018-08-09T10:35:15.000Z"
            }
        },
        
    ],
    "success": true
}

```
```
/admin/user/withdrawal_response/:user_id
GEST :: [{"key":"Authorization","type":"text","name":"Authorization","value":"Bearer xxxxxx"}]

{
    "transactions": [
        {
            "id": "xxxx",
            "amount_paid": xxx,
            "transaction_ID": "xxx",
            "type_of_transaction": "xxx",
            "phone": xxx,
            "createdAt": "2018-08-20T05:48:12.000Z",
            "updatedAt": "2018-08-20T05:48:12.000Z",
            "userPolicyId": "xxxx",
            "user_policy": {
                "id": "xxxxxx",
                "inception_date": "2018-03-07T00:00:00.000Z",
                "maturity_date": "2021-03-07T00:00:00.000Z",
                "actual_premium": xxx,
                "paid_premium": xxx,
                "policy_number": "xxx",
                "policy_name": "xxxxx",
                "createdAt": "2018-08-15T09:48:23.000Z",
                "updatedAt": "2018-08-20T05:54:18.000Z",
                "userId": "xxxx",
                "policyId": "xxxx",
                "policy": {
                    "id": "xxx",
                    "policy_name": "xxxx",
                    "years": xx,
                    "createdAt": "2018-07-11T09:47:34.000Z",
                    "updatedAt": "2018-07-11T09:47:34.000Z"
                },
                "user": {
                    "id": "xxxx",
                    "first": "xxx",
                    "middle": "xxx",
                    "last": "xxx",
                    "email": "xxx@xxx.xxx",
                    "createdAt": "2018-07-12T11:31:13.000Z",
                    "updatedAt": "2018-07-12T11:31:13.000Z"
                }
            }
        },
        {
            "id": "xxx",
            "amount_paid": xxx,
            "transaction_ID": "xxx",
            "type_of_transaction": "xxx",
            "phone": xxx,
            "createdAt": "2018-08-20T05:53:48.000Z",
            "updatedAt": "2018-08-20T05:53:48.000Z",
            "userPolicyId": "xxx",
            "user_policy": {
                "id": "xxx",
                "inception_date": "2018-03-07T00:00:00.000Z",
                "maturity_date": "2021-03-07T00:00:00.000Z",
                "actual_premium": xxx,
                "paid_premium": xxx,
                "policy_number": "xxx",
                "policy_name": xxx,
                "createdAt": "2018-08-15T09:48:23.000Z",
                "updatedAt": "2018-08-20T05:54:18.000Z",
                "userId": "xxx",
                "policyId": "xx",
                "policy": {
                    "id": "xx",
                    "policy_name": "xxx",
                    "years": xx,
                    "createdAt": "2018-07-11T09:47:34.000Z",
                    "updatedAt": "2018-07-11T09:47:34.000Z"
                },
                "user": {
                    "id": "xxxx",
                    "first": "xx",
                    "middle": "xx",
                    "last": "xx",
                    "email": "xxx",
                    "createdAt": "2018-07-12T11:31:13.000Z",
                    "updatedAt": "2018-07-12T11:31:13.000Z"
                }
            }
        }
    ],
    "success": true
}

```


80%
webservice 
two weeks
security to end

1k for every missed call/interaction



if success: 200, 201(registered/created), 202(logged), 204(get is empty)
   Failed:  400, 404(page missing), 405, 406(Unauthorised), 409

add admin: true/false after loggin


transactions Model
:user_id
:transaction_code
:name
:date




CalsulaTOR
variables:
-age (18-80):a
-term (3,4,5):t
-mode of investment ():mi
-investment amount, (input):ia
-last expense amount (100,000):lea
-last expense anual premium (900):leap

-Total INvestment Fund Contributed:tifc
-Total Investment Return Earned:tire
-Total Funds at maturity:tfat
-Return for Client:rfc

tfat=(tifc+tire)-leap*t
rfc = tfat/tifc-1


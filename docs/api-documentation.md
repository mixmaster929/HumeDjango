## User
### /user
##### POST
```gql
request: {
  username    : String
  password    : String
}

response: {
  [
    {
      id          : Int
      is_superuser: Boolean
      username    : String
      first_name  : String
      last_name   : String
      email       : String
    }
  ]
}
```
##### GET
```gql
response: {
  [
    {
      id          : Int
      is_superuser: Boolean
      username    : String
      first_name  : String
      last_name   : String
      email       : String
    }
  ]
}
```
### /user/\< Int \>
##### GET
```gql
response: {
  id          : Int
  is_superuser: Boolean
  username    : String
  first_name  : String
  last_name   : String
  email       : String
}
```
##### PUT
<!-- need to figure out how to impllement field level permissions -->
##### DELETE
```gql
request: {}

response: {
  status: String
}
```

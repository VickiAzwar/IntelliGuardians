from kybra import (
    ic,
    update,
    query,
    Principal,
    nat,
    text,
    Record,
    StableBTreeMap,
    Opt,
    Vec,
)
import time

class User(Record):
    id: Principal
    coin: nat
   

users = StableBTreeMap[Principal, User](memory_id=0, max_key_size=100, max_value_size=1000)



@update
def register(user_id: Principal) -> str:
    if users.contains_key(user_id):
        return "User already registered"
    
    user = User(
        id = user_id,
        coin = 5,
    ) 
    users.insert(user_id, user)
    return "Registration succesfull"

@query
def get_user(user_id: Principal) ->Opt[User]:
    return users.get(user_id)

@query
def read_users() -> Vec[User]:
    return users.values()


@query
def caller() -> Principal:
    return ic.caller()

@query
def greet(name: str) -> str:
    return f"Hello, {name}!"


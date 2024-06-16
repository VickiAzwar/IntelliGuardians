
import secrets

from kybra import (
    ic,
    Opt,
    Principal,
    query,
    update,
    StableBTreeMap,
    Vec
)
   

from table_obj import User


# Initiate data table
users = StableBTreeMap[Principal, User](
    memory_id=0, max_key_size=38, max_value_size=100_000
)

@update
def create_users(user_id: str) -> User:
    # user_id = generate_id()
    principal_id = Principal.from_str(user_id)
    existing_user = users.get(principal_id)

    if existing_user is not None:
        return existing_user

    user = User(
        id=principal_id,
        token=5,
        created_at=ic.time(),
        username=''
    )
    users.insert(principal_id, user)

    return user

@query
def read_users() -> Vec[User]:
    return users.values()

@query
def read_user_by_id(user_id: Principal) -> Opt[User]:
    user = users.get(user_id)
    if user is None:
        return None
    return user

@query
def whoami() -> Principal:
    return ic.caller()

def generate_id() -> Principal:
    random_bytes = secrets.token_bytes(29)

    return Principal.from_hex(random_bytes.hex())



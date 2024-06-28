<<<<<<< HEAD
from kybra import (
    Principal,
    nat64,
    Record
)


class User(Record):
    id: Principal
    token: int
    created_at: nat64
    username: str
    status: int


class Detect(Record):
    id: Principal
    name: str
    count: nat64
    created_at: nat64
    user_id: Principal

class Orders(Record):
    id: Principal
    order_date: nat64
    expired_date: nat64
    user_id: Principal
    subs_id: Principal

class SubscribePackage(Record):
    id: Principal
    name: str
    price: nat64
    period: nat64
    description: str
    created_at: nat64



=======
from kybra import (
    Principal,
    nat64,
    Record,
    blob,
    Opt
)


class User(Record):
    id: Principal
    token: int
    username: str
    email: str
    profile_image: Opt[blob]
    created_at: nat64
    status: int


class Detect(Record):
    id: Principal
    name: str
    count: nat64
    created_at: nat64
    user_id: Principal

class Orders(Record):
    id: Principal
    order_date: nat64
    expired_date: nat64
    user_id: Principal
    subs_id: Principal

class SubscribePackage(Record):
    id: Principal
    name: str
    price: int
    period: nat64
    description: str
    created_at: nat64



>>>>>>> 0a3386ca5a5bc0768d8bc375a95448c995962ab8

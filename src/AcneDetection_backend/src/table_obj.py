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


class Result(Record):
    id: Principal
    user_id: Principal
    a1: int
    a2: int
    a3: int
    a4: int
    a5: int
    a6: int
    detect_image: Opt[blob] 
    created_at: nat64




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




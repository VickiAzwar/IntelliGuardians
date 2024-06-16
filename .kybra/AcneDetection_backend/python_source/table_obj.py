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





import secrets

from kybra import (
    ic,
    Opt,
    Principal,
    query,
    update,
    StableBTreeMap,
    Vec,
    blob
)

from table_obj import User, SubscribePackage, Orders, Result

UPLOAD_FOLDER = 'uploads'


# Initiate data table
users = StableBTreeMap[Principal, User](
    memory_id=0, max_key_size=38, max_value_size=5_000_000
)

# Initiate subscription packages
subscribe_packages = StableBTreeMap[Principal, SubscribePackage](
    memory_id=1, max_key_size=38, max_value_size=100_000
)

# Initiate Order
orders = StableBTreeMap[Principal, Orders](
    memory_id=2, max_key_size=38, max_value_size=100_000
)

# Initiate Result
results = StableBTreeMap[Principal, Result](
    memory_id=3, max_key_size=38, max_value_size=5_000_000
)

# Profile

@update
def update_profile_image(user_id: Principal, image_data: blob, username: str, email: str) -> bool:
    ic.print("masuk update")
    user = users.get(user_id)

    ic.print("img data: ", blob)
    ic.print("username: ", username)
    ic.print("email: ", email)
    ic.print("image_data: ", image_data)

    if user is not None:
        if username != '':
            user["username"] = username
        if email != '':
            user["email"] = email

        user["profile_image"] = image_data
       
        users.insert(user_id, user)
       
        return True
    return False


@update
def update_username_and_email(user_id: str, username: str, email: str) -> Opt[User]:
    principal_id = Principal.from_str(user_id)
    user = users.get(principal_id)

    if user is not None:
        if username != '':
            user["username"] = username
        if email != '':
            user["email"] = email

        users.insert(principal_id, user)
        return user
    return None


@update
def update_profile(user_id: str, username: Opt[str], email: Opt[str], profile_image: Opt[blob]) -> Opt[User]:
    principal_id = Principal.from_str(user_id)
    user = users.get(principal_id)

    ic.print("profile: ", profile_image)
    ic.print("user", user)

    if user is not None:
        if username is not None:
            user["username"] = username
        if email is not None:
            user["email"] = email
        if profile_image is not None:
            user["profile_image"] = profile_image

        users.insert(principal_id, user)
        return user
    return None



# Orders
@update
def check_and_update_user_status(user_id: Principal) -> bool:
    user = users.get(user_id)
    if not user:
        return False

    # Find the latest order for the user
    user_orders = [order for order in orders.values() if order["user_id"] == user_id]
    if not user_orders:
        return False

    latest_order = max(user_orders, key=lambda order: order["order_date"])
    current_time = ic.time()

    if current_time > latest_order["expired_date"]:
        user["status"] = 0
        users.insert(user_id, user)
        return True
    
    return False

@update
def insert_order(user_id: Principal, subs_id: Principal) -> Opt[Orders]:
    user = users.get(user_id)
    subs_package = subscribe_packages.get(subs_id)
    
    if user and subs_package:
        order_id = generate_id()
        order_date = ic.time()
        expired_date = order_date + subs_package["period"]
        order = Orders(
            id=order_id,
            order_date=order_date,
            expired_date=expired_date,
            user_id=user_id,
            subs_id=subs_id
        )
        orders.insert(order_id, order)
        
        user["status"] = 1
        users.insert(user_id, user)
        
        return order
    
    return None


@query
def read_orders() -> Vec[Orders]:
    return orders.values()

# Subscribe

@query
def read_subscribe_packages() -> Vec[SubscribePackage]:
    return subscribe_packages.values()


@update
def delete_subscribe_package(package_id: str) -> bool:
    principal_id = Principal.from_str(package_id)
    exist_package = subscribe_packages.get(principal_id)

    if exist_package is not None:
        subscribe_packages.remove(principal_id)
        return True
    else:
        return False

@update
def insert_subscribe_packages() -> str:
    # Subscription package periods in seconds (1 day, 1 month, 1 year)
    periods = {
        "1 day": 86400,
        "1 month": 2592000,
        "1 year": 31536000
    }
    
    # Subscription package prices
    prices = {
        "1 day": 10,
        "1 month": 100,
        "1 year":  250,
    }

    # Subscription package descriptions
    descriptions = {
        "1 day": "Experience the best of our content for a day with our daily subscription - perfect for short-term access!",
        "1 month": "Get the best of our content every month subscribe now for a monthly plan!",
        "1 year": "Join us for a year of exclusive content and benefits by subscribing annually to our website!"
    }

    for period, seconds in periods.items():
        principal_id = generate_id()
        package = SubscribePackage(
            id=principal_id,
            name=period,
            price=prices[period],
            period=seconds,
            description=descriptions[period],
            created_at=ic.time()
        )
        subscribe_packages.insert(principal_id, package)

    return "Subscribe have been created"


# Token/Credits

@update
def deduct_token(user_id: str) -> Opt[User]:
    principal_id = Principal.from_str(user_id)
    exist_user = users.get(principal_id)
    if exist_user is not None and exist_user["token"] > 0:
        exist_user["token"] -= 1
        users.insert(principal_id, exist_user)
        return exist_user
    return None

@update
def insert_token(user_id: str) -> Opt[User]:
    principal_id = Principal.from_str(user_id)
    exist_user = users.get(principal_id)
    if exist_user is not None:
        exist_user["token"] += 5
        users.insert(principal_id, exist_user)
        return exist_user
    return None


# User

@update
def remove_users(user_id: str) -> bool:
    principal_id = Principal.from_str(user_id)
    exist_package = users.get(principal_id)

    if exist_package is not None:
        subscribe_packages.remove(principal_id)
        return True
    else:
        return False

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
        status=0,
        created_at=ic.time(),
        username='',
        email='',
        profile_image=None,
    )
    users.insert(principal_id, user)

    return user

@query
def read_users() -> Vec[User]:
    return users.values()

@query
def read_user_by_id(user_id: Principal) -> Opt[User]:
    user = users.get(user_id)
    ic.print(user["id"])
    ic.print("masuk")
    if user is None:
        return None
    return user

@query
def whoami() -> Principal:
    return ic.caller()

@query
def is_user_logged_in(expected_principal: Principal) -> bool:
    return ic.caller() == expected_principal

def generate_id() -> Principal:
    random_bytes = secrets.token_bytes(29)

    return Principal.from_hex(random_bytes.hex())




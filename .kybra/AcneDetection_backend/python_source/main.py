
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

   

from table_obj import User


UPLOAD_FOLDER = 'uploads'

# Initiate data table
users = StableBTreeMap[Principal, User](
    memory_id=0, max_key_size=38, max_value_size=100_000
)

@update
def upload_image(image: blob, filename: str) -> str:

    import os
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)
    # Tentukan path file
    file_path = os.path.join(UPLOAD_FOLDER, filename)

    # Debugging: Print file path
    ic.print("File path: ", file_path)

    try:
        # Simpan gambar ke file
        with open(file_path, 'wb') as file:
            file.write(image)
        
        ic.print(f"Image successfully saved at {file_path}")
        
        
        return f"Image successfully uploaded and processed. Prediction result saved at {file_path}"
    
    except Exception as e:
        ic.print(f"Failed to save image: {e}")
        return f"Failed to upload image: {e}"

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




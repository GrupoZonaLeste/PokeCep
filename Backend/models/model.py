from pydantic import BaseModel, EmailStr
from typing import Optional

class Pokemon(BaseModel):
    id: str
    cep: str
    rua: str
    bairro: str
    cidade: str
    UF: str

class User(BaseModel):
    email: EmailStr
    password: str
    
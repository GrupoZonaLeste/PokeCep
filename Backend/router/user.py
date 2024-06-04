from fastapi import FastAPI, Body, APIRouter, HTTPException,Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
from urllib.parse import unquote
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from models.model import User
from database.user import *
from controllers.tokens import Token

security = HTTPBearer()
router = APIRouter()
jwt_token = Token()

@router.post('/cadastrar_user/')
async def cadastrar_user(user: User):
    user_dict = user.model_dump()
    return inserir_user(user_dict)
   

@router.post('/login_user/')
async def login_user(user: User):
    user_dict = user.model_dump()
    response = login(user_dict)
    if(response['status'] == "ok"):
        jwt = jwt_token.gerar_token(user_dict['email'])
        print(jwt)
        return {'token': jwt, 'status': 'OK'}

from fastapi import FastAPI, Body, APIRouter, HTTPException,Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
from urllib.parse import unquote
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from database.database import *
from models.model import Pokemon
from controllers.tokens import Token

security = HTTPBearer()
router = APIRouter()

jwt_token = Token()

@router.get("/verificar-token/")
def verificar_token(token: str):
    try:
        payload = jwt_token.verificar_token(token) 
        exp = payload.get('exp')
        if exp:
            exp_date = datetime.fromtimestamp(exp)
            if exp_date > datetime.now():
                print(exp_date)
                print(datetime.now())
                return {"status": "Token válido"}
            else:
                raise HTTPException(status_code=401, detail="Token expirado")
        else:
            raise HTTPException(status_code=401, detail="Token inválido")
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erro ao verificar token")
    
@router.post('/inserir_pokemon/')
async def inserir_pokemon(pokemon: Pokemon, token: str = Depends(verificar_token)):
    pokemon_dict = pokemon.model_dump()
    enviar_pokemon(pokemon_dict)

@router.delete('/deletar_pokemon/')
async def deletar_pokemon():
    pass

@router.get('/listar_pokemon/')
async def listar_pokemon():
    pass

@router.put('/editar_pokemon/')
async def editar_pokemon():
    pass
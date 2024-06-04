from pymongo import MongoClient
from bson import ObjectId
from pymongo.errors import PyMongoError
from fastapi import FastAPI, HTTPException, APIRouter
from pymongo.errors import PyMongoError

MONGO_CONNECTION_STRING = MongoClient("mongodb://localhost:27017")
database = MONGO_CONNECTION_STRING['Pokecep']
collection = database['user']

def inserir_user(user: dict):
    try:
        collection.insert_one(user)
        return {"Status":"OK"}
    except PyMongoError as e:
        print(f"Ocorreu um erro ao inserir o usuário: {e}")
        return {"Status": "ERROR"}
    
def login(user: dict):
    email = user['email']
    senha = user['password']
    filter={
        '$and': [
            {
                'email': email
            }, {
                'password': senha
            }
        ]
        }
    project={
        '_id': 0
        }
    try:
        userdata = collection.find_one(filter=filter, projection=project)
        if userdata is None:
            raise HTTPException(status_code=404, detail="Usuário não encontrado")
        return ({"status": "ok"})
    except PyMongoError as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar usuário: {e}")
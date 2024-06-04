from pymongo import MongoClient
from bson import ObjectId

MONGO_CONNECTION_STRING = MongoClient("mongodb://localhost:27017")
database = MONGO_CONNECTION_STRING['Pokecep']
collection = database['pokemon']

def enviar_pokemon(pokemon: dict):
    collection.insert_one(pokemon)

async def listar_pokemon(cep):
    if cep == "":
        pokemons = []
        for i in collection.find():
            i["_id"] = f"ObjectId({str(i['_id'])})"
            pokemons.append(i)
    else:
        filter = {"cep": {"$regex": f"^{cep}"}}
        pokemons = []
        for i in collection.find(filter=filter):
            i["_id"] = f"ObjectId({str(i['_id'])})"
            pokemons.append(i)
    return pokemons


from fastapi import FastAPI, Body, APIRouter, HTTPException,Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timezone
from urllib.parse import unquote
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Dict
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from router.pokemon import router as poke_router
from router.user import router as user_router
from controllers.tokens import Token
from service.cors import add_cors
from models.model import *


app = FastAPI(debug=True)
add_cors(app)
app.include_router(poke_router,prefix="/Pokemon",tags=["Pokemon"])
app.include_router(user_router,prefix="/User", tags=["User"])
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
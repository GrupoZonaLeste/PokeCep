from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from datetime import datetime, timedelta, timezone

class Token:
    def __init__(self):
        self.secret_key = 'hhqq788qpowekalsd023fdppafadfzxc'
        self.algorithm = 'HS256'

    def verificar_token(self, token: str) -> dict:
        try:
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            return payload
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expirado")
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token inválido")

    def gerar_token(self, email: str) -> str:
        payload = {
            'name':email,
            'exp': datetime.now(timezone.utc) + timedelta(minutes=5),
        }
        jwt_token = jwt.encode(payload, self.secret_key, algorithm=self.algorithm)
        return jwt_token
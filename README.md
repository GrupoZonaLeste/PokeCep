# PokeCep
PokeCep é um projeto desenvolvido com o objetivo de criar uma plataforma para cadastrar informações de CEPs e Pokémons. Criada para cumprir aos requisitos propostos a P2 da matéria de desenvolvimento web III, A ideia é proporcionar uma forma divertida e interativa de visualizar e cadastrar dados de CEPs, ao mesmo tempo em que se explora o mundo dos Pokémons.
<p align="center">
<img src="https://github.com/GrupoZonaLeste/PokeCep/assets/132578544/9c39719c-4302-4639-a08d-c43bcd5acd26"></img>
</p>

## 🔧 Tecnologias Utilizadas
Tecnologias e ferramentaas utilizadas para construção e funcionamento do projeto:
- [FastApi](https://fastapi.tiangolo.com/)
- [MongoDB](https://www.mongodb.com/)
- [Axios](https://axios-http.com/ptbr/docs/intro)

## 💡 Primeiros passos
Essa seção apresenta um guia para que você saiba como instalar o PokeCep e como executá-lo no seu próprio ambiente.

Certifique-se de ter o Python instalado
```sh
winget install -e --id Python.Python.3.11
```

### ⛏ Instalação
1. Clone o repositório
   ```sh
    git clone 
   ```
2. Baixe a extensão python
  - Nome: Python
  - Link: https://marketplace.visualstudio.com/items?itemName=ms-python.python
3. Ative o ambiente virtual python
     - No Vscode: **CTRL+SHIFT+P**
     - selecione: **Python create environment**
4. *Baixe as dependências
  caso o ambiente virtual não identifique o arquivo requirements.txt*
   ```sh
   pip install -r requirements
   ```
5. Selecione a pasta do Backend
   ```
   cd backend
   ```
4. Rode o main
   ```
   python -m main
   ```
# 🗃 Estrutura do Backend
#### Visualize a documentação automática da api
```http
  http://127.0.0.1:8000/docs#/
```
#### BACKEND:
| Pasta | Arquivo | Descrição|
|:------|:--------|:---------|
|`controllers`| `tokens.py`| Implementação de geração de token|
|`database`| `database.py`| Configuração e funções de integração dos pokemons com o banco|
|`database`| `user.py`| Configuração e funções de integração cadastro/login com o banco|
|`models`| `model.py`| Definições de modelos de dados para ações no sistema|
|`router`| `pokemon.py`| Define rotas para os pokemons|
|`router`| `user.py`| Define rotas para os usuários|
|`service`| `cors.py`| Configura as permissões de Cors do sistema|
|`Backend`| `main.py`| Este arquivo define a aplicação FastAPI principal e inclui as rotas do projeto|



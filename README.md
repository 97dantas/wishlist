# WISHLIST
# Rest + Express + JWT + Mongoose + Axios + Redis + Docker


### Depedências
- Docker
- Docker compose

## Executando o projeto
1. Criar arquivo .env com base no arquivo example.env
    > cp example.env .env
    ### exemplo do arquivo:
    ````
    PORT=3000
    MONGODB_URI=mongodb://mongo_wishlist
    MONGODB_DATABASE=wishlist

    NODE_ENV=development
    SECRET=527E20E77815696ecbf1c96e6894b779456d330e2F0FD2ADF98CA

    BASE_URL_MAGALU=http://challenge-api.luizalabs.com/api/

    REDIS_EXPIRES=3600000000
    REDIS_URL=redis://redis_wishlist

    ````
    - `PORT`: porta do servidor
    - `MONGODB_URI`: URI do mongo, preferível usar o endereço do container `mongo_wishlist`
    - `MONGODB_DATABASE`: Nome do banco que a aplicação vai utilizar
    - `NODE_ENV`: environment
    - `SECRET`: Chave para auxiliar com o JWT
    - `BASE_URL_MAGALU`: URL utilizada pela api para buscar os produtos
    - `REDIS_EXPIRES`: Tempo em milissegundos que o redis vai expirar o cache
    - `REDIS_URL`: URL do redis, preferível usar o endereço do container `redis_wishlist`

    ### Esses são todos os dados de ambiente necessários para rodar a aplicação

2. Running

    > docker-compose up

3. Entendendo o fluxo do cache
* Cache utilizado para melhorar o tempo de resposta ao adicionar um produto a lista de favoritos
    ![Draw cache](./draw-cache.png)

### API

### User API

#### `POST: /api/user`

Criando usuário da api para ter acesso ao token

```json
{
    "key": "fac89da119f1c2e",
    "password": "e9e77eb5396"
}
```

* Retorna objeto com os dados cadastrado e status code 201
```json
{
    "key": "fac89da119f1c2e",
    "password": "e9e77eb5396"
}
```

#### `POST: /api/user/sign-in`

Autenticando usuário

```json
{
    "name": "teste",
    "email": "teste@teste.com"
}
```

* Retorna objeto com os dados do usuário e o token
```json
{
    "user": {
        "key": "fac89da119f1c2e",
        "_id": "5d84d00d62ea77002b29112e"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJmYWM4OWRhMTE5ZjFjMmUiLCJfaWQiOiI1ZDg0ZDAwZDYyZWE3NzAwMmIyOTExMmUiLCJpYXQiOjE1Njg5ODUzOTZ9.wSxrc2H7RFNeBA_oWOk5chJWS_dZr9N4B_ZfSUHwJE4"
}
```
* Em caso de key ou password invalidos, status code 401
```json
{
    "status": 401,
    "message": "invalid password or key"
}
```

### Client

* O token obtido na rota `/api/user/sign-in` deve ser informado no header em formato `Authorization` : `Bearer token` nas demais rotas


#### `POST: /api/client`

Cadastrando cliente

```json
{
    "name": "teste",
    "email": "teste@teste.com"
}
```

* Retorna objeto com os dados do usuario e o token, status code 201
```json
{
    "_id": "5d84d2aaa632920038a608ad",
    "name": "teste",
    "email": "teste@teste.com",
    "productsFavorites": [],
    "__v": 0
}
```
* Em caso de email já utilizado, status code 409
```json
{
    "status": 409,
    "message": "user with this key already exists"
}
```

#### `GET: /api/client`

Buscando todos os cliente

* Retorna um array de objeto com os dados do cliente, status code 200
```json
{
    "_id": "5d80c720645b64ae5b699958",
    "name": "israel update",
    "email": "test232@gmail.com",
    "productsFavorites": [
        {
            "_id": "5d80c72a645b64ae5b699959",
            "price": 1149,
            "image": "http://challenge-api.luizalabs.com/images/958ec015-cfcf-258d-c6df-1721de0ab6ea.jpg",
            "brand": "bébé confort",
            "id": "958ec015-cfcf-258d-c6df-1721de0ab6ea",
            "title": "Moisés Dorel Windoo 1529"
        }
    ],
    "__v": 0
}
```



#### `GET: /api/client/{_id_user}`

Buscando cliente pelo ID


* Retorna um objeto com os dados do cliente, status code 200
```json
{
    "_id": "5d80c720645b64ae5b699958",
    "name": "israel update",
    "email": "test232@gmail.com",
    "productsFavorites": [
        {
            "_id": "5d80c72a645b64ae5b699959",
            "price": 1149,
            "image": "http://challenge-api.luizalabs.com/images/958ec015-cfcf-258d-c6df-1721de0ab6ea.jpg",
            "brand": "bébé confort",
            "id": "958ec015-cfcf-258d-c6df-1721de0ab6ea",
            "title": "Moisés Dorel Windoo 1529"
        }
    ],
    "__v": 0
}
```



#### `PUT: /api/client/{_id_user}`

Atualiza as propriedades de um cliente

```json
{
    "name": "teste",
    "email": "teste@teste.com"
}
```
* Em caso de sucesso e status code 200
```json
{
    "n": 1,
    "nModified": 1,
    "ok": 1
}
```

#### `DELETE: /api/client/{_id_user}`

* Em caso de sucesso e status code 200
```json
{
    "n": 1,
    "ok": 1,
    "deletedCount": 1
}
```

### Client/favorites_products

#### `POST: /api/client/favorites_products/{_id_user}`

* Adiciona um produto existente na base do magalu ao cliente dessa API

```json
{
    "idProduct": "1bf0f365-fbdd-4e21-9786-da459d78dd1f" 
}
```

* Em caso de sucesso e status code 200

```json
{
    "n": 1,
    "ok": 1,
    "deletedCount": 1
}
```

* Quando não houve inserção de novos produtos ao cliente

```json
{
    "n": 0,
    "nModified": 0,
    "ok": 1
}
```
* Quando não há um produto correspondente ao idProduct enviado pelo body

```json
{
    "status": 404,
    "message": "Product not found in base magalu"
}
```


### Execute tests
Start tests.
> npm run test

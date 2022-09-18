<div align="center">

![Badge](https://img.shields.io/badge/npm-v7.0.0-orange)
![Badge](https://img.shields.io/badge/node-v16.0.0-brightgreen)

</div>

# Store Manager

API de registro de vendas e produtos, desenvolvida em node.js com o banco de dados MySQL, que possibilita a atualização, cadastro e exclusão de dados. Foi utilizado a arquitetura MSC (model-service-controller) e TDD (Test Driven Development) abrangendo 100% de cobertura de teste.

---
</br>

## Instalação

- Instale Store Manager com docker

```bash
  docker-compose up -d
```
- Acesse o terminal do docker e execute comando npm

```bash
  docker exec -it store_manager bash
  npm install
  npm run debug
```
</br>

---

</br>

## Documentação da API

<details>
  <summary><strong>Products</strong></summary>

  #### Cadastra produto 

```http
  POST /products
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório**. Nome do produto  |

#### Retorna um produto

```http
  GET /products/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. ID do produto |

#### Retorna todos os produtos do banco de dados

```http
  GET /products
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|   -  | - | Retorna todos os produtos |

#### Retorna um produto pelo termo pesquisado

```http
  GET /products/search
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `q`      | `string` | Termo contido no nome do produto |

#### Atualiza o nome de um produto

```http
  PUT /products/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. ID do produto |
| `name` | `string` | **Obrigatório**. Novo nome do produto  |

#### Deleta um produto

```http
  DELETE /products/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. ID do produto |
</details>

<details>
  <summary><strong>sales</strong></summary>

  #### Cadastra venda 

```http
  POST /sales
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `productId` | `number` | **Obrigatório**. ID do produto |
| `quantity` | `number` | **Obrigatório**. Quantidade vendida |

#### Retorna uma venda

```http
  GET /sales/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. ID da venda |

#### Retorna todas as vendas

```http
  GET /sales
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
|   -  | - | Retorna todos as vendas |


#### Atualiza a quantidade vendida

```http
  PUT /sales/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. ID da venda |
| `productId` | `number` | **Obrigatório**. ID do produto |
| `quantity` | `number` | **Obrigatório**. Quantidade vendida |

#### Deleta uma venda

```http
  DELETE /sales/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `number` | **Obrigatório**. ID da venda |
</details>


</br>

---

</br>

## Stack utilizada

**Back-end:** Node, Express, Nodemon, docker, MySQL, Joi, sinon, chai, mocha, dotenv, snakeize, camelize.

</br>

---

</br>

## Autor

- [Jayro](https://github.com/Jayromberg)

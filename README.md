# 📝 Task API

![Tests](https://img.shields.io/badge/tests-passing-brightgreen)
![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node-18.x-brightgreen)
![Express](https://img.shields.io/badge/express.js-4.x-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-%23268E3C?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-enabled-yellow)
![Jest](https://img.shields.io/badge/tested%20with-jest-red)
![PRs Welcome](https://img.shields.io/badge/PRs-welcome-blue)

API RESTful para registo de utilizadores, autenticação e gestão de tarefas.  
Feita com **Node.js**, **Express**, **MongoDB**, **JWT** e **Jest**.

---

## 📦 Features

- ✅ Registo e Login com token JWT
- ✅ CRUD de tarefas por utilizador autenticado
- ✅ Validação com `express-validator`
- ✅ Testes automatizados com Jest + Supertest
- ✅ Testes unitários e de integração com Mongo em memória
- 🚧 Documentação com Swagger (em progresso)
- 🚀 Deploy opcional em Render/Fly/Heroku (em progresso)

---

## 🚀 Instalação

```bash
git clone https://github.com/Gusta11M/task-api.git
cd task-api
npm install
```

---

## ⚙️ Ambiente (.env)

Cria um ficheiro `.env` na raiz com:

```dotenv
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskapi
JWT_SECRET=sua_chave_secreta_aqui
```

---

## 🧪 Testes

```bash
npm test
```

Testes com cobertura (coverage):

```bash
npm run test -- --coverage
```

---

## 🧭 Endpoints principais

### 🔐 Auth

| Método | Endpoint             | Descrição             |
|--------|----------------------|------------------------|
| POST   | `/api/auth/register` | Registar utilizador   |
| POST   | `/api/auth/login`    | Login de utilizador   |

### ✅ Tasks (token JWT necessário)

| Método | Endpoint            | Descrição                     |
|--------|---------------------|-------------------------------|
| POST   | `/api/tasks`        | Criar nova tarefa             |
| GET    | `/api/tasks`        | Listar tarefas do utilizador |
| PUT    | `/api/tasks/:id`    | Atualizar tarefa              |
| DELETE | `/api/tasks/:id`    | Apagar tarefa                 |

---

## 🔑 Autenticação

Todas as rotas de tarefa requerem o envio do token JWT no header:

```
x-auth-token: Bearer <seu_token>
```

---

## 🧪 Exemplo de uso (via Postman)

1. Regista um utilizador:  
   `POST /api/auth/register`

2. Usa o token de resposta para chamadas protegidas

3. Cria uma tarefa:  
   `POST /api/tasks` com JSON:

```json
{
  "title": "Estudar Node.js",
  "description": "Rever autenticação JWT"
}
```

---

## 🛡️ Segurança

- JWT para autenticação
- Validação robusta com `express-validator`
- Proteção contra acesso a recursos de outros utilizadores

---

## 📄 Licença

MIT © [Gusta11M](https://github.com/Gusta11M)

---

## 💡 Contribuir

Pull Requests são bem-vindos! ✨  
Sinta-se à vontade para abrir Issues, dar sugestões ou enviar melhorias.

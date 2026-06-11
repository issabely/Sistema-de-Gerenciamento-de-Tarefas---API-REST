============================================
Sistema de Gerenciamento de Tarefas - API REST
============================================

Nome: Isabely aparecida gomes da costa
RA: 2337541

============================================
COMO EXECUTAR O PROJETO
============================================

1. Certifique-se de ter o Node.js instalado
   - Verifique com: node --version

2. Abra o terminal na pasta do projeto (cap20)

3. Instale as dependências:
   npm install

4. Execute o servidor:
   node app.js

5. O servidor estará disponível em:
   http://localhost:3000

============================================
ROTAS DA API
============================================

GET    /tasks      - Lista todas as tarefas
GET    /tasks/:id  - Busca uma tarefa pelo ID
POST   /tasks      - Cria uma nova tarefa
PUT    /tasks/:id  - Atualiza uma tarefa existente
DELETE /tasks/:id  - Remove uma tarefa

============================================
EXEMPLOS DE USO (POSTMAN)
============================================

1. LISTAR TODAS AS TAREFAS
   Método: GET
   URL: http://localhost:3000/tasks

2. BUSCAR TAREFA POR ID
   Método: GET
   URL: http://localhost:3000/tasks/1

3. CRIAR NOVA TAREFA
   Método: POST
   URL: http://localhost:3000/tasks
   Body (JSON):
   {
     "description": "Estudar APIs REST"
   }

4. ATUALIZAR TAREFA
   Método: PUT
   URL: http://localhost:3000/tasks/1
   Body (JSON):
   {
     "description": "Comprar pão integral"
   }

5. DELETAR TAREFA
   Método: DELETE
   URL: http://localhost:3000/tasks/1

============================================
STATUS CODES UTILIZADOS
============================================

200 - OK: Requisição bem-sucedida
201 - Created: Recurso criado com sucesso
204 - No Content: Exclusão realizada (sem retorno)
400 - Bad Request: Dados inválidos
404 - Not Found: Recurso não encontrado
500 - Internal Server Error: Erro interno

============================================
TECNOLOGIAS UTILIZADAS
============================================

- Node.js
- Express.js
- JSON

============================================

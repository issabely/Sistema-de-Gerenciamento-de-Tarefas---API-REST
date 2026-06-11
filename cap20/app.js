// ============================================
// Sistema de Gerenciamento de Tarefas - API REST
// ============================================

// 1️⃣ IMPORTAÇÃO DO EXPRESS
// O Express é um framework que facilita a criação de servidores e APIs
// Sem ele, precisaríamos escrever todo o código HTTP manualmente
const express = require('express');

// 2️⃣ CRIAÇÃO DA APLICAÇÃO
// A variável 'app' representa nosso servidor
// É através dela que criamos rotas, middlewares e enviamos respostas
const app = express();

// 3️⃣ DEFINIÇÃO DA PORTA
// O servidor ficará "escutando" requisições nesta porta
// Acessível em: http://localhost:3000
const port = 3000;

// 4️⃣ MIDDLEWARE PARA INTERPRETAR JSON
// Este middleware permite que o Express entenda dados JSON
// enviados no corpo (body) das requisições POST e PUT
// Sem isso, req.body seria undefined
app.use(express.json());

// 5️⃣ SIMULAÇÃO DO BANCO DE DADOS
// Em um projeto real, usaríamos um banco de dados (MySQL, MongoDB, etc.)
// Aqui usamos um array para simular o armazenamento
// Cada tarefa tem: id (identificador único) e description (descrição da tarefa)
let tasks = [
    { id: 1, description: 'Comprar pão' },
    { id: 2, description: 'Estudar Node.js' },
    { id: 3, description: 'Fazer exercícios' }
];

// ============================================
// ROTAS DA API
// ============================================

// 6️⃣ ROTA GET - LISTAR TODAS AS TAREFAS
// Método: GET
// URL: http://localhost:3000/tasks
// Função: Retorna todas as tarefas cadastradas
// Status Code: 200 (OK) - Requisição bem-sucedida
app.get('/tasks', (req, res) => {
    // res.status(200) define o código de status HTTP
    // .json(tasks) converte o array para JSON e envia como resposta
    res.status(200).json(tasks);
});

// 7️⃣ ROTA GET POR ID - BUSCAR TAREFA ESPECÍFICA
// Método: GET
// URL: http://localhost:3000/tasks/:id (ex: /tasks/1)
// Função: Retorna uma tarefa específica pelo ID
// O :id é um parâmetro de rota (valor dinâmico)
app.get('/tasks/:id', (req, res) => {
    // req.params.id captura o valor passado na URL
    // parseInt() converte de string para número inteiro
    const id = parseInt(req.params.id);
    
    // .find() procura no array uma tarefa com o ID correspondente
    // Retorna o objeto encontrado ou undefined se não existir
    const task = tasks.find(task => task.id === id);
    
    // Tratamento de erro: tarefa não encontrada
    if (!task) {
        // Status 404 (Not Found) - Recurso não existe
        return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    
    // Status 200 (OK) - Retorna a tarefa encontrada
    res.status(200).json(task);
});

// 8️⃣ ROTA POST - CRIAR NOVA TAREFA
// Método: POST
// URL: http://localhost:3000/tasks
// Função: Cadastra uma nova tarefa no sistema
// Body esperado: { "description": "Descrição da tarefa" }
app.post('/tasks', (req, res) => {
    // req.body contém os dados enviados pelo cliente no corpo da requisição
    const newTask = req.body;
    
    // Validação: verifica se a descrição foi informada
    if (!newTask.description) {
        // Status 400 (Bad Request) - Dados inválidos
        return res.status(400).json({ error: 'A descrição da tarefa é obrigatória' });
    }
    
    // Gera um ID automático baseado no maior ID existente + 1
    // Isso evita IDs duplicados mesmo após exclusões
    const maxId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) : 0;
    newTask.id = maxId + 1;
    
    // Adiciona a nova tarefa ao array (simula INSERT no banco)
    tasks.push(newTask);
    
    // Status 201 (Created) - Recurso criado com sucesso
    // Retorna a tarefa criada com seu ID
    res.status(201).json(newTask);
});

// 9️⃣ ROTA PUT - ATUALIZAR TAREFA EXISTENTE
// Método: PUT
// URL: http://localhost:3000/tasks/:id (ex: /tasks/1)
// Função: Atualiza todos os dados de uma tarefa
// Body esperado: { "description": "Nova descrição" }
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedTask = req.body;
    
    // findIndex() retorna a posição do elemento no array
    // Retorna -1 se não encontrar
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    // Tratamento de erro: tarefa não encontrada
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    
    // Validação: verifica se a descrição foi informada
    if (!updatedTask.description) {
        return res.status(400).json({ error: 'A descrição da tarefa é obrigatória' });
    }
    
    // Atualiza a tarefa mantendo o ID original
    // O spread operator (...) copia as propriedades do objeto
    tasks[taskIndex] = {
        ...tasks[taskIndex],    // Mantém dados antigos (incluindo ID)
        ...updatedTask          // Sobrescreve com dados novos
    };
    
    // Garante que o ID não seja alterado
    tasks[taskIndex].id = id;
    
    // Status 200 (OK) - Retorna a tarefa atualizada
    res.status(200).json(tasks[taskIndex]);
});

// 🔟 ROTA DELETE - REMOVER TAREFA
// Método: DELETE
// URL: http://localhost:3000/tasks/:id (ex: /tasks/1)
// Função: Remove uma tarefa do sistema
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    const taskIndex = tasks.findIndex(task => task.id === id);
    
    // Tratamento de erro: tarefa não encontrada
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    
    // splice() remove elementos do array
    // Parâmetro 1: posição inicial
    // Parâmetro 2: quantidade de elementos a remover
    tasks.splice(taskIndex, 1);
    
    // Status 204 (No Content) - Operação bem-sucedida, sem conteúdo para retornar
    // Usado quando a exclusão foi feita mas não há dados para devolver
    res.status(204).send();
});

// ============================================
// TRATAMENTO DE ERROS
// ============================================

// Middleware de tratamento de erros internos (500)
// Captura erros não tratados nas rotas
app.use((err, req, res, next) => {
    console.error('Erro interno:', err.message);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

// Rota para URLs não encontradas
// Captura requisições para rotas que não existem
app.use((req, res) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

// ============================================
// INICIALIZAÇÃO DO SERVIDOR
// ============================================

// app.listen() inicia o servidor na porta especificada
// O callback é executado quando o servidor está pronto
app.listen(port, () => {
    console.log('============================================');
    console.log('🚀 Servidor rodando em http://localhost:' + port);
    console.log('============================================');
    console.log('Rotas disponíveis:');
    console.log('  GET    /tasks      - Listar todas as tarefas');
    console.log('  GET    /tasks/:id  - Buscar tarefa por ID');
    console.log('  POST   /tasks      - Criar nova tarefa');
    console.log('  PUT    /tasks/:id  - Atualizar tarefa');
    console.log('  DELETE /tasks/:id  - Remover tarefa');
    console.log('============================================');
});

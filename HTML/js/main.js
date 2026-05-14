// função responsável por buscar os pedidos na API e exibir na tela
function listarPedidos() {
    // buscando no HTML
    const lista = document.getElementById("lista");
    // Limpando a lista antes de exibir os pedidos
    lista.innerHTML = "Carregando Pedidos...";

    // Faz uma requisição GET para API com a url dela publicada (ou local)
    fetch("https://nodeapi-qo9g.onrender.com/pedidos")

        // Converte a resposta da API para JSON
        .then(res => res.json())

        // Trabalhando com o resultado da API
        .then(resultado => {
            // Limpando a lista para preencher com os pedidos 
            lista.innerHTML = "";

            // Percorrendo o array de pedidos recebido da API
            resultado.dados.forEach(pedido => {

                // Criando um item de lista para cada pedido
                const item = document.createElement("li");

                // Define como o texto será exibido na tela
                item.textContent = `${pedido.id} - ${pedido.cliente} | ${pedido.produto} | ${pedido.status}`;

                // Adcionando o item criado dentro da lista no HTML
                lista.appendChild(item);
            })
                // Caso o front não consiga acessar a API para trazer os dados 
                .catch(() => {
                    lista.innerHTML = "Erro ao carregar pedidos";
                });
        });
};

// Criar pedido (POST)
// Função responsável por cadastrar um novo pedido

function cadastrarPedido() {
    // Capturando os valores digitados nos inputs e depois limpa
    const cliente = document.getElementById("cliente").value;
    const produto = document.getElementById("produto").value;

    // Envia uma requisição POST para uma API
    fetch("https://nodeapi-qo9g.onrender.com/pedidos", {
      method: "POST",
    
      // Informa que os dados enviados estão no formtato JSON
      headers: {
        'Content-Type': "application/JSON"
      }, 
      // Converte p objeto Javascript em JSON para enviar no body
      body: JSON.stringify({
        id: Date.now(), // Incluir
        cliente: cliente,
        produto: produto,
        status: "Pendente"
      })  
    })
    // Converte a resposta da API para JSON
   .then(res => res.json())

   // Depois que o pedido for cadastrado, atualiza a lista na tela
   .then(() => {
    // Limpa os inputs após o envio do cadastro
    document.getElementById("cliente").value = "";
    document.getElementById("produto").value = "";

    listarPedidos();
   })
   // Alerta o usuário caso não seja possivel realizar o cadastro do pedido
   .catch(() => {
        alert("Erro ao cadastrar pedido");
   });
}

// Atualizar Pedido (PUT)
// Função responsável por atualizar o status de um pedido 

function atualizarPedido() {
    // Pega o ID informado e o força a ser um numero
    const id = Number(document.getElementById("idAtualizar").value);
    // Pega o novo status do pedido digitado no input
    const status = document.getElementById("statusAtualizar").value;

    // Envia uma requisição PUT para a API
    fetch("https://nodeapi-qo9g.onrender.com/pedidos", {
        method: "PUT",
        headers: {
            'Content-Type': 'application/JSON'
        },

        // Envia o ID e novo status do pedido
        body: JSON.stringify({
            id: id, 
            status: status
        })
    })
    .then(res => res.json())
    
    // Depois que atualizar, buscará a lista novamente 
    .then(() => {
        // Limpando os campos após o envio
        document.getElementById("idAtualizar").value = "";
        document.getElementById("statusAtualizar").value = "";

        // Reexibe a lista atualizada
        listarPedidos();
    })

    // Alerta caso não seja possivel atualizar o pedido
    .catch(() => {
        alert("Erro ao atualizar pedido");
    });
}

// Removendo pedido
// Funçãoresponsável por cancelar um pedido
function removerPedido() {
    // Pega o ID digitado
    const id = Number(document.getElementById("idRemover").value);

    fetch("https://nodeapi-qo9g.onrender.com/pedidos", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/JSON'
        },
        // Envia apenas o id do pedido que será removido
        body: JSON.stringify({
            id: id
        })
    })
    .then(res => res.json())
    .then(() => {
        document.getElementById("idRemover").value = "";
        listarPedidos()
    })
    .catch(() => {
        alert("Erro ao cancelar o pedido")
    });
}
// Chama a função assim que a página carregar. Assim os pedidos já aparecem automaticamente na tela
listarPedidos();
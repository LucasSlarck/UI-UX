function toggleMenu() {
    var menu = document.getElementById('main-menu');
    menu.classList.toggle('active');
}

let carrinho = [];
let totalCarrinho = 0;

let chatboxOpen = false;
    
function toggleChatbox() {
    const chatbox = document.getElementById('chatbox');
    chatbox.style.display = chatboxOpen ? 'none' : 'block';
    chatboxOpen = !chatboxOpen;
    
    if (chatboxOpen) {
        simulateMessage("Olá! Como posso ajudar?");
    }
}
    
function simulateMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    const newMessage = document.createElement('div');
    newMessage.className = 'message';
    newMessage.textContent = message;
    chatMessages.appendChild(newMessage);
}
    
function sendMessage(event) {
    if (event.key === 'Enter') {
        const userInput = document.getElementById('user-input');
        const userMessage = userInput.value;
        simulateMessage(`Você: ${userMessage}`);
        userInput.value = '';
    
        // Aqui você pode adicionar lógica para processar a mensagem do usuário ou chamar a API do chatbot real
        setTimeout(() => simulateMessage('Bot: Desculpe, estou simulando e não tenho respostas reais.'), 500);
    }
}

function adicionarAoCarrinho(nomeProduto, precoProduto) {
    carrinho.push({ nome: nomeProduto, preco: precoProduto });
    totalCarrinho += precoProduto;

    // Atualiza a exibição do carrinho
    exibirCarrinho();
}

function removerDoCarrinho(index) {
    totalCarrinho -= carrinho[index].preco;
    carrinho.splice(index, 1);

    // Atualiza a exibição do carrinho
    exibirCarrinho();
}

let carrinhoVisivel = true;

function toggleCarrinho() {
    const carrinhoContainer = document.getElementById('carrinhoContainer');
    carrinhoVisivel = !carrinhoVisivel;

    if (carrinhoVisivel) {
        carrinhoContainer.style.display = 'block';
    } else {
        carrinhoContainer.style.display = 'none';
    }
}

function exibirCarrinho() {
    const carrinhoItens = document.getElementById('carrinhoItens');
    const totalCarrinhoElement = document.getElementById('totalCarrinho');
    const carrinhoContainer = document.getElementById('carrinhoContainer');

    // Limpa o conteúdo atual do carrinho
    carrinhoItens.innerHTML = '';

    // Adiciona os itens ao carrinho
    carrinho.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)}`;

        // Adiciona o botão de remover
        const removerBotao = document.createElement('button');
        removerBotao.textContent = 'Remover';
        removerBotao.onclick = function () {
            removerDoCarrinho(index);
        };

        listItem.appendChild(removerBotao);
        carrinhoItens.appendChild(listItem);
    });

    // Atualiza o total do carrinho
    totalCarrinhoElement.textContent = totalCarrinho.toFixed(2);

    // Exibe o carrinho se estiver visível
    if (carrinhoVisivel) {
        carrinhoContainer.style.display = 'block';
    }
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio. Adicione produtos antes de finalizar a compra.');
    } else {
        alert('Compra finalizada! Obrigado por comprar conosco.');
        // Limpa o carrinho após a finalização da compra
        carrinho = [];
        totalCarrinho = 0;
        // Atualiza a exibição do carrinho
        exibirCarrinho();
    }
}

// Função para carregar e exibir usuários do localStorage
function carregarUsuarios() {
    // Obter lista de usuários do localStorage
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Obter a referência à tabela
    var tabela = document.getElementById('tabelaUsuarios');

    // Limpar o conteúdo atual da tabela
    tabela.innerHTML = "";

    // Preencher a tabela com os dados dos usuários
    usuarios.forEach(function(usuario, index) {
        var linha = tabela.insertRow();
        var colunaNome = linha.insertCell(0);
        var colunaEmail = linha.insertCell(1);
        var colunaSenha = linha.insertCell(2);
        var colunaAcao = linha.insertCell(3);

        colunaNome.textContent = usuario.nome;
        colunaEmail.textContent = usuario.email;
        colunaSenha.textContent = usuario.senha;

        // Adicionar botão de remoção
        var botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.className = 'botao-remover';
        botaoRemover.onclick = function() {
            removerUsuario(index);
        };

        colunaAcao.appendChild(botaoRemover);
    });
}

// Função para remover usuário da lista
function removerUsuario(index) {
    // Obter lista de usuários do localStorage
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Remover o usuário pelo índice
    usuarios.splice(index, 1);

    // Atualizar lista de usuários no localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Recarregar a tabela
    carregarUsuarios();
}

// Função para cadastrar um novo usuário
function cadastrar() {
    // Obter valores do formulário
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var isAdmin = document.getElementById('admin').checked;

    // Criar objeto de usuário
    var usuario = {
        nome: nome,
        email: email,
        senha: senha,
        admin: isAdmin
    };

    // Obter lista de usuários do localStorage
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Adicionar novo usuário à lista
    usuarios.push(usuario);

    // Armazenar a lista atualizada de usuários no localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Limpar formulário
    document.getElementById('cadastroForm').reset();

    // Atualizar a tabela
    carregarUsuarios();

    alert('Cadastro realizado com sucesso!');
}
// Carregar usuários ao carregar a página
carregarUsuarios();


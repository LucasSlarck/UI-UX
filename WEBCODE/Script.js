// Adicione esta lógica ao seu script.js

let carrinho = [];
let totalCarrinho = 0;

// Adicione esta lógica ao seu script.js

// ...

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
// Adicione esta lógica ao seu script.js

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

function toggleMenu() {
    var menu = document.getElementById('main-menu');
    menu.classList.toggle('active');
}
// Função para carregar e exibir usuários do localStorage
function carregarUsuarios() {
    // Obter lista de usuários do localStorage
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Obter a referência à tabela
    var tabela = document.getElementById('tabelaUsuarios');

    // Limpar o conteúdo atual da tabela
    tabela.innerHTML = '';

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

   // Função para carregar e exibir usuários do localStorage
   function carregarUsuarios() {
    // Obter lista de usuários do localStorage
    var usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Obter a referência à tabela
    var tabela = document.getElementById('tabelaUsuarios');

    // Limpar o conteúdo atual da tabela
    tabela.innerHTML = '';

    // Preencher a tabela com os dados dos usuários
    usuarios.forEach(function(usuario, index) {
        var linha = tabela.insertRow();
        var colunaNome = linha.insertCell(0);
        var colunaEmail = linha.insertCell(1);
        var colunaSenha = linha.insertCell(2);
        var colunaAdmin = linha.insertCell(3);
        var colunaAcao = linha.insertCell(4);

        colunaNome.textContent = usuario.nome;
        colunaEmail.textContent = usuario.email;
        colunaSenha.textContent = usuario.senha;
        colunaAdmin.textContent = usuario.admin ? 'Sim' : 'Não';

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

document.getElementById('expand-btn').addEventListener('click', function() {
  var options = document.querySelector('.options');
  options.style.display = options.style.display === 'none' ? 'block' : 'none';
});

document.addEventListener('DOMContentLoaded', function () {
    var searchButton = document.getElementById('searchButton');
    var searchBar = document.querySelector('.search-bar');

    searchButton.addEventListener('click', function () {
        searchBar.style.display = (searchBar.style.display === 'none' || searchBar.style.display === '') ? 'block' : 'none';
    });
});
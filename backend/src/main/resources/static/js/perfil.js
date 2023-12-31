document.addEventListener("DOMContentLoaded", function () {
    const nomeUsuario = localStorage.getItem('nomeUsuario');
    const emailUsuario = localStorage.getItem('emailUsuario');

    if (nomeUsuario && emailUsuario) {
        document.getElementById("nomeUsuario").textContent = nomeUsuario;
        document.getElementById("emailUsuario").textContent = emailUsuario;
    } else {
        console.log('Nome do usuário ou e-mail não definidos no localStorage');
    }

    document.getElementById('btnEstoque').addEventListener('click', function () {
        redirectToPage('/estoque');
    });

    document.getElementById('btnFinanceiro').addEventListener('click', function () {
        redirectToPage('/financeiro');
    });

    document.getElementById('btnCadastrarClientes').addEventListener('click', function () {
        redirectToPage('/cadastro-cliente');
    });

    document.getElementById('btnListaProdutos').addEventListener('click', function () {
        redirectToPage('/lista-produtos');
    });

    document.getElementById('btnCadastrarVendas').addEventListener('click', function () {
        redirectToPage('/cadastro-vendas');
    });

    document.getElementById('btnListaClientes').addEventListener('click', function () {
        redirectToPage('/lista-clientes');
    });

    document.getElementById('btnHistoricoVendas').addEventListener('click', function () {
        redirectToPage('/historico-vendas');
    });

    document.getElementById('btnFeedback').addEventListener('click', function () {
        redirectToPage('/cadastroFeedback');
    });

    document.querySelector('.exit-button').addEventListener('click', function () {
        redirectToPage('/index');
    });

    document.querySelector('.exit-button').addEventListener('click', function () {
        redirectToPage('/login');
    });

    function redirectToPage(url) {
        window.location.href = url;
    }
});

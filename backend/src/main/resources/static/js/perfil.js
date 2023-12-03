document.addEventListener("DOMContentLoaded", function () {
    const userImage = document.getElementById("user-image");
    const imageUploadInput = document.getElementById("user-image-upload");

    imageUploadInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                userImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
    

    const nomeUsuario = localStorage.getItem('nomeUsuario');
    const emailUsuario = localStorage.getItem('emailUsuario');

    if (nomeUsuario && emailUsuario) {
        document.getElementById("nomeUsuario").textContent = "Nome: " + nomeUsuario;
        document.getElementById("emailUsuario").textContent = "E-mail: " + emailUsuario;
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

    document.getElementById('btnLucrosGastos').addEventListener('click', function () {
        redirectToPage('/lucros-gastos');
    });

    document.querySelector('.exit-button').addEventListener('click', function () {
        redirectToPage('/index');
    });

    document.querySelector('.feedback-button').addEventListener('click', function () {
        redirectToPage('/cadastro-feedback');
    });

    function redirectToPage(url) {
        window.location.href = url;
    }
});

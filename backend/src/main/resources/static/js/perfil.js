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

    const nomeUsuario = "Theo";
    const emailUsuario = "theoemail@example.com";

    document.getElementById("nomeUsuario").textContent = "Nome: " + nomeUsuario;
    document.getElementById("emailUsuario").textContent = "E-mail: " + emailUsuario;

    document.getElementById('btnEstoque').addEventListener('click', function() {
        window.location.href = '/estoque';
    });

    document.getElementById('btnFinanceiro').addEventListener('click', function() {
        window.location.href = '/financeiro';
    });

    document.getElementById('btnCadastrarClientes').addEventListener('click', function() {
        window.location.href = '/cadastro-cliente';
    });

    document.getElementById('btnListaProdutos').addEventListener('click', function() {
        window.location.href = '/lista-produtos';
    });

    document.getElementById('btnCadastrarVendas').addEventListener('click', function() {
        window.location.href = '/cadastro-vendas';
    });

    document.getElementById('btnListaClientes').addEventListener('click', function() {
        window.location.href = '/lista-clientes';
    });

    document.getElementById('btnHistoricoVendas').addEventListener('click', function() {
        window.location.href = '/historico-vendas';
    });

    document.getElementById('btnLucrosGastos').addEventListener('click', function() {
        window.location.href = '/lucros-gastos';
    });

    document.querySelector('.exit-button').addEventListener('click', function() {
        window.location.href = '/index';
    });

    document.querySelector('.feedback-button').addEventListener('click', function() {
        window.location.href = '/cadastro-feedback';
    });



});

document.addEventListener('DOMContentLoaded', function() {
    const formCadastro = document.getElementById('form-cliente');
    const mensagemCadastro = document.getElementById('mensagem-cadastro');

    formCadastro.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('nome-cliente').value;
        const dataNascimento = document.getElementById('data-nascimento').value;
        const cpf = document.getElementById('cpf-cliente').value;
        const nomeEmpresa = document.getElementById('nome-empresa').value;
        const cnpj = document.getElementById('cnpj-empresa').value;

        if (nome === '' || dataNascimento === '' || cpf === '' || nomeEmpresa === '' || cnpj === '') {
            mensagemCadastro.innerText = 'Por favor, preencha todos os campos.';
            mensagemCadastro.style.color = 'red';
        } else {
            mensagemCadastro.innerText = 'Cliente cadastrado com sucesso!';
            mensagemCadastro.style.color = 'green';

            // Limpar o formulário após o cadastro
            formCadastro.reset();
        }
    });
});
document.getElementById('voltar').addEventListener('click', function() {
    window.history.back();
});
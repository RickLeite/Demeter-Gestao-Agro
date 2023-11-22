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

        const cadastroCliente = {
            nome,
            dataNascimento,
            cpf,
            nomeEmpresa,
            cnpj
        };

        enviarCadastroParaServidor(cadastroCliente)
            .then(data => {
                console.log('Sucesso:', data);
                mensagemCadastro.innerText = 'Cliente cadastrado com sucesso!';
                mensagemCadastro.style.color = 'green';
                formCadastro.reset(); // Reset o formulário após o envio bem-sucedido
            })
            .catch(error => {
                console.error('Erro ao cadastrar o cliente:', error);
                mensagemCadastro.innerText = error.message;
                mensagemCadastro.style.color = 'red';
            });
    });

    function enviarCadastroParaServidor(cadastroCliente) {
        return fetch('http://localhost:3000/cadastroCliente/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cadastroCliente)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text || 'HTTP response not OK') });
            }
            return response.json();
        });
    }

    document.getElementById('voltar').addEventListener('click', function() {
        window.history.back();
    });
});

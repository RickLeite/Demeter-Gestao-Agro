document.addEventListener("DOMContentLoaded", function () {
    const formCadastro = document.getElementById("form-cadastro");

    formCadastro.addEventListener("submit", function (e) {
        e.preventDefault();

        const nomeProduto = document.getElementById("nome-produto").value;
        const quantidade = document.getElementById("quantidade").value;
        const preco = document.getElementById("valor-unitario").value;

        const produto = {
            nomeProduto,
            quantidade: parseInt(quantidade, 10),
            preco: parseFloat(preco)
        };

        enviarProdutoParaServidor(produto).then(() => {
            formCadastro.reset(); // Reset o formulário após o envio bem-sucedido
        }).catch(error => {
            console.error('Erro:', error);
        });
    });

    function enviarProdutoParaServidor(produto) {
        return fetch('http://localhost:8080/estoque/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Sucesso:', data);
            // Opcional: adicione o produto à tabela da interface do usuário aqui
        });
    }

    document.getElementById('voltar').addEventListener('click', function() {
        window.history.back();
    });
});

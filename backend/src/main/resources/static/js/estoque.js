document.addEventListener("DOMContentLoaded", function () {
    const formCadastro = document.getElementById("form-cadastro");
    const listaProdutos = document.getElementById("lista-produtos");

    formCadastro.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("nome-produto").value;
        const quantidade = parseFloat(document.getElementById("quantidade").value);
        const valorUnitario = parseFloat(document.getElementById("valor-unitario").value);

        if (!nome || isNaN(quantidade) || isNaN(valorUnitario)) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        const produto = {
            nomeProduto: nome,
            quantidade: quantidade,
            preco: valorUnitario
        };

        adicionarProdutoAPI(produto);
    });

    function adicionarProdutoAPI(produto) {
        fetch('http://127.0.0.1:3000/estoque/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        })
        .then(response => response.json())
        .then(data => {
            adicionarProdutoNaTabela(data);
        })
        .catch(error => console.error('Erro ao adicionar produto:', error));
    }

    function adicionarProdutoNaTabela(produto) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${produto.id}</td>
            <td>${produto.nomeProduto}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.preco}</td>
            <td>Ações</td>
        `;
        listaProdutos.appendChild(row);
    }
});

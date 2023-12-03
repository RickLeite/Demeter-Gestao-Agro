document.addEventListener("DOMContentLoaded", function () {
    const formCadastro = document.getElementById("form-cadastro");
    const listaProdutos = document.getElementById("lista-produtos");
    const voltarButton = document.getElementById("voltar");

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
            <td>${produto.nomeProduto}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.preco}</td>
            <td>
                <button class="excluir-button" data-id="${produto.id}">Excluir</button>
            </td>
        `;
        listaProdutos.appendChild(row);

        // Add event listener for the delete button
        const deleteButton = row.querySelector('.excluir-button');
        deleteButton.addEventListener('click', function () {
            removeLastEstoqueAPI();
        });
    }

    function removeLastEstoqueAPI() {
        fetch('http://127.0.0.1:3000/estoque/removeLast', {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    const rows = document.querySelectorAll('#lista-produtos tr');
                    const lastRow = rows[rows.length - 1];
                    lastRow.remove();
                } else {
                    console.error('Erro ao remover último produto:', response.statusText);
                }
            })
            .catch(error => console.error('Erro ao remover último produto:', error));
    }

    voltarButton.addEventListener("click", function () {
        window.location.href = "/perfil.html";
    });
});
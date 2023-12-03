document.addEventListener("DOMContentLoaded", function () {
    const formCadastro = document.getElementById("form-cadastro");
    const listaProdutos = document.getElementById("lista-produtos");
    const voltarButton = document.getElementById("voltar");

    // Fetch all products with the owner parameter when the page is loaded
    fetchAllProducts();

    formCadastro.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("nome-produto").value;
        const quantidade = parseFloat(document.getElementById("quantidade").value);
        const valorUnitario = parseFloat(document.getElementById("valor-unitario").value);

        if (!nome || isNaN(quantidade) || isNaN(valorUnitario)) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        const userEmail = getCookie("userEmail"); // Get the userEmail cookie

        // Log the userEmail to the console for debugging
        console.log("userEmail:", userEmail);

        const produto = {
            nomeProduto: nome,
            quantidade: quantidade,
            preco: valorUnitario,
            owner: userEmail // Include owner directly in the produto object
        };

        adicionarProdutoAPI(produto);
    });

    function adicionarProdutoAPI(produto) {
        fetch('/estoque/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
        const userEmail = getCookie("userEmail"); // Get the userEmail cookie

        fetch('/estoque/removeLast', { // Relative URL
            method: 'DELETE',
            headers: {
                'userEmail': userEmail // Include userEmail cookie in headers
            }
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

    // Helper function to get cookie value by name
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // Function to fetch all products with the owner parameter
    function fetchAllProducts() {
        const userEmail = getCookie("userEmail"); // Get the userEmail cookie

        // Fetch all products with the owner parameter
        fetch(`/estoque/byOwner?owner=${userEmail}`)
            .then(response => response.json())
            .then(data => {
                // Process the fetched products and display them in the UI
                displayProductsInTable(data);
            })
            .catch(error => console.error('Erro ao buscar produtos:', error));
    }

    // Function to display products in the UI table
    function displayProductsInTable(products) {
        // Clear existing rows in the table
        listaProdutos.innerHTML = "";

        // Iterate through each product and add a row to the table
        products.forEach(product => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${product.nomeProduto}</td>
                <td>${product.quantidade}</td>
                <td>${product.preco}</td>
                <td>
                    <button class="excluir-button" data-id="${product.id}">Excluir</button>
                </td>
            `;
            listaProdutos.appendChild(row);

            // Add event listener for the delete button
            const deleteButton = row.querySelector('.excluir-button');
            deleteButton.addEventListener('click', function () {
                removeLastEstoqueAPI();
            });
        });
    }
});

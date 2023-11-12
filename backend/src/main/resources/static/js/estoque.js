document.addEventListener("DOMContentLoaded", function () {
    const formCadastro = document.getElementById("form-cadastro");
    const listaProdutos = document.getElementById("lista-produtos");
    const botaoCadastrar = document.getElementById("cadastrar-button");
    const botaoGerarPlanilha = document.getElementById("botao-gerar-planilha");
    const dashboardQuantidadeProdutos = document.getElementById("quantidade-produtos");
    const dashboardValorTotal = document.getElementById("valor-total");

    let produtoEditando = null;
    let idProduto = 1;
    const produtos = [];

    formCadastro.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("nome-produto").value;
        const quantidade = parseFloat(document.getElementById("quantidade").value);
        const valorUnitario = parseFloat(document.getElementById("valor-unitario").value);

        if (!nome || isNaN(quantidade) || isNaN(valorUnitario)) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        if (produtoEditando) {
            const index = produtos.findIndex((produto) => produto.id === produtoEditando.id);
            produtos[index].nome = nome;
            produtos[index].quantidade = quantidade;
            produtos[index].valorUnitario = valorUnitario;

            const row = document.getElementById(produtoEditando.id);
            row.children[1].textContent = nome;
            row.children[2].textContent = quantidade;
            row.children[3].textContent = valorUnitario;

            produtoEditando = null;
            botaoCadastrar.textContent = "Cadastrar";
        } else {
            const novoProduto = {
                id: idProduto,
                nome: nome,
                quantidade: quantidade,
                valorUnitario: valorUnitario
            };
            adicionarProduto(novoProduto);
            produtos.push(novoProduto);
            idProduto++;
        }

        formCadastro.reset();
        gerarPlanilha();
        atualizarDashboard();
    });

    function adicionarProduto(produto) {
        const row = document.createElement("tr");
        row.setAttribute("id", produto.id);
        row.innerHTML = `
            <td>${produto.id}</td>
            <td>${produto.nome}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.valorUnitario}</td>
            <td>
                <button class="editar-button" data-id="${produto.id}">Editar</button>
                <button class="excluir-button" data-id="${produto.id}">Excluir</button>
            </td>
        `;
        listaProdutos.appendChild(row);
    }

    listaProdutos.addEventListener("click", (e) => {
        if (e.target.classList.contains("editar-button")) {
            const id = e.target.getAttribute("data-id");
            const produto = produtos.find((p) => p.id === parseInt(id));

            document.getElementById("nome-produto").value = produto.nome;
            document.getElementById("quantidade").value = produto.quantidade;
            document.getElementById("valor-unitario").value = produto.valorUnitario;
            produtoEditando = produto;
            botaoCadastrar.textContent = "Salvar";
        } else if (e.target.classList.contains("excluir-button")) {
            const id = e.target.getAttribute("data-id");
            const index = produtos.findIndex((produto) => produto.id === parseInt(id));
            const produto = produtos[index];

            // Exibir uma mensagem de confirmação
            const confirmarExclusao = confirm(`Tem certeza que deseja excluir o produto "${produto.nome}"?`);

            if (confirmarExclusao) {
                produtos.splice(index, 1);

                const row = document.getElementById(id);
                row.remove();

                gerarPlanilha();
                atualizarDashboard();
            }
        }
    });

    function gerarPlanilha() {
        const table = document.getElementById("lista-produtos");
        const rows = table.querySelectorAll("tr");
        const csvContent = [];

        // Adiciona cabeçalhos à planilha
        csvContent.push("ID,Produto,Quantidade,Valor Unitário");

        for (const row of rows) {
            const cells = row.querySelectorAll("td");
            const rowData = [];

            // Obtém os dados da linha e os adiciona à matriz de dados
            for (const cell of cells) {
                rowData.push(cell.textContent);
            }

            // Converte a matriz de dados em uma string CSV
            const rowString = rowData.join(",");
            csvContent.push(rowString);
        }

        const csvString = csvContent.join("\n");
        const blob = new Blob([csvString], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        botaoGerarPlanilha.href = url;
        botaoGerarPlanilha.download = "estoque.csv";
    }

    function atualizarDashboard() {
        dashboardQuantidadeProdutos.textContent = produtos.length;

        const valorTotal = produtos.reduce((total, produto) => total + produto.quantidade * produto.valorUnitario, 0);
        dashboardValorTotal.textContent = valorTotal.toFixed(2);
    }
});
document.getElementById('voltar').addEventListener('click', function() {
    window.history.back();
});
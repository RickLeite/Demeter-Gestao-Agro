document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-cadastro");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const requiredInputs = form.querySelectorAll('input[required]');
        let isValid = true;

        requiredInputs.forEach(input => {
            if (input.value.trim() === '') {
                isValid = false;
            }
        });

        if (!isValid) {
            alert("Por favor, preencha todos os campos obrigatórios.");
        } else {
            let total = 0;
            const produtos = document.querySelectorAll(".produto");
            const produtosArray = [];

            produtos.forEach(produto => {
                const quantidade = parseFloat(produto.querySelector(".quantidade").value);
                const valorUnitario = parseFloat(produto.querySelector(".valor-unitario").value);
                total += quantidade * valorUnitario;

                const produtoObj = {
                    nomeProduto: produto.querySelector(".nome-produto").value,
                    quantidade: quantidade,
                    valorUnitario: valorUnitario,
                };

                produtosArray.push(produtoObj);
            });

            document.getElementById("total").innerText = `R$ ${total.toFixed(2)}`;

            // Agora, envie a venda para o backend
            const vendaData = {
                nomeCliente: document.querySelector("#nome-cliente").value,
                cnpj: document.querySelector("#cnpj").value,
                saleDate: document.querySelector("#saleDate").value,
                produtos: produtosArray,
                valorTotal: total,
            };

            // Use fetch para enviar os dados ao backend
            fetch('http://localhost:3000/vendas/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(vendaData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao cadastrar a venda.');
                }
                return response.json(); // Use json() em vez de text()
            })
            .then(data => {
                alert(data.message); // Exibe uma mensagem de sucesso ou erro do servidor
                form.reset(); // Limpa o formulário
            })
            .catch(error => {
                alert(error.message); // Exibe mensagem de erro
            });
        }
    });

    const addProductButton = document.getElementById("btn-adicionar-produtos");

    addProductButton.addEventListener("click", function () {
        const newProductDiv = document.createElement("div");
        newProductDiv.classList.add("produto");

        const productHTML = `
            <div class="input-wrapper">
                <label>Nome do Produto:</label>
                <input type="text" class="nome-produto" required>
            </div>
            <div class="input-wrapper">
                <label>Quantidade:</label>
                <input type="number" class="quantidade" required>
            </div>
            <div class="input-wrapper">
                <label>Valor Unitário (R$):</label>
                <input type="number" class="valor-unitario" required step="0.01">
            </div>
        `;

        newProductDiv.innerHTML = productHTML;
        form.insertBefore(newProductDiv, addProductButton);
    });

    const emitirNotaButton = document.getElementById("btn-emitir-nota");

    emitirNotaButton.addEventListener("click", function () {
        const pdf = new jsPDF();
    
        pdf.setFontSize(16);
        pdf.text("Nota Fiscal", 10, 10);
    
        const nomeCliente = document.querySelector("#nome-cliente").value;
        const cnpj = document.querySelector("#cnpj").value;
        const dataVenda = document.querySelector("#saleDate").value;
    
        pdf.setFontSize(12);
        pdf.text(`Nome do Cliente: ${nomeCliente}`, 10, 30);
        pdf.text(`CNPJ: ${cnpj}`, 10, 40);
        pdf.text(`Data De Venda: ${dataVenda}`, 10, 50);
    
        const produtos = document.querySelectorAll(".produto");
        let yOffset = 60;
    
        produtos.forEach((produto, index) => {
            const nomeProduto = produto.querySelector(".nome-produto").value;
            const quantidade = produto.querySelector(".quantidade").value;
            const valorUnitario = produto.querySelector(".valor-unitario").value;
    
            pdf.text(`Produto ${index + 1}: ${nomeProduto}`, 10, yOffset);
            yOffset += 10;
            pdf.text(`Quantidade: ${quantidade}`, 10, yOffset);
            yOffset += 10;
            pdf.text(`Valor Unitário (R$): ${valorUnitario}`, 10, yOffset);
            yOffset += 10;
        });
    
        const total = document.getElementById("total").innerText;
        yOffset += 10;
        pdf.text(`Valor Total: ${total}`, 10, yOffset);
    
        pdf.save("nota_fiscal.pdf");
    });
    
    document.getElementById('voltar').addEventListener('click', function () {
        window.history.back();
    });
});

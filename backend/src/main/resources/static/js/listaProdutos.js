document.addEventListener('DOMContentLoaded', function() {
    const tabelaCorpo = document.querySelector('tbody');
    const inputPesquisa = document.querySelector('.header input[type="text"]');
    const btnBuscar = document.getElementById('btnBuscar');
    const btnGerarCSV = document.getElementById('btnGerarCSV');
    const btnGerarPDF = document.getElementById('btnGerarPDF');
    const btnVoltar = document.getElementById('voltar');

    const buscarProdutos = () => fetch('/produtos').then(response => response.json());

    const criarLinhaProduto = produto => {
        const preco = Number(produto.preco);
        const quantidade = Number(produto.quantidade);
        const valorTotal = preco * quantidade;
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${produto.id}</td>
            <td>${produto.nomeProduto}</td>
            <td>${quantidade}</td>
            <td>R$ ${preco.toFixed(2)}</td>
            <td>R$ ${valorTotal.toFixed(2)}</td>
            <td>
                <button class="btn-delete"><i class="fas fa-trash-alt"></i> Excluir</button>
            </td>
        `;
        return linha;
    };

    const exibirTodosProdutos = () => {
        buscarProdutos().then(produtos => {
            tabelaCorpo.innerHTML = '';
            produtos.forEach(produto => {
                tabelaCorpo.appendChild(criarLinhaProduto(produto));
            });
        });
    };

    document.addEventListener('click', event => {
        if (event.target.classList.contains('btn-delete')) {
            const idProduto = event.target.closest('tr').querySelector('td').textContent;
            fetch(`/produtos/${idProduto}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) exibirTodosProdutos();
                    else alert('Erro ao excluir o produto');
                });
        }
    });

    btnBuscar.addEventListener('click', () => {
        const pesquisa = inputPesquisa.value.toLowerCase();
        buscarProdutos().then(produtos => {
            tabelaCorpo.innerHTML = '';
            produtos.filter(produto => produto.nomeProduto.toLowerCase().includes(pesquisa))
                .forEach(produto => tabelaCorpo.appendChild(criarLinhaProduto(produto)));
        });
    });

    const gerarCSVProdutos = () => {
        buscarProdutos().then(produtos => {
            let csv = 'ID;Nome do Produto;Quantidade;Valor Unitario;Valor Total\n';
            produtos.forEach(produto => {
                csv += `${produto.id};${produto.nomeProduto};${produto.quantidade};${produto.preco};${(produto.preco * produto.quantidade).toFixed(2)}\n`;
            });
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'lista_produtos.csv';
            a.click();
            window.URL.revokeObjectURL(url);
        });
    };

    btnGerarCSV.addEventListener('click', gerarCSVProdutos);

    const gerarPDF = () => {
        buscarProdutos().then(produtos => {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
    
            // Definindo a cor de fundo para o cabeçalho como verde grama
            const greenGrassColor = [0, 155, 72]; // Cor verde grama
    
            const headers = [['ID', 'Nome do Produto', 'Quantidade', 'Valor Unitário', 'Valor Total']];
            const data = produtos.map(produto => [
                produto.id,
                produto.nomeProduto,
                produto.quantidade.toString(),
                `R$ ${produto.preco.toFixed(2)}`,
                `R$ ${(produto.preco * produto.quantidade).toFixed(2)}`
            ]);
    
            doc.autoTable({
                head: headers,
                body: data,
                theme: 'plain', // Usa um tema simples sem grades
                headStyles: {
                    fillColor: greenGrassColor, // Define a cor de fundo para as células do cabeçalho
                    textColor: [0, 0, 0], // Define a cor do texto para preto
                    halign: 'center', // Centraliza horizontalmente
                    valign: 'middle', // Centraliza verticalmente
                    fontStyle: 'bold', // Texto em negrito
                    fontSize: 10 // Diminui a fonte para se ajustar ao espaço disponível
                },
                styles: {
                    cellWidth: 'wrap' // Ajusta a largura da célula para o conteúdo
                },
                columnStyles: {
                    0: {cellWidth: 'auto'}, // ID
                    1: {cellWidth: 'auto'}, // Nome do Produto
                    2: {cellWidth: 'auto'}, // Quantidade
                    3: {cellWidth: 'auto'}, // Valor Unitário
                    4: {cellWidth: 'auto'}  // Valor Total
                },
                margin: { top: 20 },
                startY: 30, // Posição vertical inicial da tabela
                didDrawPage: data => {
                    // Adicionando o título do relatório na página
                    doc.setFontSize(18);
                    doc.setTextColor(40);
                    doc.text('Relatório de Produtos', data.settings.margin.left, 20);
                },
                didDrawCell: data => {
                    // Não há necessidade de preencher novamente as células do cabeçalho, isso já é tratado pelo headStyles
                },
            });
    
            // Salva o PDF
            doc.save('lista-produtos.pdf');
        });
    };
    

    btnGerarPDF.addEventListener('click', gerarPDF);

    if (btnVoltar) {
        btnVoltar.addEventListener('click', () => window.history.back());
    }

    exibirTodosProdutos();
});

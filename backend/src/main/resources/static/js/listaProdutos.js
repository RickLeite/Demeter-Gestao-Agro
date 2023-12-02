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
            if (confirm('Demeter: Tem certeza que deseja excluir o produto?')) {
                fetch(`/produtos/${idProduto}`, { method: 'DELETE' })
                    .then(response => {
                        if (response.ok) {
                            exibirTodosProdutos();
                        } else {
                            alert('Erro ao excluir o produto');
                        }
                    });
            }
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
            const greenGrassColor = [0, 155, 72]; 
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
                theme: 'plain',
                headStyles: {
                    fillColor: greenGrassColor,
                    textColor: [0, 0, 0],
                    halign: 'center',
                    valign: 'middle',
                    fontStyle: 'bold',
                    fontSize: 10
                },
                styles: {
                    cellWidth: 'wrap'
                },
                columnStyles: {
                    0: {cellWidth: 'auto'},
                    1: {cellWidth: 'auto'},
                    2: {cellWidth: 'auto'},
                    3: {cellWidth: 'auto'},
                    4: {cellWidth: 'auto'}
                },
                margin: { top: 20 },
                startY: 30,
                didDrawPage: data => {
                    doc.setFontSize(18);
                    doc.setTextColor(40);
                    doc.text('Relatório de Produtos', data.settings.margin.left, 20);
                },
                didDrawCell: data => {
                },
            });
            doc.save('lista-produtos.pdf');
        });
    };
    

    btnGerarPDF.addEventListener('click', gerarPDF);

    if (btnVoltar) {
        btnVoltar.addEventListener('click', () => window.history.back());
    }

    exibirTodosProdutos();
});

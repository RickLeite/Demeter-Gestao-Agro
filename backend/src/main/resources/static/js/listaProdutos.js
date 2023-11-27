document.addEventListener('DOMContentLoaded', function() {
    const tabelaCorpo = document.querySelector('tbody');
    const inputPesquisa = document.querySelector('.header input[type="text"]');
    const btnBuscar = document.getElementById('btnBuscar');
    const btnGerarCSV = document.getElementById('btnGerarCSV');
    const btnGerarPDF = document.getElementById('btnGerarPDF');
    const btnVoltar = document.getElementById('voltar');

    function buscarProdutos() {
        return fetch('/produtos')
            .then(response => response.json())
            .catch(error => console.error('Erro ao buscar produtos:', error));
    }

    function exibirTodosProdutos() {
        buscarProdutos().then(produtos => {
            tabelaCorpo.innerHTML = '';
            produtos.forEach(produto => {
                const linha = criarLinhaProduto(produto);
                tabelaCorpo.appendChild(linha);
            });
        });
    }

    function criarLinhaProduto(produto) {
        const preco = Number(produto.preco);
        const quantidade = Number(produto.quantidade);
        const valorTotal = preco * quantidade;

        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${produto.idProduto || 'Indisponível'}</td>
            <td>${produto.nomeProduto || 'Indisponível'}</td>
            <td>${quantidade || 'Indisponível'}</td>
            <td>R$ ${preco.toFixed(2) || '0.00'}</td>
            <td>R$ ${valorTotal.toFixed(2) || '0.00'}</td>
            <td>
                <button class="btn-delete"><i class="fas fa-trash-alt"></i> Excluir</button>
            </td>
        `;
        return linha;
    }

    btnBuscar.addEventListener('click', function() {
        const pesquisa = inputPesquisa.value;
        atualizarTabela(pesquisa);
    });

    function atualizarTabela(pesquisa) {
        buscarProdutos().then(produtos => {
            tabelaCorpo.innerHTML = '';
            produtos.filter(produto => produto.nomeProduto.toLowerCase().includes(pesquisa.toLowerCase()))
            .forEach(produto => {
                const linha = criarLinhaProduto(produto);
                tabelaCorpo.appendChild(linha);
            });
        });
    }

    function gerarCSVProdutos() {
        buscarProdutos().then(produtos => {
            let csv = 'ID;Nome do Produto;Quantidade;Valor Unitario;Valor Total\n';
            produtos.forEach(produto => {
                let linhaCSV = [
                    produto.idProduto,
                    produto.nomeProduto,
                    produto.quantidade,
                    produto.preco,
                    (produto.preco * produto.quantidade).toFixed(2)
                ].join(';');
                csv += linhaCSV + '\n';
            });
            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.setAttribute('hidden', '');
            a.setAttribute('href', url);
            a.setAttribute('download', 'lista_produtos.csv');
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }

    btnGerarCSV.addEventListener('click', gerarCSVProdutos);

    function gerarPDF() {
        buscarProdutos().then(produtos => {
            const doc = new jsPDF();
            doc.setFontSize(16);
            doc.text('Lista de Produtos', 80, 10);
            let yPos = 30;
            const headers = ['ID', 'Nome do Produto', 'Quantidade', 'Valor Unitário', 'Valor Total'];
            doc.setFontSize(12);
            const positions = [10, 30, 70, 100, 130];
            headers.forEach((header, index) => {
                doc.text(header, positions[index], yPos);
            });
            yPos += 10;
            doc.setFontSize(10);
            produtos.forEach(produto => {
                doc.text(produto.idProduto.toString(), 10, yPos);
                doc.text(produto.nomeProduto, 30, yPos);
                doc.text(produto.quantidade.toString(), 70, yPos);
                doc.text(produto.preco.toString(), 100, yPos);
                doc.text((produto.preco * produto.quantidade).toFixed(2), 130, yPos);
                yPos += 10;
            });
            doc.save('lista_produtos.pdf');
        });
    }

    btnGerarPDF.addEventListener('click', gerarPDF);

    if (btnVoltar) {
        btnVoltar.addEventListener('click', function() {
            window.history.back();
        });
    }

    exibirTodosProdutos();
});

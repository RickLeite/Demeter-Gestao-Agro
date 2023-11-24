document.addEventListener('DOMContentLoaded', function () {
    const tabelaCorpo = document.querySelector('tbody');
    const inputPesquisa = document.querySelector('#inputPesquisa');
    const btnPesquisar = document.querySelector('#btnPesquisar');
    const btnGerarCSV = document.querySelector('#btnGerarCSV');
    const btnGerarPDF = document.querySelector('#btnGerarPDF');

    function obterTodasAsVendas() {
        return fetch('http://localhost:3000/vendas/todas')
            .then(response => response.json())
            .then(vendas => {
                exibirVendasNaTabela(vendas);
            })
            .catch(error => console.error('Erro ao obter as vendas:', error));
    }

    function exibirVendasNaTabela(vendas) {
        tabelaCorpo.innerHTML = '';
        vendas.forEach(venda => {
            const linha = criarLinhaVenda(venda);
            tabelaCorpo.appendChild(linha);
        });
    }

    function criarLinhaVenda(venda) {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${venda.cnpj}</td>
            <td>${venda.nomeCliente}</td>
            <td>${venda.quantidade}</td>
            <td>${Number(venda.valorTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            <td>${venda.saleDate}</td>
            <td>
                <button class="btn-delete" data-id="${venda.id}">
                    <i class="fas fa-trash-alt"></i> Excluir
                </button>
            </td>
        `;

        linha.querySelector('.btn-delete').addEventListener('click', function () {
            const vendaId = venda.id;
            excluirVenda(vendaId);
        });

        return linha;
    }

    function pesquisarVendasPorCNPJ(cnpj) {
        fetch(`http://localhost:3000/vendas/por-cnpj/${cnpj}`)
            .then(response => response.json())
            .then(vendas => {
                exibirVendasNaTabela(vendas);
            })
            .catch(error => console.error('Erro ao obter as vendas por CNPJ:', error));
    }

    function excluirVenda(vendaId) {
        fetch(`http://localhost:3000/vendas/excluir/${vendaId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(result => {
                console.log('Venda excluída com sucesso:', result);
                obterTodasAsVendas();
            })
            .catch(error => console.error('Erro ao excluir a venda:', error));
    }

    btnPesquisar.addEventListener('click', function () {
        const termoPesquisado = inputPesquisa.value;
        if (termoPesquisado.trim() !== '') {
            pesquisarVendasPorCNPJ(termoPesquisado);
        } else {
            obterTodasAsVendas();
        }
    });

    btnGerarCSV.addEventListener('click', function () {
        obterTodasAsVendas().then(vendas => gerarCSV(vendas));
    });

    btnGerarPDF.addEventListener('click', function () {
        obterTodasAsVendas().then(vendas => gerarPDF(vendas));
    });

    btnGerarExcel.addEventListener('click', function () {
        obterTodasAsVendas().then(vendas => gerarExcel(vendas));
    });

    function gerarCSV(vendas) {
        const linhas = vendas.map(venda => Object.values(venda).join(','));

        const csvContent = 'data:text/csv;charset=utf-8,' + linhas.join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'relatorio.csv');
        document.body.appendChild(link); // Required for Firefox
        link.click();
    }

    function gerarPDF(vendas) {
        const doc = new jsPDF();

        const header = ['CNPJ', 'Nome Cliente', 'Quantidade', 'Valor Total', 'Data da Venda'];

        const linhas = vendas.map(venda => [
            venda.cnpj,
            venda.nomeCliente,
            venda.quantidade,
            Number(venda.valorTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            venda.saleDate
        ]);

        doc.autoTable({
            head: [header],
            body: linhas
        });

        doc.save('relatorio.pdf');
    }

    function gerarExcel(vendas) {
        const excelData = [['CNPJ', 'Nome Cliente', 'Quantidade', 'Valor Total', 'Data da Venda']];

        vendas.forEach(venda => {
            const vendaData = [
                venda.cnpj,
                venda.nomeCliente,
                venda.quantidade,
                Number(venda.valorTotal).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                venda.saleDate
            ];

            excelData.push(vendaData);
        });

        const ws = XLSX.utils.aoa_to_sheet(excelData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Relatorio');

        XLSX.writeFile(wb, 'relatorio.xlsx');
    }

    obterTodasAsVendas();
});

document.getElementById('voltar').addEventListener('click', function () {
    window.history.back();
});

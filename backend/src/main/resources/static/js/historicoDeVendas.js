document.addEventListener('DOMContentLoaded', function () {
    const tabelaCorpo = document.querySelector('tbody');
    const inputPesquisa = document.querySelector('#inputPesquisa');
    const btnPesquisar = document.querySelector('#btnPesquisar');
    const btnGerarPDF = document.querySelector('#btnGerarPDF');
    const btnGerarExcel = document.querySelector('#btnGerarExcel');
    const voltarButton = document.getElementById("voltar");

    // Adicione a função para exibir mensagem de venda cadastrada com sucesso
    function exibirMensagemCadastro() {
        const mensagemCadastro = document.getElementById('mensagemCadastro');
        mensagemCadastro.innerHTML = 'Venda cadastrada com sucesso!';
        setTimeout(() => {
            mensagemCadastro.innerHTML = ''; // Limpa a mensagem após alguns segundos
        }, 3000); // Tempo em milissegundos (3 segundos neste exemplo)
    }

    function obterTodasAsVendas() {
        return fetch('http://localhost:3000/vendas/todas')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao obter as vendas.');
                }
                return response.json();
            })
            .then(vendas => {
                exibirVendasNaTabela(vendas);
            })
            .catch(error => console.error('Erro ao obter as vendas:', error.message));
    }

    function exibirVendasNaTabela(vendas) {
        tabelaCorpo.innerHTML = '';
        // Ordenar as vendas pela data de forma descendente
        vendas.sort((a, b) => new Date(b.saleDate) - new Date(a.saleDate));

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
            <td>${venda.codigoVenda}</td>
            <td>${venda.produtos.reduce((total, produto) => total + produto.quantidade, 0)}</td>
            <td>${venda.valorTotal.toFixed(2)}</td>
            <td>${venda.saleDate}</td>
        `;

        return linha;
    }

    function pesquisarVendasPorCNPJ(cnpj) {
        fetch(`http://localhost:3000/vendas/por-cnpj/${cnpj}`)
            .then(response => response.json())
            .then(vendas => {
                exibirVendasNaTabela(vendas);
            })
            .catch(error => console.error('Erro ao obter as vendas por CNPJ:', error.message));
    }

    btnPesquisar.addEventListener('click', function () {
        const termoPesquisado = inputPesquisa.value;
        if (termoPesquisado.trim() !== '') {
            pesquisarVendasPorCNPJ(termoPesquisado);
        } else {
            obterTodasAsVendas();
        }
    });

    btnGerarPDF.addEventListener('click', function () {
        obterTodasAsVendas().then(vendas => gerarPDF(vendas));
    });

    btnGerarExcel.addEventListener('click', function () {
        obterTodasAsVendas().then(vendas => gerarExcel(vendas));
    });

    function gerarPDF(vendas) {
        const docDefinition = {
            content: [
                { text: 'Relatório de Vendas', style: 'header' },
                {
                    table: {
                        headers: ['CNPJ', 'Nome Cliente', 'Código da Venda', 'Quantidade', 'Valor Total', 'Data da Venda'],
                        body: vendas.map(venda => [
                            venda.cnpj,
                            venda.nomeCliente,
                            venda.codigoVenda,
                            venda.produtos.reduce((total, produto) => total + produto.quantidade, 0),
                            venda.valorTotal.toFixed(2),
                            venda.saleDate
                        ])
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true
                }
            }
        };

        pdfmake.createPdf(docDefinition).download('relatorio.pdf');

        // Chame a função para exibir a mensagem de venda cadastrada com sucesso
        exibirMensagemCadastro();
    }

    function gerarExcel(vendas) {
        const excelData = [['CNPJ', 'Nome Cliente', 'Código da Venda', 'Quantidade', 'Valor Total', 'Data da Venda']];

        vendas.forEach(venda => {
            const vendaData = [
                venda.cnpj,
                venda.nomeCliente,
                venda.codigoVenda,
                venda.produtos.reduce((total, produto) => total + produto.quantidade, 0),
                venda.valorTotal.toFixed(2),
                venda.saleDate
            ];

            excelData.push(vendaData);
        });

        const ws = XLSX.utils.aoa_to_sheet(excelData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Relatorio');

        XLSX.writeFile(wb, 'relatorio.xlsx');

        // Chame a função para exibir a mensagem de venda cadastrada com sucesso
        exibirMensagemCadastro();
    }

    obterTodasAsVendas();
});

document.getElementById('voltar').addEventListener('click', function () {
    window.history.back();
});

document.addEventListener('DOMContentLoaded', function() {
    const tabelaCorpo = document.querySelector('tbody');
    const inputPesquisa = document.querySelector('input[type="text"]');
    const btnPesquisar = document.querySelector('#btnPesquisar');
    const btnGerarCSV = document.querySelector('#gerarRelatorios button:nth-child(1)'); // Primeiro botão do container gerarRelatorios
    const btnGerarPDF = document.querySelector('#gerarRelatorios button:nth-child(2)'); // Segundo botão do container gerarRelatorios

      // Dados fictícios de vendas
    const vendas = [
        {
            cnpj: '12.345.678/0001-99',
            nomeEmpresa: 'Empresa A',
            quantidadeTotal: 100,
            valorTotal: 'R$ 1.000,00',
            dataVenda: '01/11/2023'
        },
        {
            cnpj: '98.765.432/0001-00',
            nomeEmpresa: 'Empresa B',
            quantidadeTotal: 50,
            valorTotal: 'R$ 500,00',
            dataVenda: '03/11/2023'
        },
        {
            cnpj: '55.555.555/0001-11',
            nomeEmpresa: 'Empresa C',
            quantidadeTotal: 30,
            valorTotal: 'R$ 300,00',
            dataVenda: '03/11/2023'
        }
    ];

    // Função para exibir todas as vendas
    function exibirTodasAsVendas() {
        tabelaCorpo.innerHTML = '';
        vendas.forEach(venda => {
            const linha = criarLinhaVenda(venda);
            tabelaCorpo.appendChild(linha);
        });
    }

    // Função para criar uma linha de venda com base nos dados fornecidos
    function criarLinhaVenda(venda) {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${venda.cnpj}</td>
            <td>${venda.nomeEmpresa}</td>
            <td>${venda.quantidadeTotal}</td>
            <td>${venda.valorTotal}</td>
            <td>${venda.dataVenda}</td>
            <td>
                <button class="btn-delete"><i class="fas fa-trash-alt"></i> Excluir</button>
            </td>
        `;

        // Adicione um ouvinte de evento ao botão 'Excluir' da linha recém-criada
        linha.querySelector('.btn-delete').addEventListener('click', function() {
            // Remova a linha quando o botão de exclusão for clicado
            linha.remove();
        });

        return linha;
    }
    btnPesquisar.addEventListener('click', function() {
        const termoPesquisado = inputPesquisa.value;
        atualizarTabelaPorPesquisa(termoPesquisado);
    });
    
    // Função para atualizar a tabela com base na pesquisa
    function atualizarTabelaPorPesquisa(termoPesquisado) {
        tabelaCorpo.innerHTML = '';
        const resultados = vendas.filter(venda => {
            // Verifica se algum campo contém o termo de pesquisa
            return Object.values(venda).some(valor => {
                if (valor.toString().toLowerCase().includes(termoPesquisado.toLowerCase())) {
                    return true;
                }
            });
        });

        resultados.forEach(venda => {
            const linha = criarLinhaVenda(venda);
            tabelaCorpo.appendChild(linha);
        });
    }



    function gerarCSV() {
        let csv = 'CNPJ;Nome da empresa;Quantidade total;Valor total;Data da venda\n';
        vendas.forEach(venda => {
            let linhaCSV = [
                `"${venda.cnpj}"`,
                `"${venda.nomeEmpresa}"`,
                venda.quantidadeTotal,
                `"${venda.valorTotal}"`,
                `"${venda.dataVenda}"`
            ].join(';');
            csv += linhaCSV + '\n';
        });
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'historico_vendas.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    
    
    

    function gerarPDF() {
        const doc = new jsPDF();
    
        doc.setFontSize(16);
        doc.text('Histórico de Vendas', 80, 10); // Título do documento
    
        let yPos = 30; // Começa um pouco mais abaixo para caber o título
        const headers = ['CNPJ', 'Nome da empresa', 'Quantidade total', 'Valor total', 'Data da venda'];
    
        doc.setFontSize(12); // Tamanho de fonte para cabeçalhos
    
        // Posição x para cada cabeçalho (para alinhar corretamente)
        const positions = [20, 60, 100, 140, 170];
    
        headers.forEach((header, index) => {
            doc.text(header, positions[index], yPos);
        });
    
        yPos += 10; 
    
        doc.setFontSize(10); // Tamanho de fonte para o conteúdo
    
        vendas.forEach(venda => {
            doc.text(venda.cnpj, 20, yPos);
            doc.text(venda.nomeEmpresa, 60, yPos);
            doc.text(venda.quantidadeTotal.toString(), 100, yPos);
            doc.text(venda.valorTotal, 140, yPos);
            doc.text(venda.dataVenda, 170, yPos);
            yPos += 10;
        });
    
        doc.save('historico_vendas.pdf');
    }
    

    btnGerarCSV.addEventListener('click', function() {
        gerarCSV();
    });

    btnGerarPDF.addEventListener('click', function() {
        gerarPDF();
    });

    // Exibir todas as vendas inicialmente
    exibirTodasAsVendas();
});

document.getElementById('voltar').addEventListener('click', function() {
    window.history.back();
});
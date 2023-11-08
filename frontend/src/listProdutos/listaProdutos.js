document.addEventListener('DOMContentLoaded', function() {
    const tabelaCorpo = document.querySelector('tbody');
    const inputPesquisa = document.querySelector('input[type="text"]');
    const btnBuscar = document.getElementById('btnPesquisar'); // Adicionei o ID ao botão de pesquisa
    const btnGerarCSV = document.querySelector('#gerarRelatorios button:nth-child(1)');
    const btnGerarPDF = document.querySelector('#gerarRelatorios button:nth-child(2)');

    // Dados fictícios de produtos
    const produtos = [
        {
            idProduto: 1,
            nomeProduto: 'Produto A',
            quantidade: 10,
            valorUnitario: 'R$ 100,00',
            valorTotal: 'R$ 1.000,00',
            acao: 'Editar'
        },
        {
            idProduto: 2,
            nomeProduto: 'Produto B',
            quantidade: 5,
            valorUnitario: 'R$ 50,00',
            valorTotal: 'R$ 250,00',
            acao: 'Editar'
        },
        {
            idProduto: 3,
            nomeProduto: 'Produto C',
            quantidade: 3,
            valorUnitario: 'R$ 30,00',
            valorTotal: 'R$ 90,00',
            acao: 'Editar'
        }
    ];

    // Função para exibir todos os produtos
    function exibirTodosProdutos() {
        tabelaCorpo.innerHTML = '';
        produtos.forEach(produto => {
            const linha = criarLinhaProduto(produto);
            tabelaCorpo.appendChild(linha);

            const btnExcluir = linha.querySelector('.btn-delete');
            btnExcluir.addEventListener('click', function() {
                linha.remove();
            });
        });
    }

    // Função para criar uma linha de produto com base nos dados fornecidos
    function criarLinhaProduto(produto) {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${produto.idProduto}</td>
            <td>${produto.nomeProduto}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.valorUnitario}</td>
            <td>${produto.valorTotal}</td>
            <td>
                <button class="btn-delete"><i class="fas fa-trash-alt"></i> Excluir</button>
            </td>
        `;
        return linha;
    }

    // Função para atualizar a tabela com base na pesquisa
    function atualizarTabela(pesquisa) {
        tabelaCorpo.innerHTML = '';

        if (pesquisa.trim() === '') {
            exibirTodosProdutos();
        } else {
            const resultados = produtos.filter(produto => {
                for (const propriedade in produto) {
                    if (produto[propriedade].toString().toLowerCase().includes(pesquisa.toLowerCase())) {
                        return true;
                    }
                }
                return false;
            });
            resultados.forEach(produto => {
                const linha = criarLinhaProduto(produto);
                tabelaCorpo.appendChild(linha);

                const btnExcluir = linha.querySelector('.btn-delete');
                btnExcluir.addEventListener('click', function() {
                    linha.remove();
                });
            });
        }
    }

    // Ouvinte de evento para o botão de busca
    btnBuscar.addEventListener('click', function() {
        const pesquisa = inputPesquisa.value;
        console.log('Pesquisa: ' + pesquisa); // Adiciona um log para verificar o valor da pesquisa
        atualizarTabela(pesquisa);
    });
    function gerarCSVProdutos() {
        let csv = 'ID;Nome do Produto;Quantidade;Valor Unitario;Valor Total\n';
        produtos.forEach(produto => {
            let linhaCSV = [
                `"${produto.idProduto}"`,
                `"${produto.nomeProduto}"`,
                `"${produto.quantidade}"`,
                `"${produto.valorUnitario}"`,
                `"${produto.valorTotal}"`
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
    }
    
    btnGerarCSV.addEventListener('click', function() {
        gerarCSVProdutos();
    
    });
    
    function gerarPDF() {
        const doc = new jsPDF();
    
        doc.setFontSize(16);
        doc.text('Lista de Produtos', 80, 10); // Título do documento
    
        let yPos = 30; // Começa um pouco mais abaixo para caber o título
        const headers = ['ID', 'Nome do Produto', 'Quantidade', 'Valor Unitário', 'Valor Total'];
    
        doc.setFontSize(12); // Tamanho de fonte para cabeçalhos
    
        // Posição x para cada cabeçalho (para alinhar corretamente)
        const positions = [10, 30, 70, 100, 130];
    
        headers.forEach((header, index) => {
            doc.text(header, positions[index], yPos);
        });
    
        yPos += 10; 
    
        doc.setFontSize(10); // Tamanho de fonte para o conteúdo
    
        produtos.forEach(produto => {
            doc.text(produto.idProduto.toString(), 10, yPos);
            doc.text(produto.nomeProduto, 30, yPos);
            doc.text(produto.quantidade.toString(), 70, yPos);
            doc.text(produto.valorUnitario, 100, yPos);
            doc.text(produto.valorTotal, 130, yPos);
            yPos += 10;
        });
    
        doc.save('lista_produtos.pdf');
    }
    
    
    btnGerarPDF.addEventListener('click', function() {
        gerarPDF();
    });
    
    // Exibir todos os produtos inicialmente
    exibirTodosProdutos();

});

// Ouvinte de evento para o botão de voltar
document.getElementById('botaoVoltar').addEventListener('click', function() {
    window.history.back();
});
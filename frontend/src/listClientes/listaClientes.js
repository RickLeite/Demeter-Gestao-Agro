document.addEventListener('DOMContentLoaded', function() {
    const tabelaCorpo = document.querySelector('tbody');
    const inputPesquisa = document.querySelector('input[type="text"]');
    const btnPesquisar = document.querySelector('#btnSearch');
    const btnGerarCSV = document.querySelector('#gerarRelatorios button:nth-child(1)'); // Primeiro botão do container gerarRelatorios
    const btnGerarPDF = document.querySelector('#gerarRelatorios button:nth-child(2)'); // Segundo botão do container gerarRelatorios

    const vendas = [
        {
            idCliente: 1,
            nomeCliente: 'Cliente A',
            dataNascimento: '01/01/1990',
            cpf: '123.456.789-00',
            nomeEmpresa: 'Empresa A',
            cnpj: '12.345.678/0001-99'
        },
        {
            idCliente: 2,
            nomeCliente: 'Cliente B',
            dataNascimento: '02/02/1992',
            cpf: '987.654.321-00',
            nomeEmpresa: 'Empresa B',
            cnpj: '98.765.432/0001-00'
        }
    ];

    function exibirTodasAsVendas() {
        tabelaCorpo.innerHTML = '';
        vendas.forEach(venda => {
            const linha = criarLinhaVenda(venda);
            tabelaCorpo.appendChild(linha);
        });
    }

    function criarLinhaVenda(venda) {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${venda.idCliente}</td>
            <td>${venda.nomeCliente}</td>
            <td>${venda.dataNascimento}</td>
            <td>${venda.cpf}</td>
            <td>${venda.nomeEmpresa}</td>
            <td>${venda.cnpj}</td>
            <td><button class="btn-delete"><i class="fas fa-trash-alt"></i> Excluir</button></td>
        `;

        linha.querySelector('.btn-delete').addEventListener('click', function() {
            linha.remove();
        });

        return linha;
    }

    function atualizarTabelaPorPesquisa(termoPesquisado) {
        tabelaCorpo.innerHTML = '';
        const resultados = vendas.filter(venda => venda.idCliente.toString() === termoPesquisado);

        resultados.forEach(venda => {
            const linha = criarLinhaVenda(venda);
            tabelaCorpo.appendChild(linha);
        });
    }

    btnPesquisar.addEventListener('click', function() {
        const termoPesquisado = inputPesquisa.value.trim();
        if (termoPesquisado === '') {
            exibirTodasAsVendas();
        } else {
            atualizarTabelaPorPesquisa(termoPesquisado);
        }
    });

    btnGerarCSV.addEventListener('click', function() {
        gerarCSV();
    });

    btnGerarPDF.addEventListener('click', function() {
        gerarPDF();
    });

    function gerarCSV() {
        let csv = 'Id do cliente;Nome do cliente;Data de nascimento;CPF;Nome da empresa;CNPJ\n';
        
        vendas.forEach(venda => {
            let linhaCSV = [
                `"${venda.idCliente}"`,
                `"${venda.nomeCliente}"`,
                `"${venda.dataNascimento}"`,
                `"${venda.cpf}"`,
                `"${venda.nomeEmpresa}"`,
                `"${venda.cnpj}"`
            ].join(';');
            
            csv += linhaCSV + '\n';
        });
        
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'relatorio.csv');
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    

    function gerarPDF() {
        const doc = new jsPDF();
    
        doc.setFontSize(16);
        doc.text('Relatório de Clientes', 80, 10); // Título do documento
    
        let yPos = 30; // Começa um pouco mais abaixo para caber o título
        const headers = ['Id do cliente', 'Nome do cliente', 'Data de nascimento', 'CPF', 'Nome da empresa', 'CNPJ'];
    
        doc.setFontSize(12); // Tamanho de fonte para cabeçalhos
    
        // Posição x para cada cabeçalho (para alinhar corretamente)
        const positions = [4, 30, 65, 105, 135, 175];
    
        headers.forEach((header, index) => {
            doc.text(header, positions[index], yPos);
        });
    
        yPos += 10;
    
        doc.setFontSize(10); // Tamanho de fonte para o conteúdo
    
        vendas.forEach(venda => {
            doc.text(venda.idCliente.toString(), 4, yPos);
            doc.text(venda.nomeCliente, 30, yPos);
            doc.text(venda.dataNascimento, 65, yPos);
            doc.text(venda.cpf, 105, yPos);
            doc.text(venda.nomeEmpresa, 135, yPos);
            doc.text(venda.cnpj, 175, yPos);
            yPos += 10;
        });
    
        doc.save('relatorio_clientes.pdf');
    }
    

    exibirTodasAsVendas();
});

document.getElementById('voltar').addEventListener('click', function() {
    window.history.back();
});
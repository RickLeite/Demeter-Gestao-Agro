document.addEventListener('DOMContentLoaded', function() {

    // Dados fictícios
    const data = [
        {
            produtosMaisVendidos: "Produto A",
            produtosMenosVendidos: "Produto Z",
            lucrosEGastosPorAno: "$5000 / $4000",
            lucrosEGastosDiarios: "$200 / $150"
        },
        {
            produtosMaisVendidos: "Produto B",
            produtosMenosVendidos: "Produto Y",
            lucrosEGastosPorAno: "$4000 / $3000",
            lucrosEGastosDiarios: "$180 / $130"
        }
    ];

    // Função para popular a tabela com os dados
    function populateTable() {
        const tbody = document.querySelector('tbody');

        data.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.produtosMaisVendidos}</td>
                <td>${item.produtosMenosVendidos}</td>
                <td>${item.lucrosEGastosPorAno}</td>
                <td>${item.lucrosEGastosDiarios}</td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Função de pesquisa
    document.getElementById('btnPesquisarLucrosGastos').addEventListener('click', function() {
        const searchTerm = document.querySelector('input[type="text"]').value.toLowerCase();
        const rows = document.querySelectorAll('tbody tr');
        
        rows.forEach(row => {
            const tdArray = Array.from(row.getElementsByTagName('td'));
            let found = false;
            tdArray.forEach(td => {
                if (td.textContent.toLowerCase().includes(searchTerm)) {
                    found = true;
                }
            });
            
            // Se encontrou, mostra a linha, caso contrário, oculta
            if (found) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });

    // Função para exportar como CSV
    function exportToCSV() {
        const csvRows = [];
        const headers = ['Produtos mais vendidos', 'Produtos menos vendidos', 'Lista de lucros e gastos / anos', 'Lista de lucros e gastos / diarios'];
        csvRows.push(headers.join(';'));

        data.forEach(item => {
            csvRows.push([item.produtosMaisVendidos, item.produtosMenosVendidos, item.lucrosEGastosPorAno, item.lucrosEGastosDiarios].join(';'));
        });

        const csvString = csvRows.join('\r\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'report.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // Função para exportar como PDF
    function exportToPDF() {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Relatório de Lucros e Gastos', 60, 10); // Título do documento

        let yPos = 30; // Começa um pouco mais abaixo para caber o título
        const headers = ['Produtos mais vendidos', 'Produtos menos vendidos', 'Lucros e Gastos por Ano', 'Lucros e Gastos Diários'];

        doc.setFontSize(12); // Tamanho de fonte para cabeçalhos

        // Posição x para cada cabeçalho (para alinhar corretamente)
        const positions = [5, 55, 110, 160];

        headers.forEach((header, index) => {
            doc.text(header, positions[index], yPos);
        });

        yPos += 10;

        doc.setFontSize(10); // Tamanho de fonte para o conteúdo

        data.forEach(item => {
            doc.text(item.produtosMaisVendidos, positions[0], yPos);
            doc.text(item.produtosMenosVendidos, positions[1], yPos);
            doc.text(item.lucrosEGastosPorAno, positions[2], yPos);
            doc.text(item.lucrosEGastosDiarios, positions[3], yPos);
            yPos += 10;
        });

        doc.save('relatorio_lucros_gastos.pdf');
    }
    
    document.querySelector('#gerarRelatorios button:nth-child(1)').addEventListener('click', exportToCSV);
    document.querySelector('#gerarRelatorios button:nth-child(2)').addEventListener('click', exportToPDF);

    // Adiciona a funcionalidade ao botão de voltar
    document.getElementById('voltar').addEventListener('click', function() {
        window.history.back();
    });

    // Inicialmente popular a tabela com os dados
    populateTable();

});
document.addEventListener('DOMContentLoaded', function() {
    const tabelaCorpo = document.querySelector('tbody');
    const btnPesquisar = document.querySelector('#btnPesquisar');
    const inputPesquisa = document.querySelector('#inputPesquisa');
    const btnGerarPDF = document.querySelector('#btnGerarPDF');
    const btnGerarExcel = document.querySelector('#btnGerarExcel');

    if (!tabelaCorpo || !btnPesquisar || !inputPesquisa || !btnGerarPDF || !btnGerarExcel) {
        console.error('Um ou mais elementos necessários não foram encontrados no DOM.');
        return;
    }

    btnPesquisar.addEventListener('click', function() {
        buscarClientesPorNome(inputPesquisa.value);
    });

    function buscarClientesPorNome(nome) {
        fetch(`/clientes/pesquisa?nome=${nome}`)
            .then(response => response.json())
            .then(dadosClientes => {
                tabelaCorpo.innerHTML = '';
                dadosClientes.forEach(cliente => {
                    const linha = criarLinhaCliente(cliente);
                    tabelaCorpo.appendChild(linha);
                });
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    }

    function buscarClientes() {
        fetch('/clientes/lista')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro HTTP, status ${response.status}`);
                }
                return response.json();
            })
            .then(dadosClientes => {
                if (!Array.isArray(dadosClientes)) {
                    throw new Error('A resposta do servidor não é um array');
                }
                tabelaCorpo.innerHTML = '';
                dadosClientes.forEach(cliente => {
                    const linha = criarLinhaCliente(cliente);
                    tabelaCorpo.appendChild(linha);
                });
            })
            .catch(error => console.error('Erro ao buscar dados:', error));
    }

    function criarLinhaCliente(cliente) {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${cliente.id || ''}</td>
            <td>${cliente.nome || ''}</td>
            <td>${cliente.dataNascimento || ''}</td>
            <td>${cliente.cpf || ''}</td>
            <td>${cliente.nomeEmpresa || ''}</td>
            <td>${cliente.cnpj || ''}</td>
            <td><button class="btn-delete" data-id="${cliente.id}">Excluir</button></td>
        `;

        const btnDelete = linha.querySelector('.btn-delete');
        btnDelete.addEventListener('click', function() {
            if (confirm('Tem certeza que deseja excluir este cliente?')) {
                fetch(`/clientes/${cliente.id}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (response.ok) {
                        console.log('Cliente excluído com sucesso');
                        linha.remove();
                    } else {
                        console.error('Falha ao excluir cliente');
                    }
                })
                .catch(error => console.error('Erro ao excluir cliente:', error));
            }
        });

        return linha;
    }

    buscarClientes(); // Chama a função para buscar e exibir os clientes

    btnGerarPDF.addEventListener('click', function() {
        const doc = new jsPDF();
    
        // Criando um array com os cabeçalhos das colunas exceto 'Ação'
        let headers = Array.from(document.querySelectorAll("#tabelaClientes thead tr th"))
                           .map(th => th.textContent)
                           .slice(0, -1); // Exclui o último cabeçalho 'Ação'
    
        // Criando um array com os dados das linhas
        let data = Array.from(document.querySelectorAll("#tabelaClientes tbody tr")).map(tr => {
            return Array.from(tr.querySelectorAll("td"))
                        .slice(0, -1) // Exclui a última coluna (Ação) de cada linha
                        .map(td => td.textContent);
        });
    
        // Usando autoTable para gerar o PDF
        doc.autoTable({
            head: [headers],
            body: data
        });
    
        doc.save('lista-clientes.pdf');
    });
    

    btnGerarExcel.addEventListener('click', function() {
        let csvContent = "data:text/csv;charset=utf-8,";
        const rows = document.querySelectorAll("#tabelaClientes tr");
        
        for (const row of rows) {
            let rowData = Array.from(row.querySelectorAll("th, td"), (cell, index) => {
                let text = cell.textContent.replace(/,/g, ";");
    
                // Verifica se é uma célula de dados e se é a coluna do CNPJ
                if (cell.tagName === 'TD' && index === 5) {
                    // Formata o CNPJ com aspas para forçar o Excel a interpretar como texto
                    text = `="${text}"`;
                }
    
                return text;
            });
    
            // Remove a última célula se for uma linha de dados (coluna Ação)
            // E também não inclui o cabeçalho da última coluna
            if (row.querySelector("td")) {
                rowData = rowData.slice(0, -1); // Remove a última célula (coluna Ação) das linhas de dados
            } else {
                // Se for a linha do cabeçalho, remove a coluna "Ação"
                rowData = rowData.slice(0, -1); // Remove o último cabeçalho "Ação"
            }
    
            csvContent += rowData.join(";") + "\r\n";
        }
    
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "lista-clientes.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    

});
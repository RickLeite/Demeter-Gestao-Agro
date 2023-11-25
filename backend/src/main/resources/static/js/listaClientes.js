document.addEventListener('DOMContentLoaded', function() {
    const tabelaCorpo = document.querySelector('tbody');
    const btnGerarPDF = document.querySelector('#btnGerarPDF');
    const btnGerarExcel = document.querySelector('#btnGerarExcel');

    if (!tabelaCorpo || !btnGerarPDF || !btnGerarExcel) {
        console.error('Um ou mais elementos necessários não foram encontrados no DOM.');
        return;
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
});
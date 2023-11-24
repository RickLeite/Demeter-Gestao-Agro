document.addEventListener('DOMContentLoaded', function() {
    const tabelaCorpo = document.querySelector('tbody');
    const btnGerarCSV = document.querySelector('#gerarCSV');
    const btnGerarPDF = document.querySelector('#gerarPDF');

    if (!tabelaCorpo || !btnGerarCSV || !btnGerarPDF) {
        console.error('Um ou mais elementos necessários não foram encontrados no DOM.');
        return;
    }

    function buscarClientes() {
        fetch('/clientes/lista') // Atualize para o novo endpoint
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
            <td><button class="btn-delete">Excluir</button></td>
        `;
        // Adicione aqui a lógica para excluir um cliente
        return linha;
    }

    buscarClientes(); // Chama a função para buscar e exibir os clientes
});

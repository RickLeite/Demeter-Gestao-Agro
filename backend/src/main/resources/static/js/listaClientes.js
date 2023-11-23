document.addEventListener('DOMContentLoaded', function() {
    const tabelaCorpo = document.querySelector('tbody');
    const inputPesquisa = document.querySelector('input[type="text"]');
    const btnPesquisar = document.querySelector('#btnSearch');
    const btnGerarCSV = document.querySelector('#gerarCSV');
    const btnGerarPDF = document.querySelector('#gerarPDF');

    if (!tabelaCorpo || !inputPesquisa || !btnPesquisar || !btnGerarCSV || !btnGerarPDF) {
        console.error('Um ou mais elementos necessários não foram encontrados no DOM.');
        return;
    }

    function buscarClientes() {
        fetch('http://127.0.0.1:3000/cadastroCliente/all') // Substitua pela URL correta do seu servidor
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
            <td>${cliente.idCliente}</td>
            <td>${cliente.nomeCliente}</td>
            <td>${cliente.dataNascimento}</td>
            <td>${cliente.cpf}</td>
            <td>${cliente.nomeEmpresa}</td>
            <td>${cliente.cnpj}</td>
            <td><button class="btn-delete">Excluir</button></td>
        `;
        linha.querySelector('.btn-delete').addEventListener('click', function() {
            alert('Excluir cliente não implementado.');
        });
        return linha;
    }

    btnPesquisar.addEventListener('click', function() {
        const termoPesquisado = inputPesquisa.value.trim();
        atualizarTabelaPorPesquisa(termoPesquisado);
    });

    function atualizarTabelaPorPesquisa(termoPesquisado) {
        fetch(`http://127.0.0.1:3000/cadastroCliente/search?term=${encodeURIComponent(termoPesquisado)}`)
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
            .catch(error => console.error('Erro ao buscar dados por termo de pesquisa:', error));
    }

    btnGerarCSV.addEventListener('click', function() {
        alert('Geração de CSV não implementada.');
    });

    btnGerarPDF.addEventListener('click', function() {
        alert('Geração de PDF não implementada.');
    });

    buscarClientes();

    document.getElementById('form-cliente').addEventListener('submit', aoSubmeterFormulario);

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove tudo o que não é dígito
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; // Verifica se tem 11 dígitos e não são todos iguais

    let soma = 0;
    let resto;

    // Calcula o primeiro dígito verificador
    for (let i = 1; i <= 9; i++) 
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    // Calcula o segundo dígito verificador
    for (let i = 1; i <= 10; i++) 
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
}

function aoSubmeterFormulario(event) {
    const cpf = document.getElementById('cpf-cliente').value;
    if (!validarCPF(cpf)) {
        alert('CPF inválido!');
        event.preventDefault(); // Impede o envio do formulário
        return false;
    }

    alert('CPF válido!');
    // Aqui você pode deixar o formulário ser enviado ou processar a submissão via AJAX
    // Se for enviar via AJAX, não esqueça de usar event.preventDefault();
}

});

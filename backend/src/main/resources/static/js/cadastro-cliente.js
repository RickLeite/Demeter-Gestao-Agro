document.addEventListener('DOMContentLoaded', function() {
    const formCadastro = document.getElementById('form-cliente');
    const nomeClienteInput = document.getElementById('nome-cliente');

    nomeClienteInput.addEventListener('input', function() {
        this.value = this.value.replace(/\d+/g, '');
    });

    formCadastro.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = nomeClienteInput.value;
        const dataNascimento = document.getElementById('data-nascimento').value;
        const cpf = document.getElementById('cpf-cliente').value;
        const nomeEmpresa = document.getElementById('nome-empresa').value;
        const cnpj = document.getElementById('cnpj-empresa').value;

        if (!validarCNPJ(cnpj)) {
            alert('CNPJ inválido!');
            return;
        }

        if (!validarCPF(cpf)) {
            alert('CPF inválido!');
            return;
        }

        const cadastroCliente = {
            nome,
            dataNascimento,
            cpf,
            nomeEmpresa,
            cnpj
        };

        enviarCadastroParaServidor(cadastroCliente)
            .then(data => {
                alert('Cliente cadastrado com sucesso!');
                formCadastro.reset();
            })
            .catch(error => {
                alert('Erro ao cadastrar o cliente: ' + error.message);
            });
    });
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
    
        if (cpf === '' || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    
        let soma = 0;
        let resto;
    
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
    
        resto = (soma * 10) % 11;
    
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;
    
        soma = 0;
    
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
    
        resto = (soma * 10) % 11;
    
        if ((resto === 10) || (resto === 11)) resto = 0;
        return resto === parseInt(cpf.substring(10, 11));
    }
    
    function validarCNPJ(cnpj) {
        cnpj = cnpj.replace(/[^\d]+/g, '');
    
        if (cnpj === '') return false;
        if (cnpj.length !== 14) return false;
    
        // Elimina CNPJs com todos os dígitos iguais
        if (/^(\d)\1+$/.test(cnpj)) return false;
    
        let tamanho = cnpj.length - 2;
        let numeros = cnpj.substring(0, tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;
    
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
    
        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0)) return false;
    
        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (let i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2) pos = 9;
        }
    
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        return resultado == digitos.charAt(1);
    }
    
    function enviarCadastroParaServidor(cadastroCliente) {
        return fetch('http://localhost:3000/cadastroCliente/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cadastroCliente)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text || 'HTTP response not OK') });
            }
            return response.json();
        });
    }

    document.getElementById('voltar').addEventListener('click', function() {
        window.history.back();
    });
});
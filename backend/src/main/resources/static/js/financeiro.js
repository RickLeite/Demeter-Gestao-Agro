document.addEventListener('DOMContentLoaded', function() {
    const formDespesa = document.getElementById("form-despesa");
    let pago = false; // Estado inicial para 'pago'

    // Adicionando listeners para os botões de pagamento
    document.getElementById('btn-nao-pago').addEventListener('click', function() {
        pago = false;
    });

    document.getElementById('btn-pago').addEventListener('click', function() {
        pago = true;
    });

    formDespesa.addEventListener('submit', function(e) {
        e.preventDefault();

        // Criação de um FormData para incluir arquivos
        const formData = new FormData();
        formData.append('dataDespesa', document.getElementById('data-despesa').value);
        formData.append('valorDespesa', parseFloat(document.getElementById('valor-despesa').value));
        formData.append('descricaoDespesa', document.getElementById('descricao-despesa').value);
        formData.append('pago', pago); // O estado de 'pago' já está definido pelos botões

        // Anexar o arquivo, se selecionado
        const anexoInput = document.getElementById('anexo-despesa');
        if (anexoInput.files.length > 0) {
            formData.append('anexoDespesa', anexoInput.files[0]);
        }

        fetch('/api/despesas/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Algo deu errado ao enviar os dados da despesa');
            }
        })
        .then(data => {
            console.log('Despesa adicionada:', data);
        })
        .catch((error) => {
            console.error('Erro:', error);
        });
    });

    // Listener para o botão 'voltar'
    document.getElementById('voltar').addEventListener('click', function() {
        window.history.back();
    });
});
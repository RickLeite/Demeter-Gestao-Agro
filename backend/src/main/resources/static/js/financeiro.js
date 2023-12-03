document.addEventListener('DOMContentLoaded', function() {
    const formDespesa = document.getElementById("form-despesa");
    let pago = false;

    document.getElementById('btn-nao-pago').addEventListener('click', function() {
        pago = false;
    });

    document.getElementById('btn-pago').addEventListener('click', function() {
        pago = true;
    });

    formDespesa.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append('dataDespesa', document.getElementById('data-despesa').value);
        formData.append('valorDespesa', parseFloat(document.getElementById('valor-despesa').value));
        formData.append('descricaoDespesa', document.getElementById('descricao-despesa').value);
        formData.append('pago', pago);

        const anexoInput = document.getElementById('anexo-despesa');
        if (anexoInput.files.length > 0) {
            formData.append('anexoDespesa', anexoInput.files[0]);
            formData.append('nomeDoArquivo', anexoInput.files[0].name); // Adicione o nome do arquivo ao FormData
        }

        console.log('Dados do formulário:', formData);

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
            resetForm(); // Chama a função para limpar o formulário
        })
        .catch((error) => {
            console.error('Erro:', error);
        });
    });

    document.getElementById('voltar').addEventListener('click', function() {
        window.history.back();
    });

    function resetForm() {
        // Reseta os campos do formulário
        formDespesa.reset();
        // Aqui você pode adicionar qualquer lógica adicional de limpeza, se necessário.
        // Por exemplo, se você tiver algum componente de UI que precisa ser reiniciado manualmente, faça isso aqui.
    }
});

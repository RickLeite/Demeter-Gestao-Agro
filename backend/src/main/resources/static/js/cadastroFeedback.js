function salvarAvaliacao() {
    var avaliacao = document.getElementById('avaliacao').value;
    const voltarButton = document.getElementById("voltar");

    if (avaliacao.trim() !== '') {
        var feedback = {
            comentario: avaliacao,
            nome: "Nome do Cliente",
            dataCadastro: new Date().toISOString().split('T')[0]
        };

        // Faça uma requisição AJAX para enviar o feedback ao servidor
        fetch('/salvar-feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedback)
        }).then(response => {
            if (response.ok) {
                alert('Avaliação enviada com sucesso! Obrigado pelo seu feedback.'); // Exiba a mensagem de sucesso
                document.getElementById('avaliacao').value = '';
            } else {
                throw new Error('Erro ao salvar avaliação.');
            }
        }).catch(error => console.error('Erro ao salvar avaliação:', error));
    } else {
        alert('Por favor, digite uma avaliação antes de enviar.');
    }
}

document.getElementById('btn-voltar').addEventListener('click', function () {
    window.history.back();
});

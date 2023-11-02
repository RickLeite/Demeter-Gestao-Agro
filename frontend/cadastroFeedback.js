function salvarAvaliacao() {
    var avaliacao = document.getElementById('avaliacao').value;
    if (avaliacao.trim() !== '') {
        localStorage.setItem('comentarioAvaliacao', avaliacao);
        alert('Avaliação salva com sucesso!');
        document.getElementById('avaliacao').value = '';
    } else {
        alert('Por favor, digite uma avaliação antes de enviar.');
    }
}

document.getElementById('btn-voltar').addEventListener('click', function() {
    window.history.back();
});

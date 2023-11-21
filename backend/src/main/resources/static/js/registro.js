// Validação do formulário de registro
const registroForm = document.querySelector('#registro form');

registroForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const nome = document.querySelector('#nome').value;
    const email = document.querySelector('#email').value;
    const senha = document.querySelector('#senha').value;

    if (nome.trim() === '' || email.trim() === '' || senha.trim() === '') {
        alert('Todos os campos devem ser preenchidos.');
    } else if (!isValidEmail(email)) {
        alert('Por favor, insira um endereço de e-mail válido.');
    } else {

        alert('Cadastro bem-sucedido!');
        window.location.href="login"
    }
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
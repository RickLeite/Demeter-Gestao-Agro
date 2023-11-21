document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('form-login');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'admin' && password === '123') {
            alert('Login bem-sucedido!');
            window.location.href = 'perfil';

        } else {
            alert('Usuário ou senha inválidos.');
        }
    });
});


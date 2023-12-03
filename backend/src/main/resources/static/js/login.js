document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('form-login');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('/registro/autenticar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: username, senha: password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Aqui você armazena o nome e o e-mail no localStorage antes de redirecionar
                localStorage.setItem('nomeUsuario', data.nome);
                localStorage.setItem('emailUsuario', data.email);

                // Redireciona para a URL definida pelo backend
                window.location.href = data.redirect;
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Erro ao autenticar:', error);
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('form-login');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Enviar as credenciais para o backend (por enquanto, apenas exibe um alert)
        alert(`Usuário: ${username}, Senha: ${password}`);
    });
});

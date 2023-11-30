let stompClient;

document.addEventListener('DOMContentLoaded', function () {
    // Your existing connection code
    const socket = new SockJS('http://localhost:3000/websocket');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
        console.log('WebSocket Client Connected');

        stompClient.subscribe('/topic/receive', (response) => {
            try {
                const jsonResponse = JSON.parse(response.body);
                const serverResponse = jsonResponse.response;
                const messageContent = jsonResponse.message.content;

                console.log(`Server Response: ${serverResponse}`);
                console.log(`Message Content: ${messageContent}`);

                // Display the message content
                displayMessage(` ${serverResponse}`);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                // Handle non-JSON response here
            }
        });

    });

    // Add event listener for the send message button
    const sendBtn = document.getElementById('sendMessageBtn');
    if (sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
    }

    // Add event listeners for the chatbot buttons
    const openBtn = document.getElementById('open-chatbot-btn');
    const closeBtn = document.getElementById('close-chatbot-btn');

    if (openBtn) {
        openBtn.addEventListener('click', openChat);
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', closeChat);
    }

    exibirComentarios();
});



// Add this function to your script.js file

function displayMessage(message) {
    const messagesDiv = document.querySelector('.messages');
    const newMessage = document.createElement('p');
    newMessage.innerText = message;
    messagesDiv.appendChild(newMessage);
}


function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value;

    if (message.trim() !== '') {
        stompClient.send("/app/hello", {}, JSON.stringify({ content: message }));
        console.log(`User typed: ${message}`);
    }
}

function openChat() {
    document.getElementById('chatbot-container').style.display = 'block';
    const messagesDiv = document.querySelector('.messages');

    // Check if the initial message already exists
    if (!messagesDiv.querySelector('.bot-message')) {
        messagesDiv.innerHTML = `<p class="bot-message">Olá! Escolha um tema de dúvida:</p>`;
        resetOptions();
    }
}

function closeChat() {
    const messagesDiv = document.querySelector('.messages');
    const optionsDiv = document.querySelector('.options');

    messagesDiv.innerHTML = '';
    optionsDiv.innerHTML = '';
    document.getElementById('chatbot-container').style.display = 'none';
}

// Other functions remain the same...

const comentarios = [
    { nome: 'Nome do Usuário', texto: 'Este é um comentário de exemplo. A plataforma é excelente!' },
    { nome: 'Outro Usuário', texto: 'Estou muito satisfeito com os produtos oferecidos!' }
];

function exibirComentarios() {
    const areaComentarios = document.getElementById('area-comentarios');

    comentarios.forEach(comentario => {
        const divComentario = document.createElement('div');
        divComentario.className = 'comentario-item';

        const h3Nome = document.createElement('h3');
        h3Nome.innerText = 'Nome: ' + comentario.nome;

        const pTexto = document.createElement('p');
        pTexto.innerText = comentario.texto;

        divComentario.appendChild(h3Nome);
        divComentario.appendChild(pTexto);
        areaComentarios.appendChild(divComentario);
    });
}

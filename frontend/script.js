function openChat() {
    document.getElementById('chatbot-container').style.display = 'block';
    const messagesDiv = document.querySelector('.messages');

    // Verifique se a mensagem inicial já existe
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

function selectTheme(option) {
    const messagesDiv = document.querySelector('.messages');
    const optionsDiv = document.querySelector('.options');
    let themeMessage = '';

    optionsDiv.innerHTML = '';

    switch (option) {
        case 1:
            themeMessage = 'Você escolheu o tema "A". Selecione sua pergunta:';
            addButton(optionsDiv, 'Aa', answerQuestion);
            addButton(optionsDiv, 'Ab', answerQuestion);
            addButton(optionsDiv, 'Ac', answerQuestion);
            break;
        case 2:
            themeMessage = 'Você escolheu o tema "B". Selecione sua pergunta:';
            addButton(optionsDiv, 'Ba', answerQuestion);
            addButton(optionsDiv, 'Bb', answerQuestion);
            break;
        case 3:
            themeMessage = 'Você escolheu o tema "C". Selecione sua pergunta:';
            addButton(optionsDiv, 'Ca', answerQuestion);
            addButton(optionsDiv, 'Cb', answerQuestion);
            break;
    }

    messagesDiv.innerHTML += `<p class="bot-message">${themeMessage}</p>`;
    const backButton = document.createElement('button');
    backButton.innerText = 'Voltar';
    backButton.addEventListener('click', resetOptions);
    optionsDiv.appendChild(backButton);
}

function addButton(container, text, callback) {
    const button = document.createElement('button');
    button.innerText = text;
    button.addEventListener('click', function() {
        callback(text);
    });
    container.appendChild(button);
}

function answerQuestion(question) {
    const messagesDiv = document.querySelector('.messages');
    let botResponse = '';

    switch (question) {
        case 'Aa':
            botResponse = 'resposta1';
            break;
        case 'Ab':
            botResponse = 'resposta2';
            break;
        case 'Ac':
            botResponse = 'resposta3';
            break;
        case 'Ba':
            botResponse = 'resposta4';
            break;
        case 'Bb':
            botResponse = 'resposta5';
            break;
        case 'Ca':
            botResponse = 'resposta6';
            break;
        case 'Cb':
            botResponse = 'resposta7';
            break;
        default:
            botResponse = 'Desculpe, eu não entendo essa pergunta.';
    }

    // Adicione a mensagem do usuário
    const userMessageElement = document.createElement('p');
    userMessageElement.className = 'user-message';
    userMessageElement.innerText = question;
    messagesDiv.appendChild(userMessageElement);

    // Adicione a resposta do bot
    const botMessageElement = document.createElement('p');
    botMessageElement.className = 'bot-message';
    botMessageElement.innerText = botResponse;
    messagesDiv.appendChild(botMessageElement);

    // Rolar para a última mensagem adicionada
    botMessageElement.scrollIntoView({ behavior: 'smooth' });
}



function resetOptions() {
    const optionsDiv = document.querySelector('.options');
    optionsDiv.innerHTML = '';
    addButton(optionsDiv, 'A', function() { selectTheme(1); });
    addButton(optionsDiv, 'B', function() { selectTheme(2); });
    addButton(optionsDiv, 'C', function() { selectTheme(3); });
}
const comentarios = [
    { nome: 'Nome do Usuário', texto: 'Este é um comentário de exemplo. A plataforma é excelente!' },
    { nome: 'Outro Usuário', texto: 'Estou muito satisfeito com os produtos oferecidos!' }
];

// Função para exibir os comentários na página
// Função para exibir os comentários na página
function exibirComentarios() {
    const areaComentarios = document.getElementById('area-comentarios');

    comentarios.forEach(comentario => {
        const divComentario = document.createElement('div');
        divComentario.className = 'comentario-item';

        const h3Nome = document.createElement('h3');
        h3Nome.innerText = 'Nome: ' + comentario.nome; // Acrescentado "Nome: " antes do nome do usuário.

        const pTexto = document.createElement('p');
        pTexto.innerText = comentario.texto;

        divComentario.appendChild(h3Nome);
        divComentario.appendChild(pTexto);
        areaComentarios.appendChild(divComentario);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    // Adicionar ouvintes de evento aos botões "Abrir" e "Fechar" Chatbot
    const openBtn = document.getElementById('open-chatbot-btn');
    const closeBtn = document.getElementById('close-chatbot-btn');
    
    if(openBtn) {
        openBtn.addEventListener('click', openChat);
    }
    if(closeBtn) {
        closeBtn.addEventListener('click', closeChat);
    }

    exibirComentarios();
});

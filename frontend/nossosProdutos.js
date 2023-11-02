// JavaScript para destacar o item de navegação ativo
const links = document.querySelectorAll('nav a');

links.forEach(link => {
    link.addEventListener('click', () => {
        links.forEach(otherLink => {
            otherLink.classList.remove('active');
        });
        link.classList.add('active');
    });
});

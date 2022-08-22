const grid = document.querySelector('.grid');

const characters = [
    'chikorita',
    'espeon',
    'evee',
    'pikachu',
    'umbreon',
    'vaporion',
    
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;

}

let primeira_carta = '';
let segunda_carta = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if(disabledCards.length == 12) {
        alert('Parabens, voce conseguiu !');
    }
}

const checkCards = () => {

    const primeiro_personagem = primeira_carta.getAttribute('data-character');
    const segundo_personagem = segunda_carta.getAttribute('data-character');

    if (primeiro_personagem == segundo_personagem)
    {

        primeira_carta.firstChild.classList.add('disabled-card');
        segunda_carta.firstChild.classList.add('disabled-card');
        primeira_carta = '';
        segunda_carta = '';
        
        checkEndGame();

    } 
    else {
        setTimeout(() => {

        primeira_carta.classList.remove('reveal-card');
        segunda_carta.classList.remove('reveal-card');
        primeira_carta = '';
        segunda_carta = '';
    }, 800)
    }

}

const revealCard = ({ target }) => {

    if(target.parentNode.className.includes('reveal-card')) {
        return;
    }
    if(primeira_carta == '')
    {
        target.parentNode.classList.add('reveal-card');
        primeira_carta = target.parentNode;
    } else if (segunda_carta == '')
    {
        target.parentNode.classList.add('reveal-card');
        segunda_carta = target.parentNode;

        checkCards();
    }
    
}

const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../imagens/front_card/${character}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);


    return card;
}

const loadGame = () => {

    const duplicateCharacters = [... characters , ... characters];

    const shuffledArray = duplicateCharacters.sort( () => Math.random() - 0.5);

    duplicateCharacters.forEach((character) => {

    const card = createCard(character);
    grid.appendChild(card);

    });
}
loadGame();
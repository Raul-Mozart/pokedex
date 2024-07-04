const maxRecords = 151
const limit = 10
let offset = 0;
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const form = document.getElementById('form')

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}" data-id="${pokemon.number}">

            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.img}" alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

function Timeout(){
    setTimeout(() => {
    
        let pokemon = document.querySelectorAll('.pokemon')
          
        // Adiciona um event listener de clique a cada card
        pokemon.forEach(function(card) {
            card.addEventListener('click', (event) =>{
                var dataId = event.currentTarget.getAttribute('data-id');
                function salvarNumeroAntesDeSair() {
                    localStorage.setItem('dataId', dataId);    
                }
                window.addEventListener('beforeunload', salvarNumeroAntesDeSair);
                window.location.href = 'file:///C:/Users/raul.bertoncini/Desktop/Nova%20pasta/pokedex/stats.html';
            });
        });
        
    
        /*
        +===========================+
        +                           +
        +       FILTRO/BUSCA        +
        +                           +
        +===========================+
        */
        let inputElement = document.querySelector("#ibusca");
        let listElement = document.querySelector("#pokemonList");
        let pokemonCards = listElement.querySelectorAll(".pokemon");

        inputElement.addEventListener("input", (e) => {
            let searchText = e.target.value.trim().toLowerCase();

            pokemonCards.forEach(card => {
                let nameElement = card.querySelector(".name");
                let nameText = nameElement.textContent.toLowerCase();
                let typeElements = card.querySelectorAll(".type");
                let typesText = Array.from(typeElements).map(type => type.textContent.toLowerCase()).join(' ');

                if (nameText.includes(searchText) || typesText.includes(searchText)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });

    },500)   
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
        Timeout()
    } else {
        loadPokemonItens(offset, limit)
        Timeout()
    }
})

Timeout()
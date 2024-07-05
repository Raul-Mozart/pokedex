const maxRecords = 500
const limit = 12
let offset = 0;
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const form = document.getElementById('form')
const search = document.getElementById("isearch");

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokedex__pokemon ${pokemon.type}" data-id="${pokemon.number}">

            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <div class="content__img">
                    <img src="${pokemon.img}" alt="${pokemon.name}">
                </div>
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

        let pokemon = document.querySelectorAll('.pokedex__pokemon')

              
        pokemon.forEach(function(card) {
            card.addEventListener('click', (event) =>{
                var dataId = event.currentTarget.getAttribute('data-id');
                function salvarNumeroAntesDeSair() {
                    localStorage.setItem('dataId', dataId);    
                }
                window.addEventListener('beforeunload', salvarNumeroAntesDeSair);
                window.location.href = 'https://raul-mozart.github.io/pokedex/stats.html';
            });
        });
        
    
        /*
        +===========================+
        +                           +
        +       FILTRO/BUSCA        +
        +                           +
        +===========================+
        */

        search.addEventListener("input", (e) => {
            let searchText = e.target.value.trim().toLowerCase();

            pokemon.forEach(card => {
                let nameElement = card.querySelector(".name");
                let nameText = nameElement.textContent.toLowerCase();
                let typeElements = card.querySelectorAll(".type");
                let typesText = Array.from(typeElements).map(type => type.textContent.toLowerCase()).join(' ');

                if (nameText.includes(searchText) || typesText.includes(searchText)) {
                    card.style.display = "flex";
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
    } else {
        loadPokemonItens(offset, limit)
    }
    Timeout()
})

Timeout()
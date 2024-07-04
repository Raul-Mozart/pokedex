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

loadPokemonItens(offset, limit)

function Timeout(){
    setTimeout(() => {
    
        let pokemon = document.querySelectorAll('.pokemon')
          
        // Adiciona um event listener de clique a cada card
        pokemon.forEach(function(card) {
            card.addEventListener('click', (event) =>{
                var dataId = event.currentTarget.getAttribute('data-id');
                loadPokemonStat(dataId,limitDetail)
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

/*
+===========================+
+                           +
+           STATS           +
+                           +
+===========================+
*/
const limitDetail = 1
const statsContent = document.getElementById('statsContent')

function convertStatsPokemonToLi(pokemon){
    return`
        <div>
            <a href="./index.html">
                <-
            </a>
        </div>
        <li>
            <div>
                <div>
                    <img src="${pokemon.img}" alt="${pokemon.name}"
                </div>
                <div>
                    <ul>
                        ${pokemon.stats.map((stat) => `<li class="${stat}">${stat} <span>${pokemon.statNum}</span></li>`).join('')}
                    </ul>
                </div>
            </div>
        </li>
    `
}

function loadPokemonStat(offset,limit){
    pokeApi.getPokemons(offset - 1,limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertStatsPokemonToLi).join('')
        pokemonList.innerHTML = newHtml
        form.style.display = 'none';
        loadMoreButton.style.display = 'none';
    })
}



Timeout()
const maxRecords = 151
const limit = 10
let offset = 0;
let pokemonId = 1;
const teste1 = document.querySelectorAll('.teste')
const pokemonList = document.getElementById('pokemonList')
const statsContent = document.getElementById('statsContent')
let teste = 0;


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <a href="stats.html" class="teste" data-id="${pokemon.number}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.img}" alt="${pokemon.name}">
                </div>
            </a>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

teste1.forEach((pokemon) =>{
    pokemon.addEventListener('click', () => {
        console.log('dataId:', dataId)
        teste = parseInt(dataId)
        console.log('dataId:', teste)
        localStorage.setItem('teste', teste);
    })
})

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
})
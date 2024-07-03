const maxRecords = 151
const limit = 1
let offset = 0;
let pokemonId = 1;
const pokemon = document.querySelectorAll('.pokemon')
const pokemonList = document.getElementById('pokemonList')
const statsContent = document.getElementById('statsContent')
let teste = localStorage.getItem('teste');

function convertStatsPokemonToLi(pokemon){
    return`
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

function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertStatsPokemonToLi).join('')
        statsContent.innerHTML += newHtml
    })
}

loadPokemonItens(teste,limit)
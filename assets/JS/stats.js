var numeroRecuperado = localStorage.getItem('dataId'); 

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
        const newHtml = convertStatsPokemonToLi(pokemons[0])
        statsContent.innerHTML = newHtml
    })
}

loadPokemonStat(numeroRecuperado,limitDetail)
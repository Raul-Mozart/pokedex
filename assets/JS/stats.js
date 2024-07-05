let dataId = localStorage.getItem('dataId'); 
const limitDetail = 1
const statsContent = document.querySelector('body')

function convertStatsPokemonToLi(pokemon){
    return`
        <main class="stats__container ${pokemon.type}">
            <section class="stats__content">
                <div class="stats__head">
                    <a href="https://raul-mozart.github.io/pokedex/" class="stats__exit">
                        <img src="https://i.imgur.com/D7zuhcw.png" alt="Sair">
                    </a>
                    <span class="stats__number">#${pokemon.number}</span>
                </div>
                <div class="stats__info">
                    <h1 class="stats__title">
                        ${pokemon.name}
                    </h1>
                    <div class="stats__img">
                        <img src="${pokemon.img}" alt="${pokemon.name}">
                    </div>
                    <ul class="stats__list">
                        ${Object.keys(pokemon.stats).map((stat) => `<li class="stats__item ${stat}">${stat} <span>${pokemon.stats[stat]}</span></li>`).join('')}
                    </ul>
                </div>
            </section>
        </main>
    `
}

function loadPokemonStat(offset,limit){
    pokeApi.getPokemons(offset - 1,limit).then((pokemons = []) => {
        const newHtml = convertStatsPokemonToLi(pokemons[0])
        statsContent.innerHTML = newHtml
    })
}

loadPokemonStat(dataId,limitDetail)
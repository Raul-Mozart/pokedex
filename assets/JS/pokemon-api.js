const pokeApi = {}

function convertPokemonApiToNewPokemon(pokemonDetail){
    const pokemon = new Pokemon

    pokemon.number = pokemonDetail.id
    pokemon.name = pokemonDetail.name
    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    const stats = {};
    pokemonDetail.stats.forEach((statSlot) => {
        stats[statSlot.stat.name] = statSlot.base_stat;
    });
    pokemon.stats = stats;
    pokemon.img = pokemonDetail.sprites.other.dream_world.front_default 

    return pokemon
}

pokeApi.getPokemonsDetail = (pokemon) => {
    return fetch(pokemon.url)
           .then((response) => response.json())
           .then(convertPokemonApiToNewPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json()) 
        .then((jsonBody) => jsonBody.results) 
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonDetail) => pokemonDetail)
        .catch((error) => console.error(error))
        .finally(() => console.log("Requisição Finalizada!"))
}
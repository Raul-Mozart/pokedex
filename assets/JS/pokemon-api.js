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
           .then((response) => response.json()) //está pegando as requisições dos detalhes do pokemon na url dele e transformando em json
           .then(convertPokemonApiToNewPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json()) //then:Caso de certo a requisição,transforma o body da requisição em um arquivo json
        .then((jsonBody) => jsonBody.results) //Após o uso do primeiro then, ele está pegando o return do then anterior automaticamente
        .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetail)) //irá agrupar todas as requisições das descrições de pokemons
        .then((detailRequest) => Promise.all(detailRequest)) //iremos esperar que todas as requisições terminem
        .then((pokemonDetail) => pokemonDetail) //irá mostrar a lista dos detalhes de pokemons
        .catch((error) => console.error(error)) //Caso de errado a requisição
        .finally(() => console.log("Requisição Finalizada!"))//funciona independente se deu certo ou errado a requisição
}
const URL = "https://pokeapi.co/api/v2/pokemon";

(async function get_pokemon() {
    const pokemonNameParam = window.location.search.split('=')[1];
    console.log(pokemonNameParam);

    try {
    const response = await fetch(`${URL}/${pokemonNameParam}`);
    const data = await response.json(); // sin .data

    document.querySelector(".pokemon-name").innerHTML = data.name;
    document.querySelector(".pokemon-image").setAttribute("src", data.sprites.other["official-artwork"].front_default);
    document.querySelector(".pokemon-types").innerHTML = data.types.map(t => `<span>Tipo: ${t.type.name}</span>`).join(' / ');
    document.querySelector("#moves-container").innerHTML = data.moves.map(t =>
            `<p class="move_pokemon">${t.move.name}</p>`
        ).join('');

    } catch(e) {
    console.log(e);
    }
})();
const URL = "https://pokeapi.co/api/v2/pokemon";

(async function get_pokemon() {
    const pokemonNameParam = window.location.search.split('=')[1];
    console.log(pokemonNameParam);

    try {
    const response = await fetch(`${URL}/${pokemonNameParam}`);
    const data = await response.json(); // sin .data
    console.log(data)

    document.querySelector(".pokemon-name").innerHTML = data.name;
    document.querySelector(".pokemon-image").setAttribute("src", data.sprites.other["official-artwork"].front_default);
    let type_pokemon = document.querySelector(".pokemon-types").innerHTML = data.types[0].type.name;
    document.querySelector("#moves-container").innerHTML = data.moves.map(t =>
            `<p class="move_pokemon">${t.move.name}</p>`
        ).join('');

        console.log(type_pokemon)

        switch (type_pokemon) {
            case ("grass"):
                document.querySelector(".pokemon-info").style.backgroundColor = "#78C850";
                document.querySelectorAll(".move_pokemon").style.backgroundColor = "#4E9030";
                break;
            
            case ("fire"):
                document.querySelector(".pokemon-info").style.backgroundColor = "#F08030";
                document.querySelectorAll(".move_pokemon").style.backgroundColor = "#C25E10";

                break;

            case ("water"):
                document.querySelector(".pokemon-info").style.backgroundColor = "#6890F0";
                document.querySelectorAll(".move_pokemon").style.backgroundColor = "#3F63C9";
                break;

            case ("electric"):
                document.querySelector(".pokemon-info").style.backgroundColor = "#F8D030";
                document.querySelectorAll(".move_pokemon").style.backgroundColor = "#C9A80A";
                break;

            case ("bug"):
                document.querySelector(".pokemon-info").style.backgroundColor = "#A8B820"
                document.querySelectorAll(".move_pokemon").style.backgroundColor = "#7D8A10";
                break;

            case ("normal"):
                document.querySelector(".pokemon-info").style.backgroundColor = "#A8A878"
                document.querySelectorAll(".move_pokemon").style.backgroundColor = "#7D7D52";
                break;

            case ("poison"):
                document.querySelector(".pokemon-info").style.backgroundColor = "#A040A0"
                document.querySelectorAll(".move_pokemon").style.backgroundColor = "#752875";
                break;
        }

    } catch(e) {
    console.log(e);
    }
})();
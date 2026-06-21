const URL = "https://pokeapi.co/api/v2/pokemon?limit=45";
let nombresPokemon = [];

async function get_pokemons() {
    const pokemonsHtml = document.querySelector('.pokemons');
    try {
        const response = await fetch(URL);
        const responseJson = await response.json();
        const results = responseJson.results;

        if (results) {
            nombresPokemon = results.map(p => p.name);

            const pokemonDetails = await Promise.all(
            results.map(element => fetch(element.url).then(r => r.json()))
        );

        let htmlResults = "";

        for (let i = 0; i < results.length; i++) {
            const element = results[i];
            const responsePokemonJson = pokemonDetails[i];

            const imagePokemon = responsePokemonJson.sprites.other["official-artwork"].front_default;

            let htmlTypes = "";

            for (const types of responsePokemonJson.types) {
                htmlTypes += `<li>${types.type.name}</li>`;
            }

            let htmlStats = "";
            for (const stats of responsePokemonJson.stats) {
                htmlStats += `<p>${stats.stat.name}: ${stats.base_stat}</p>`;
            }

            let htmlMoves = "";
            for (const moves of responsePokemonJson.moves) {
                htmlMoves += `<li>${moves.move.name}</li>`;
            }

            htmlResults += `
                <article>
                <a href="pokemon.html?name=${element.name}">
                    <img class="pokemon_image" src="${imagePokemon}" />
                    <h2>${element.name}</h2>
                </a>
                </article>
            `;
        }

        pokemonsHtml.innerHTML = htmlResults;

    } else {
        pokemonsHtml.innerHTML = "No hay pokemones";
    }

    } catch(e) {
    console.log(e);
    pokemonsHtml.innerHTML = "Error fetching data";
    }
}

function search() {
    const box_search = document.getElementById("box_search").value;
    const lista = document.getElementById("results");

    if (box_search.trim() === "") {
    const cards = document.querySelectorAll('.pokemons article');
    cards.forEach(card => card.style.display = "");
    lista.innerHTML = "";
    return;
    }

    const result = nombresPokemon.filter(nombre =>
    nombre.toLowerCase().includes(box_search.toLowerCase())
    );

    lista.innerHTML = "";

    if (result.length > 0) {
        result.forEach(nombre => {
            const li = document.createElement("li");
            li.textContent = nombre;
            lista.appendChild(li);
        });
    } else {
    const li = document.createElement("li");
    li.textContent = "No se encontraron resultados para: " + box_search;
    lista.appendChild(li);
    }

    const cards = document.querySelectorAll('.pokemons article');
    cards.forEach(card => {
    const nombre = card.querySelector('h2').textContent.trim().toLowerCase();
    card.style.display = nombre.includes(box_search.toLowerCase()) ? "" : "none";
    });
}

document.querySelector("#box_search").addEventListener("keyup", function() {
    search();
});

get_pokemons();
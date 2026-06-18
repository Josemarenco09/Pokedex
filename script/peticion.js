const URL = "https://pokeapi.co/api/v2/pokemon?limit=45";
let nombresPokemon = [];

async function get_pokemons() {
    const pokemonsHtml = document.querySelector('.pokemons');

    try {
        const response = await fetch(URL);
        const responseJson = await response.json();
        const results = responseJson.results;

        if (results) {
            if (results) {
            nombresPokemon = results.map(p => p.name);
        }

            let htmlResults = "";

            for (element of results) {
                const responsePokemon = await fetch(element.url)
                const responsePokemonJson = await responsePokemon.json();
                 // console.log(responsePokemonJson)
                const imagePokemon = responsePokemonJson.sprites.other["official-artwork"].front_default;

                let htmlTypes = ""
                for(types of responsePokemonJson.types) {
                    htmlTypes += `<li>${types.type.name}</li>`
                }

                let htmlStats = ""
                // for of stats
                for (stats of responsePokemonJson.stats) {
                    //console.log(stats)
                    htmlStats += `
                    <p>${stats.stat.name}: ${stats.base_stat}</p>
                    `
                }

                let htmlMoves= ""
                //for of moves
                for (moves of responsePokemonJson.moves) {
                    //console.log(moves)
                    htmlMoves += `
                    <li>${moves.move.name}</li>
                    `
                }

                htmlResults += `
                    <article>
                        <a href="/pokemon_proyect/pokemon.html?name=${element.name}">
                            <img class="pokemon_image" src="${imagePokemon}" />
                            <h2>
                            <a href="/pokemon_proyect/pokemon.html?name=${element.name}">${element.name}</a>
                            </h2>
                        </a>
                    </article>
                `;
            };
            
            pokemonsHtml.innerHTML = htmlResults;
        } else {
            pokemonsHtml.innerHTML = "No hay pokemones";
        }
    } catch(e) {
        pokemonsHtml.innerHTML = "Error fetching data";
        //window.location.href = "https://www.google.com"
    }
}


function search() {
    box_search = document.getElementById("box_search").value; 
    succces_search = document.getElementById("succes_search"); //Elementos HTML que interactuan
    results_search = document.getElementById("results");
    console.log(box_search);
    
    if (box_search.trim() === "") {   //Condicional por si llega a estar vacio
        const cards = document.querySelectorAll('.pokemons article');
        cards.forEach(card => card.style.display = "");
        return;
    }

    const result = nombresPokemon.filter(nombre => //Nombre de los pokemones filtrados
        nombre.toLowerCase().includes(box_search.toLowerCase())
    );

    const lista = document.getElementById("results"); // Se dirige al UL del HTMl
    lista.innerHTML = "";

    if (result.length > 0) {
        result.forEach(nombre => {
            let li = document.createElement("li");
            li.textContent = nombre;
            lista.appendChild(li);
        });
    } else {
        let li = document.createElement("li");
        li.textContent = "No se encontraron resultados para: " + box_search;
        lista.appendChild(li);
    }

    const cards = document.querySelectorAll('.pokemons article');

    if (cards.length > 0) {
        cards.forEach(card => {
            const nombre = card.querySelector('h2').textContent.trim().toLowerCase();
            
            if (nombre.includes(box_search.toLowerCase())) {
                card.style.display = "";  //  Restaura el CSS original
            } else {
                card.style.display = "none";
            }
        });
    }
}

document.querySelector("#box_search").addEventListener("keyup", function(e) {
    search()
})



get_pokemons();
search()
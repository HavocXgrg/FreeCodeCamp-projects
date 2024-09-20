const userInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonWeight = document.getElementById("weight");
const pokemonHeight = document.getElementById("height");

const pokemonImage = document.getElementById("pokemon-image");
const pokemonTypes = document.getElementById("types");

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

// Function to search for Pokémon based on user input
const searchPokimon = async () => {

    try {
        // Fetch Pokémon data from the API using the input value (converted to lowercase)
        const res = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${userInput.value.toLowerCase()}`);
        const data = await res.json();

        const { name, id, weight, height, stats, sprites, types } = data;  // Destructuring the necessary fields from the API response
        
        // Updating the DOM elements
        pokemonName.innerHTML = name.toUpperCase();
        pokemonId.innerHTML = `#${id}`;
        pokemonWeight.innerHTML = `Weight: ${weight}`;
        pokemonHeight.innerHTML = `Height: ${height}`;
        
        pokemonImage.innerHTML = `<img id="sprite" src="${sprites.front_default}">`;
        pokemonTypes.innerHTML = types.map(type => `<span>${type.type.name.toUpperCase()}</span>`).join('');

        // Update the base stats of the Pokémon (HP, Attack, Defense, etc.)
        hp.innerHTML = stats[0].base_stat;              
        attack.innerHTML = stats[1].base_stat;          
        defense.innerHTML = stats[2].base_stat;         
        specialAttack.innerHTML = stats[3].base_stat;  
        specialDefense.innerHTML = stats[4].base_stat;
        speed.innerHTML = stats[5].base_stat;           

    } catch (error) {
        
        alert("Pokemon not found");
        console.log(error.message);
    }
}

// Adding event listener to the search button and while pressing enter key
searchBtn.addEventListener('click', searchPokimon);
userInput.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        e.preventDefault();  // Prevents form submission (i.e., prevents page reload)
        searchPokimon();     
    }
});

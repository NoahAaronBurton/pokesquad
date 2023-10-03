async function fetchPokemonStats(pokemonName) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch data for ${pokemonName}`);
    }
    const data = await response.json();
    
    // Extract the stats array from the response
    const stats = data.stats;
    console.log(stats);
    
    return stats;
}

$(document).ready(function () {
    console.log('ready test!')
})

$(document).ready(function() { // chapt gpt helped with this function
  var content = [];

  // Make a GET request to the Pokémon API to get a list of all Pokémon
  fetch('https://pokeapi.co/api/v2/pokemon?limit=2000') // You can adjust the limit as needed
      .then(response => response.json())
      .then(data => {
          // Iterate through the list of Pokémon and format them into the content array
          data.results.forEach(pokemon => {
              content.push({ title: pokemon.name });
          });

          // Initialize the search bar with the formatted content
          $('.ui.search')
              .search({
                  source: content,
              });
      })
      .catch(error => console.error('Error fetching Pokémon data:', error));
});


const squad = [];



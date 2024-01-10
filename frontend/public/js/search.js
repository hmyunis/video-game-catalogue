const searchBar = document.getElementById('search-bar');
const browseContainer = document.getElementById('browse-container');

// Listen for input events on the search bar
searchBar.addEventListener('input', async function (event) {
    // Get the search query
    const query = event.target.value;

    try {
        // Fetch all game items
        const response = await fetch('https://www.freetogame.com/api/games');
        if (!response.ok) {
            throw new Error('Failed to fetch games');
        }
        const games = await response.json();

        // Filter games based on the search query
        const filteredGames = games.filter(game => game.title.toLowerCase().includes(query.toLowerCase()));

        // Clear the browse container
        browseContainer.innerHTML = '';

        // Add filtered games to the browse container
        filteredGames.forEach(game => {
            const gameElement = document.createElement('div');
            gameElement.innerHTML = `
                <h2>${game.title}</h2>
                <p>${game.genre}</p>
                <p>${game.platform}</p>
                <p>${game.releaseDate}</p>
            `;
            browseContainer.appendChild(gameElement);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});
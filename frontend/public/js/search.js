const searchbtn = document.getElementById("search-btn");
const searchBar = document.getElementById("search-bar-field");

// Listen for input events on the search bar
searchbtn.addEventListener("click", async function () {
  // Get the search query
  const query = searchBar.value;

  try {
    // Fetch all game items
    const response = await fetch(
      `https://localhost:3000/games?keyword=${query}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch games");
    }
    const games = await response.json();

    // Clear the browse container
    browseContainer.innerHTML = "";

    // Add filtered games to the browse container
    games.forEach((game) => {
      const gameElement = document.createElement("div");
      gameElement.innerHTML = `
                <h2>${game.title}</h2>
                <p>${game.genre}</p>
                <p>${game.platform}</p>
                <p>${game.releaseDate}</p>
            `;
      browseContainer.appendChild(gameElement);
    });
  } catch (error) {
    console.error("Error:", error);
  }
});

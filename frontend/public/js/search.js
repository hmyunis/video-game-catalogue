const searchbtn = document.getElementById("search-btn");
const searchBar = document.getElementById("search-bar-field");
searchbtn.addEventListener("click", async function () {
  const query = searchBar.value;

  try {
    const response = await fetch(
      `https://localhost:3000/games?keyword=${query}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch games");
    }
    const games = await response.json();

    browseContainer.innerHTML = "";

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

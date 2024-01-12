const searchButton = document.getElementById('search-btn') as HTMLButtonElement;
const searchBar = document.getElementById('search-bar-field') as HTMLInputElement;
const browseGameContainer = document.getElementById('browse-games-container') as HTMLDivElement;

interface Game {
    id: number;
    title: string;
    releaseDate: string;
    imageUrl: string;
}

searchButton.addEventListener('click', async function () {
    const query = searchBar.value.trim();

    try {
        const response = await fetch(`http://localhost:3000/games/search/${query}`);
        if (!response.ok) {
            throw new Error('Failed to fetch games');
        }
        const games: Game[] = await response.json();
        browseGameContainer.innerHTML = '';
        games.forEach((game: Game) => {
            insertGameItemToHTML(game);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});

function insertGameItemToHTML(gameObj: Game, userId: number = 3) {
    const { id, title, releaseDate, imageUrl } = gameObj;
    const gameItemTemplate = `
  <div id="game-id-${id}" class="w-72 h-1/4 m-5 text-white rounded-xl bg-slate-900 hover:-translate-y-3 transition-all duration-300">
      <img src="${imageUrl}" alt="${title}" class="rounded-t-xl h-96 w-full">
      <section class="p-3 h-fit w-full">
          <hgroup>
              <h3 class="text-3xl" id="game-title">${title}</h3>
              <h5 class="text-sm text-slate-500" id="game-release-date">${releaseDate}</h5>
          </hgroup>
          <div class="flex justify-between mt-1">
              <button class="text-sm text-blue-500" id="game-${id}-details" onclick="displayDetails(${id});">Details</button>
              <section class="flex gap-3">
                  <select id="add-to-collection-for-${userId}" class="text-black bg-[#1efe80] rounded" onchange="activation(event.target.value)">
                      <option value="" disabled selected>Add to</option>
                      <option value="played">Played</option>
                      <option value="playing">Playing</option>
                      <option value="planned">Planned</option>
                  </select>
                  <button id="game-${id}-save" onclick="saveToCollection(${id})" class="bg-blue-400 p-1 px-2 rounded hover:bg-white hover:text-blue-600">Save</button>
              </section>
          </div>
      </section>
  </div>
  `;
    browseGameContainer.insertAdjacentHTML('beforeend', gameItemTemplate);
}

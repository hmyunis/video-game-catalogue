// interface GameAttrs {
//     id: number;
//     title: string;
//     description: string;
//     genre: string;
//     platform: string;
//     releaseDate: string;
// }

// interface DisplayableGameAttrs {
//     id: number;
//     imgSrc: string;
//     title: string;
//     releaseDate: string;
// }
const APILINK =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&query=";

const browseContainer = document.getElementById("browse-games-container");
const GAME_API_URL = "http://localhost:3000/games";

fetch(GAME_API_URL)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((game) => {
      insertGameItemToHTML(game);
    });
  })
  .catch((error) => console.error("ERROR: ", error));

function insertGameItemToHTML(gameObj) {
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
                    <select id="add-to-collection-for-${id}" class="text-black bg-[#1efe80] rounded" onchange="activation(event.target.value)">
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
  browseContainer?.insertAdjacentHTML("beforeend", gameItemTemplate);
}

function getGameObjById(gameId: number) {
  fetch(GAME_API_URL + `/${gameId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => console.error("ERROR: ", error));
}

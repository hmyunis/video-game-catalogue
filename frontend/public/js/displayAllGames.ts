interface GameAttrs {
    id: number;
    title: string;
    description: string;
    genre: string;
    platform: string;
    releaseDate: string;
}

interface DisplayableGameAttrs {
    id: number;
    imgSrc: string;
    title: string;
    releaseDate: string;
}
const browseContainer = document.getElementById('browse-game-container');

fetch('https://localhost:3000/games')
    .then((response) => response.json())
    .then((data) => {
        data.forEach((game) => {
            insertGameItemToHTML(game);
        });
    })
    .catch((error) => console.error('ERROR: ', error));

function insertGameItemToHTML(displayableGameAttrs: DisplayableGameAttrs) {
    const { id, imgSrc, title, releaseDate } = displayableGameAttrs;
    const gameItemTemplate = `
    <div id="game-${id}" class="w-72 m-5 text-white rounded-xl bg-slate-900 hover:-translate-y-3 transition-all duration-300">
    <img src="${imgSrc}" alt="${title}" class="rounded-t-xl">
    <section class="p-3">
        <hgroup>
            <h3 class="text-3xl" id="game-title">${title}</h3>
            <h5 class="text-sm text-slate-500" id="game-release-date">${releaseDate}</h5>
        </hgroup>
        <div class="flex justify-between mt-1">
            <button class="text-sm text-blue-500" id="game-details" onclick="displayDetails(${id});">Details</button>
            <section class="flex gap-3">
                <select id="add-to-collection" class="text-black bg-[#1efe80] rounded">
                    <option value="" disabled selected>Add to</option>
                    <option value="played">Played</option>
                    <option value="playing">Playing</option>
                    <option value="planned">Planned</option>
                </select>
                <button class="bg-blue-400 p-1 px-2 rounded hover:bg-white hover:text-blue-600">Save</button>
            </section>
        </div>
    </section>
    </div>
    `;
    browseContainer?.insertAdjacentHTML('beforeend', gameItemTemplate);
}


function getGameObjById(gameId: number) {
    fetch(`http://localhost:3000/games/${gameId}`)
        .then((response) => response.json())
        .then((data) => {
            return data[0];
        })
        .catch((error) => console.error('ERROR: ', error));
}

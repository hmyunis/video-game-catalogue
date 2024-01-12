const browseContainer = document.getElementById('browse-games-container');

fetch('http://localhost:3000/games')
    .then((response) => response.json())
    .then((data) => {
        data.forEach((game) => {
            insertGameItemsToHTML(game);
        });
    })
    .catch((error) => console.error('ERROR: ', error));

async function getSignedInUsersId(){
    const response = await fetch('http://localhost:3000/users/whoami', {
        headers: {
            Authorization: localStorage.getItem('authToken'),
        },
    });
    const userId = await response.json();
    return userId;
}    

function insertGameItemsToHTML(gameObj, userId) {
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
    browseContainer?.insertAdjacentHTML('beforeend', gameItemTemplate);
}

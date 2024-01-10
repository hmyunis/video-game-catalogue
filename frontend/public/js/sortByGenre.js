const sortButtonContainer = document.getElementById('sort-btn-container');
const browseGamesContainer = document.getElementById('browse-games-container');

sortButtonContainer.addEventListener('click', (event) => {
    if (event.target === sortButtonContainer) return;
    browseGamesContainer.innerHTML = '';
    const clickedGenre = event.target.innerHTML.trim();
    clearSelectedStyles();
    event.target.classList.contains('bg-green-400')
        ? event.target.classList.remove('bg-green-400')
        : event.target.classList.add('bg-green-400');

    fetch(`http://localhost:3000/games?genre=${clickedGenre}`)
        .then((res) => res.json())
        .then((games) => {
            games.forEach(async (game) => {
                const userId = await getCurrentUsersId();
                const isAdminFlag = await userIsAdminFlag();
                if (isAdminFlag) insertGameItemsToHTML(game, userId, true);
                else {
                    insertGameItemsToHTML(game, userId, false);
                }
            });
        });
});

async function getCurrentUsersId() {
    const response = await fetch('http://localhost:3000/users/whoami', {
        headers: {
            Authorization: localStorage.getItem('authToken'),
        },
    });
    const userId = await response.json();
    return userId;
}

function insertGameToHTML(gameObj, userId, userIsAdmin) {
    const { id, title, releaseDate, imageUrl } = gameObj;
    const gameItemTemplate = !userIsAdmin
        ? `
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
    `
        : `
    <div id="game-id-${id}" class="w-72 h-1/4 m-5 relative text-white rounded-xl bg-slate-900 hover:-translate-y-3 transition-all duration-300">
        <button onclick="updateGame(${id})" class="absolute right-0 text-3xl bg-yellow-200 rounded-tr-xl text-black p-2">✏</button>
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
    browseGamesContainer.insertAdjacentHTML('beforeend', gameItemTemplate);
}

function clearSelectedStyles() {
    const childNodes = sortButtonContainer.childNodes;
    const elementNodes = Array.from(childNodes).filter((node) => node.nodeType === 1);
    elementNodes.forEach((button) => {
        button.classList.remove('bg-green-400');
    });
}

const userIsAdminFlag = async function () {
    const response = await fetch('http://localhost:3000/users/whoami', {
        headers: {
            Authorization: localStorage.getItem('authToken'),
        },
    });
    const userId = await response.json();
    const currentUser = await getUserbyId(userId);
    return currentUser.username === 'Admin';
};
async function getUserbyId(userId) {
    const response = await fetch(`http://localhost:3000/users/${userId}`);
    return response.json();
}

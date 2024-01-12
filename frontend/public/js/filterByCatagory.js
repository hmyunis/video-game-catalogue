const gameCollectionContainer = document.getElementById('game-collections-container');

async function filterByTab(button) {
    const clickedStatus = button.innerHTML.trim().toUpperCase();
    button.parentElement.classList.add('text-[#1efe80]', 'border-r-4', 'border-[#1EFE80]');
    clearOthersStyles(button);
    gameCollectionContainer.innerHTML = '';
    // const response = await fetch('http://localhost:3000/users/whoami');
    // const userId = await response.json().id;
    const userId = 3; // until whoami works
    fetch(`http://localhost:3000/collections/user/${userId}?status=${clickedStatus}`)
        .then((res) => res.json())
        .then((gameIds) => {
            const gameIdSet = new Set(gameIds);
            gameIdSet.forEach(async (gameId) => {
                const response = await fetch(`http://localhost:3000/games/${gameId}`);
                const gameObj = await response.json();
                insertToCollectionContainer(gameObj);
            });
        });
}

function clearOthersStyles(button) {
    const childNodesOfParent = button.parentElement.parentElement.childNodes;
    const elementNodes = Array.from(childNodesOfParent).filter((node) => node.nodeType === 1);
    elementNodes.slice(1).forEach((list) => {
        if (list !== button.parentElement) {
            list.classList.remove('text-[#1efe80]', 'border-r-4', 'border-[#1EFE80]');
        }
    });
}

function insertToCollectionContainer(gameObj) {
    const { id, title, releaseDate, imageUrl } = gameObj;
    const gameItemHTML = `
    <div id="game-id-${id}" class="w-72 h-fit m-5 text-white rounded-xl bg-slate-900 hover:-translate-y-3 transition-all duration-300">
        <img src="${imageUrl}" alt="${title}" class="rounded-t-xl h-96 w-full">
        <section class="p-3 h-fit w-full">
            <hgroup>
                <h3 class="text-3xl" id="game-title">${title}</h3>
                <h5 class="text-sm text-slate-500" id="game-release-date">${releaseDate}</h5>
            </hgroup>
            <div class="flex justify-between mt-1">
                <button class="text-sm text-blue-500" id="game-${id}-details" onclick="displayDetails(${id});">Details</button>
                <section class="flex gap-3">
                    <button
                    onclick="deleteGame(${id})"
                    class="bg-red-500 p-1 px-2 rounded hover:bg-white hover:text-red-600">
                    Remove
                </button>
                </section>
            </div>
        </section>
    </div>
`;

    gameCollectionContainer?.insertAdjacentHTML('afterbegin', gameItemHTML);
}

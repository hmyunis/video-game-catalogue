let activeCatagory = "playedGames";
const catagoryCardContiner = document.getElementById(
  "game-collections-container"
);

filterByTab(activeCatagory);

function filterByTab(catagory) {
  catagoryCardContiner.innerHTML = "";
  fetch(`http://localhost:3000/users/whoami`)
    .then((res) => res.json())
    .then((user) => {
      userCollectionId = user["collectionId"];

      fetch(`http://localhost:3000/collections/${userCollectionId}`)
        .then((res) => res.json())
        .then((userData) => {
          catagoryGames = userData[catagory];
          catagoryGames.forEach((gameId) => {
            fetch(`http://localhost:3000/games/${gameId}`)
              .then((response) => response.json())
              .then((game) => {
                insertCatagoryCardToHTML(game);
              })
              .catch((error) => console.error("ERROR: ", error));
          });
        });
    });
}

function insertCatagoryCardToHTML(gameObj) {
  const { id, title, releaseDate } = gameObj;
  const catagoryCard = `
      <div id="game-id-${id}" class="w-72 m-5 text-white rounded-xl bg-slate-900 hover:-translate-y-3 transition-all duration-300">
          <img src="images/avatar.jpg" alt="${title}" class="rounded-t-xl">
          <section class="p-3">
            <hgroup>
                <h3 class="text-3xl" id="game-title">${title}</h3>
                <h5 class="text-sm text-slate-500" id="game-release-date">${releaseDate}</h5>
            </hgroup>
            <div class="flex justify-between mt-1">
              <button class="text-sm text-blue-500" id="game-${id}-details" onclick="displayDetails(${id});">Details</button>
              <section class="flex gap-3">
                <button
                  onclick="deleteGame('game-id-${id}')"
                  class="bg-red-500 p-1 px-2 rounded hover:bg-white hover:text-red-600"
                >
                  Remove
                </button>
              </section>
            </div>
          </section>
      </div>
`;

  catagoryCardContiner?.insertAdjacentHTML("beforeend", catagoryCard);
}

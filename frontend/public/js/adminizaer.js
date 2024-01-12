const auth = localStorage.getItem("authToken");
let isAdmin;

fetch("http://localhost:3000/users/whoami", {
  headers: {
    Authorization: auth,
  },
})
  .then((res) => res.json())
  .then((id) => {
    isAdmin = id === 7;
    if (isAdmin) {
      document.querySelector("#renderDeleteGame").classList.toggle("hidden");
      document.querySelector("#renderAddGame").classList.toggle("hidden");
    }
  });

function addGame(event) {
  const game = {
    title: document.querySelector("#title").innerHTML,
    genre: document.querySelector("#genre").innerHTML,
    publisher: document.querySelector("#publisher").innerHTML,
    description: document.querySelector("#description").innerHTML,
    platform: document.querySelector("#platform").innerHTML,
    imageUrl: document.querySelector("#imageUrl").innerHTML,
    releaseDate: document.querySelector("#releaseDate").innerHTML,
  };

  fetch("http://localhost:3000/games/new", {
    method: "POST",
    headers: {
      Authorization: auth,
    },
    body: game,
  })
    .then((res) => res.json())
    .then((data) => {
      insertGameItemsToHTML(data);
    });
}

function removeGame(event) {
  const game = document.querySelector("#gameId");
  fetch(`http://localhost:3000/games/${game}`, {
    method: "DELETE",
    headers: {
      Authorization: auth,
    },
  });
}

function renderAddGame() {
  document.querySelector("#addgameform").classList.toggle("hidden");
}

function renderDeleteGame() {
  document.querySelector("#deletegameform").classList.toggle("hidden");
}

const browseHeadingTag = findH1WithTagText('Browse');
const adminButtonsHTML = `
    <div id="admin-mode-features" class="flex">
        <div>
        <button
            class="h-fit self-center text-black bg-blue-400 px-4 py-1 text-xl font-semibold rounded-3xl m-3 hover:bg-blue-300 hover:scale-110 transition-all"
            onclick="addNewGame()"
        >
            + Add new game
        </button>
        </div>
        <div>
        <button
            class="h-fit self-center text-black bg-pink-400 px-4 py-1 text-xl font-semibold rounded-3xl m-3 hover:bg-pink-300 hover:scale-110 transition-all"
            onclick="deleteExistingGame()"
        >
            Remove game
        </button>
        </div>
    </div>
    `;

const isAdmin = async function () {
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

function findH1WithTagText(text) {
    let h1Tags = document.getElementsByTagName('h1');
    for (let i = 0; i < h1Tags.length; i++) {
        if (h1Tags[i].textContent === text) {
            return h1Tags[i];
        }
    }
    return null;
}

function addNewGame() {
    const newGameModalHTML = `
    <div id="new-game-modal" class="fixed p-5 top-[50%] left-[50%] max-md:w-[95vw] translate-x-[-50%] translate-y-[-45%] h-[80vh] w-[80vw] rounded-xl shadow-2xl bg-slate-400 text-gray-800">
      <button onclick="document.getElementById('new-game-modal').remove()">
        <img id="close-modal-icon" src="images/svg/close-icon.svg" class="top-3 right-5 w-8 hover:scale-125 hover:cursor-pointer transition-all fixed" alt="Close">
      </button>
      <form>
        <h1 class="text-center font-mono text-6xl text-green-700">🎮 Add New Game 🎮</h1>
        <div class="mx-auto w-[60%] py-5 grid grid-cols-3 items-baseline">
            <label for="title" class="text-3xl font-semibold">Title: </label>
          <input id="modal-title" name="title" type="text" required autofocus class="w-full col-span-2 px-2 py-2 my-3 border rounded focus:outline-gray-200 text-black"
          >
          <label for="description" class="text-3xl font-semibold">Description: </label>
          <input id="modal-description" name="description" type="text" required class="w-full col-span-2 px-2 py-2 my-3 border rounded focus:outline-gray-200 text-black"
          >
          <label for="genre" class="text-3xl font-semibold">Genre: </label>
          <input id="modal-genre" name="genre" type="text" required class="w-full col-span-2 px-2 py-2 my-3 border rounded focus:outline-gray-200 text-black"
          >
          <label for="publisher" class="text-3xl font-semibold">Publisher: </label>
          <input id="modal-publisher" name="publisher" type="text" required class="w-full col-span-2 px-2 py-2 my-3 border rounded focus:outline-gray-200 text-black"
          >
          <label for="platform" class="text-3xl font-semibold">Platform: </label>
          <input id="modal-platform" name="platform" type="text" required class="w-full col-span-2 px-2 py-2 my-3 border rounded focus:outline-gray-200 text-black"
          >
          <label for="releaseDate" class="text-3xl font-semibold">Release Date: </label>
          <input id="modal-releaseDate" name="releaseDate" type="text" required class="w-full col-span-2 px-2 py-2 my-3 border rounded focus:outline-gray-200 text-black"
          >
          <label for="imageUrl" class="text-3xl font-semibold">Image URL: </label>
          <input id="modal-imageUrl" name="imageUrl" type="text" required class="w-full col-span-2 px-2 py-2 my-3 border rounded focus:outline-gray-200 text-black"
          >
          <button onclick="submitCreation()" class="bg-blue-400 font-semibold text-3xl rounded-full hover:bg-blue-500 hover:scale-110 transition-all duration-500 px-10 py-3 mt-2 block w-80 mx-auto col-span-3">Submit<button>
        </div>
      </form>
    </div>
    `;
    document.querySelector('main').insertAdjacentHTML('afterend', newGameModalHTML);
}

function submitCreation() {
    const title = document.getElementById('modal-title').value;
    const description = document.getElementById('modal-description').value;
    const genre = document.getElementById('modal-genre').value;
    const platform = document.getElementById('modal-platform').value;
    const publisher = document.getElementById('modal-publisher').value;
    const releaseDate = document.getElementById('modal-releaseDate').value;
    const imageUrl = document.getElementById('modal-imageUrl').value;
    const newGameObject = {
        title: title,
        description: description,
        genre: genre,
        platform: platform,
        publisher: publisher,
        releaseDate: releaseDate,
        imageUrl: imageUrl,
    };
    console.log(newGameObject);
    fetch('http://localhost:3000/games/new', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem('authToken'),
        },
        body: JSON.stringify(newGameObject),
    })
        .then(() => {
            createPopUpMsg('New game added successfully', 'green');
        })
        .catch((error) => console.error('Error: ', error));
}

function deleteExistingGame() {
    const deleteGameModalHTML = `
    <div id="delete-game-modal" class="fixed top-[50%] left-[50%] max-md:w-[15vw] translate-x-[-50%] translate-y-[-45%] h-[20vh] w-[50vw] rounded-xl shadow-2xl bg-pink-200 text-gray-800">
      <button onclick="document.getElementById('delete-game-modal').remove()">
        <img id="close-modal-icon" src="images/svg/close-icon.svg" class="top-3 right-5 w-8 hover:scale-125 hover:cursor-pointer transition-all fixed" alt="Close">
      </button>
      <h1 class="text-center text-3xl font-mono text-red-900">Delete a Game</h1>
      <form class="mx-auto pt-3 px-10 grid grid-cols-3">
        <label for="id" class="text-2xl font-semibold">Enter game ID: </label>
        <input id="id" name="id" type="text" required autofocus class="w-full col-span-2 px-2 py-2 border rounded focus:outline-red-400 text-black">
        <button onclick="deleteThisGame(document.getElementById('id').value)" class="bg-red-300 font-semibold text-xl rounded-full hover:bg-red-500 hover:scale-110 transition-all duration-500 px-5 py-2 mt-2 block ml-auto col-span-3">Delete</button>
      </form>
    </div>
    `;
    document.querySelector('main').insertAdjacentHTML('afterend', deleteGameModalHTML);
}

function deleteThisGame(gameId) {
    fetch(`http://localhost:3000/games/${gameId}`, {
        method: 'DELETE',
        headers: {
            Authorization: localStorage.getItem('authToken'),
        },
    })
        .then(() => {
            createPopUpMsg('Game deleted successfully.', 'red');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

function createPopUpMsg(msg, color) {
    const modalHTML = `
    <div class="fixed bottom-0 right-0 w-full duration-300 transition-all" id="modalContainer">
        <div class="absolute bottom-2 duration-300 right-2 bg-${color??"slate"}-200 p-4 px-8 rounded-3xl text-lg rounded-br-none shadow-lg transition-all text-${color??"slate"}-950" id="modalContent">
            <p>${msg}</p>
        </div>
    </div>
    `;
    const newElement = document.createElement('div');
    newElement.innerHTML = modalHTML;
    document.body.appendChild(newElement);
    const modalContainer = document.getElementById('modalContainer');
    const modalContent = document.getElementById('modalContent');
    setTimeout(function () {
        modalContainer.style.opacity = '1';
        modalContent.style.transform = 'translate(-5%, -10%) scale(1)';
    }, 10);

    setTimeout(function () {
        modalContainer.style.opacity = '0';
        modalContent.style.transform = 'translate(-5%, -10%) scale(0.5)';
        setTimeout(function () {
            document.body.removeChild(newElement);
        }, 300);
    }, 3000);
}

async function renderAdminPage() {
    const adminFlag = await isAdmin();
    if (adminFlag) {
        browseHeadingTag.insertAdjacentHTML('afterend', adminButtonsHTML);
    }
}
renderAdminPage();

function updateGame(gameId) {
    const updateModalHTML = `
    <div id="update-game-modal" class="fixed z-[1000] p-5 top-[50%] left-[50%] max-md:w-[95vw] translate-x-[-50%] translate-y-[-45%] h-[80vh] w-[80vw] rounded-xl shadow-2xl bg-slate-400 text-gray-800">
      <button onclick="document.getElementById('update-game-modal').remove()">
        <img id="close-modal-icon" src="images/svg/close-icon.svg" class="top-3 right-5 w-8 hover:scale-125 hover:cursor-pointer transition-all fixed" alt="Close">
      </button>
      <form>
        <h1 class="text-center font-mono text-6xl text-blue-700">📝 Update Game</h1>
        <h1 class="text-center font-mono text-xl text-blue-700">Enter a new value for each field.</h1>
        <div class="mx-auto w-[60%]  grid grid-cols-3 items-baseline">
            <label for="title" class="text-3xl font-semibold">Title: </label>
          <input id="update-modal-title" name="title" type="text" required autofocus class="w-full col-span-2 px-2 py-2 my-3 border rounded focus:outline-gray-200 text-black"
          >
          <label for="description" class="text-3xl font-semibold">Description: </label>
          <input id="update-modal-description" name="description" type="text" required class="w-full col-span-2 px-2 py-2 my-3 border rounded focus:outline-gray-200 text-black"
          >
          <label for="genre" class="text-3xl font-semibold">Genre: </label>
          <input id="update-modal-genre" name="genre" type="text" required class="w-full col-span-2 px-2 py-2 my-3 border rounded focus:outline-gray-200 text-black"
          >
          <label for="publisher" class="text-3xl font-semibold">Publisher: </label>
          <input id="update-modal-publisher" name="publisher" type="text" required class="w-full col-span-2 px-2 py-2 my-3 border rounded focus:outline-gray-200 text-black"
          >
          <label for="platform" class="text-3xl font-semibold">Platform: </label>
          <input id="update-modal-platform" name="platform" type="text" required class="w-full col-span-2 px-2 py-2 my-3 border rounded focus:outline-gray-200 text-black"
          >
          <label for="releaseDate" class="text-3xl font-semibold">Release Date: </label>
          <input id="update-modal-releaseDate" name="releaseDate" type="text" required class="w-full col-span-2 px-2 py-2 my-3 border rounded focus:outline-gray-200 text-black"
          >
          <label for="imageUrl" class="text-3xl font-semibold">Image URL: </label>
          <input id="update-modal-imageUrl" name="imageUrl" type="text" required class="w-full col-span-2 px-2 py-2 my-3 border rounded focus:outline-gray-200 text-black"
          >
          <button onclick="submitUpdate(${gameId})" class="bg-green-400 font-semibold text-2xl rounded-full hover:bg-green-500 hover:scale-110 transition-all duration-500 px-10 py-3 mt-2 block w-72 mx-auto col-span-3">Confirm update<button>
        </div>
      </form>
    </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', updateModalHTML);
}

function submitUpdate(gameId) {
    const title = document.getElementById('update-modal-title').value;
    const description = document.getElementById('update-modal-description').value;
    const genre = document.getElementById('update-modal-genre').value;
    const platform = document.getElementById('update-modal-platform').value;
    const publisher = document.getElementById('update-modal-publisher').value;
    const releaseDate = document.getElementById('update-modal-releaseDate').value;
    const imageUrl = document.getElementById('update-modal-imageUrl').value;
    const updatedGameObject = {
        title: title,
        description: description,
        genre: genre,
        platform: platform,
        publisher: publisher,
        imageUrl: imageUrl,
        releaseDate: releaseDate,
    };
    console.log(updatedGameObject);
    fetch(`http://localhost:3000/games/${gameId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('authToken'),
        },
        body: JSON.stringify(updatedGameObject),
    })
        .then((response) => {
            if (!response.ok) {
                createPopUpMsg('Game update failed.', 'red');
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            createPopUpMsg('Game updated successfully', 'green');
        })
        .catch((error) => console.error('Error: ', error));
}

function createPopUpMsg(msg, color) {
    const modalHTML = `
    <div class="fixed bottom-0 right-0 w-full duration-300 transition-all" id="modalContainer">
        <div class="absolute bottom-2 duration-300 right-2 bg-${
            color ?? 'slate'
        }-200 p-4 px-8 rounded-3xl text-lg rounded-br-none shadow-lg transition-all text-${
        color ?? 'slate'
    }-950" id="modalContent">
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

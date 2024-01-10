async function displayDetails(gameId) {
    const response = await fetch(`http://localhost:3000/games/${gameId}`);
    const gameObj = await response.json();
    const { title, description, genre, platform, publisher, releaseDate, imageUrl } = gameObj;
    const modalHTML = `
    <div id="details-modal" class="fixed z-[1000] p-10 top-[50%] left-[50%] max-md:w-[95vw] translate-x-[-50%] translate-y-[-45%] h-[80vh] w-[80vw] rounded-xl shadow-2xl bg-slate-400 text-gray-800">
        <div class="w-full h-full flex max-md:flex-col max-md:overflow-y-scroll">
            <picture class="w-1/2 h-full max-md:w-full">
            <img src="${imageUrl}" alt="ac-origins" class="w-full h-full">
            </picture>
            <img id="close-modal-icon" src="images/svg/close-icon.svg" class="top-3 right-5 w-8 hover:scale-125 hover:cursor-pointer transition-all fixed" alt="Close">
            <section class="w-1/2 px-8">
            <div class="text-xl">
                <p class="my-12"><span class="text-2xl mr-3 font-bold">Name:</span>${title}</p>
                <p class="my-12"><span class="text-2xl mr-3 font-bold">Genre:</span>${genre}</p>
                <p class="my-12"><span class="text-2xl mr-3 font-bold">Release Date:</span>${releaseDate}</p>
                <p class="my-12"><span class="text-2xl mr-3 font-bold">Platforms:</span>${platform}</p>
                <p class="my-12"><span class="text-2xl mr-3 font-bold">Publisher:</span>${publisher}</p>
                <p class="my-12"><span class="text-2xl mr-3 font-bold">Description:</span>${description}</p>
            </div>
            </section>
        </div>
    </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', modalHTML);
    const closeIcon = document.getElementById('close-modal-icon');
    const modal = document.getElementById('details-modal');
    closeIcon.addEventListener('click', () => modal.classList.add('hidden'));
}

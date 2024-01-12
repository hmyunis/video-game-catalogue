function saveToCollection(gameId) {
    const button = document.getElementById(`game-${gameId}-save`);
    const select = button.previousElementSibling;
    const userId = select.getAttribute('id').slice(22);
    const selectedOption = select.options[select.selectedIndex].text.toUpperCase();
    if (selectedOption === 'ADD TO') return;
    fetch(`http://localhost:3000/collections/new`, {
        method: 'POST',
        body: JSON.stringify({
            userId: parseInt(userId),
            gameId: parseInt(gameId),
            status: selectedOption,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then(() => {
            createPopUpMsg(`${selectedOption} collection updated successfully.`);
            button.disabled = true;
            setTimeout(function () {
                button.disabled = false;
            }, 3000);
        })
        .catch((error) => console.error(error));
}

function createPopUpMsg(msg) {
    const modalHTML = `
    <div class="fixed bottom-0 right-0 w-full duration-300 transition-all" id="modalContainer">
        <div class="absolute bottom-2 duration-300 right-2 bg-green-200 p-4 px-8 rounded-3xl text-lg rounded-br-none shadow-lg transition-all text-green-950" id="modalContent">
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

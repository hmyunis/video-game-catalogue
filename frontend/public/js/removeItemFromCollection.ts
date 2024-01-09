// deleteGame is called from the onclick attribute of the html
function deleteGame(gameId: number | string) {
    fetch(`http://localhost:3000/collections/${getActiveTabName()}/${gameId}`, {
        method: 'DELETE',
        headers: {
            'Content-type': 'application/json; charset-utf8',
        },
    })
        .then((res) => res.json())
        .then((deletedGame) => {
            createPopUpMsg(`You have successfully removed ${deletedGame[0].title}.`);
            document.getElementById(`${gameId}`)?.remove();
        });
}

function getActiveTabName() {
    const activeTabName = document.querySelector('active-tab')?.querySelector('button')?.innerHTML;
    return activeTabName?.toLowerCase();
}

function createPopUpMsg(msg: string) {
    // Create modal container
    var modalContainer = document.createElement('div');
    modalContainer.style.position = 'fixed';
    modalContainer.style.bottom = '0';
    modalContainer.style.right = '0';
    modalContainer.style.width = '100%';
    modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modalContainer.style.transition = 'opacity 0.3s, transform 0.3s';

    // Create modal content
    var modalContent = document.createElement('div');
    modalContent.style.position = 'absolute';
    modalContent.style.bottom = '0';
    modalContent.style.right = '0';
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.2)';
    modalContent.style.transition = 'opacity 0.3s, transform 0.3s';

    // Create message element
    var messageElement = document.createElement('p');
    messageElement.style.color = 'black';
    messageElement.innerHTML = msg;

    // Append elements to the modal
    modalContent.appendChild(messageElement);
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);

    // Add transition styles
    setTimeout(function () {
        modalContainer.style.opacity = '1';
        modalContent.style.transform = 'translate(-5%, -10%) scale(1)';
    }, 10);

    // Close the modal after some time
    setTimeout(function () {
        modalContainer.style.opacity = '0';
        modalContent.style.transform = 'translate(-5%, -10%) scale(0.5)';
        setTimeout(function () {
            document.body.removeChild(modalContainer);
        }, 300);
    }, 3000); // Close after 3 seconds
}

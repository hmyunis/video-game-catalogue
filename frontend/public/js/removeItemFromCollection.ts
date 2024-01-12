async function deleteGame(gameId: number) {
    const userId: number = await getLoggedInUsersId();
    console.log(getActiveTabName(), gameId, userId);

    fetch(
        `http://localhost:3000/collections?status=${getActiveTabName()}&gameId=${gameId}&userId=${userId}`,
        {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset-utf8',
            },
        }
    )
        .then((res) => res.json())
        .then((deletedGame) => {
            createPopUpMessage(`Game removed successfully ${deletedGame[0]?.title}.`);
            const gameElement = document.getElementById(`game-id-${gameId}`);
            if (gameElement) {
                gameElement.remove();
            }
        });
}

async function getLoggedInUsersId() {
    const response = await fetch('http://localhost:3000/users/whoami', {
        headers: {
            Authorization: localStorage.getItem('authToken'),
        },
    });
    const userId = await response.json();
    return userId;
}

function getActiveTabName(): string {
    const tabListItems: HTMLElement[] = [
        document.getElementById('played-tab')?.parentElement,
        document.getElementById('playing-tab')?.parentElement,
        document.getElementById('planned-tab')?.parentElement,
    ].filter(Boolean) as HTMLElement[]; // Filter out null values and cast to HTMLElement array

    let activeTab: string | undefined;
    tabListItems.forEach((item) => {
        if (item.classList.contains('text-[#1efe80]')) {
            activeTab = item.firstElementChild?.innerHTML.trim().toUpperCase();
        }
    });

    return activeTab || '';
}

function createPopUpMessage(msg: string): void {
    const modalHTML: string = `
    <div class="fixed bottom-0 right-0 w-full duration-300 transition-all" id="modalContainer">
        <div class="absolute bottom-2 duration-300 right-2 bg-green-200 p-4 px-8 rounded-3xl text-lg rounded-br-none shadow-lg transition-all text-green-950" id="modalContent">
            <p>${msg}</p>
        </div>
    </div>
    `;
    const newElement: HTMLDivElement = document.createElement('div');
    newElement.innerHTML = modalHTML;
    document.body.appendChild(newElement);
    const modalContainer: HTMLElement | null = document.getElementById('modalContainer');
    const modalContent: HTMLElement | null = document.getElementById('modalContent');

    if (modalContainer && modalContent) {
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
}

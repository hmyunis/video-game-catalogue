document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/users/whoami')
        .then((response: Response) => response.json())
        .then((currentUser: any) => {
            console.log(currentUser);
            const signedInUsername = document.getElementById('profile-username') as HTMLElement;
            const usernameInputField = document.getElementById('username') as HTMLInputElement;
            const signedInJoinDate = document.getElementById('join-date') as HTMLElement;
            const signedInPlayedCount = document.getElementById('played-games-count') as HTMLElement;
  
            if (signedInUsername && usernameInputField && signedInJoinDate && signedInPlayedCount) {
              signedInUsername.innerHTML = currentUser.username;
              usernameInputField.setAttribute('placeholder', currentUser.username);
              signedInJoinDate.innerHTML = currentUser.joinDate;
              getPlayedGamesCount(currentUser.id).then(count => {
                signedInPlayedCount.innerHTML = count.toString();
              });
            }
        });
  
    async function getPlayedGamesCount(userId: string): Promise<number> {
        const response = await fetch(`http://localhost:3000/users/${userId}/played`);
        const playedGames = await response.json();
        return playedGames.length;
    }
  
    const form = document.getElementById('update-form') as HTMLFormElement;
  
    if (form) {
      form.addEventListener('submit', async function (event: Event) {
        event.preventDefault();
        // Rest of the form submission logic goes here
        const username = (document.getElementById('username') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;

        fetch("http://localhost:3000/users",
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            }
        )
            .then((response) => {
                if (!response.ok) {
                    createPopUpMsg('System failed to update your profile.')
                    window.location.href = "profile.html";
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                createPopUpMsg('You have successfully updated your profile.')
            })
            .catch((error) => {
                console.error('Error:', error);
            });
      });
    }
    
    const logoutButton = document.getElementById('logout-btn');
    
    logoutButton?.addEventListener('click', () => {
        createPopUpMsg('You have failed to updated your profile.');
        fetch('http://localhost:3000/users/signout', { method: 'POST' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                window.location.href = 'index.html';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    });

    function createPopUpMsg(msg: string) {
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
        }, 2000); // Close after 2 seconds
    }
});
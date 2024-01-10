(function() {
    // Get the modal element
    const modal = document.getElementById('details-modal') as HTMLElement;
  
    // Get the close button element
    const closeButton = document.getElementById('close-button') as HTMLElement;
  
    // Listen for click events on game items
    document.addEventListener('click', async function (event: Event) {
      const target = event.target as HTMLElement;
      if (target && target.matches('.game-item')) {
        // Get the game id from the clicked element's id
        const gameId = target.id.split('-')[2];
  
        // Fetch game details
        const response = await fetch(`http://localhost:3000/games/${gameId}`);
        const game = await response.json();
  
        // Display game details in the modal
        modal.innerHTML = `
          <h2>${game.title}</h2>
          <p>${game.description}</p>
          <!-- Add more game details here -->
        `;
  
        // Show the modal
        modal.style.display = 'block';
      }
    });
  
    // Listen for click events on the close button
    closeButton.addEventListener('click', function () {
      // Hide the modal
      modal.style.display = 'none';
    });
  })();
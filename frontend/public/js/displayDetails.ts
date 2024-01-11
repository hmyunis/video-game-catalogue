(function () {
  const modal = document.getElementById("details-modal") as HTMLElement;
  const closeButton = document.getElementById("close-button") as HTMLElement;
  document.addEventListener("click", async function (event: Event) {
    const target = event.target as HTMLElement;
    if (target && target.matches(".game-item")) {
      const gameId = target.id.split("-")[2];
      const response = await fetch(`http://localhost:3000/games/${gameId}`);
      const game = await response.json();
      modal.innerHTML = `
          <h2>${game.title}</h2>
          <p>${game.description}</p>
          <!-- Add more game details here -->
        `;

      modal.style.display = "block";
    }
  });

  closeButton.addEventListener("click", function () {
    // Hide the modal
    modal.style.display = "none";
  });
})();

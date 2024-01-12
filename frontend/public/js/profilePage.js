fetch("http://localhost:3000/users/whoami", {
  headers: {
    Authorization: localStorage.getItem("authToken"),
  },
})
  .then((response) => response.json())
  .then(async (currentUserId) => {
    const currentUser = await getUserbyId(currentUserId);
    const signedInUsername = document.getElementById("profile-username");
    signedInUsername.innerHTML = currentUser.username;

    const usernameInputField = document.getElementById("username");
    usernameInputField.setAttribute("placeholder", currentUser.username);

    const signedInJoinDate = document.getElementById("join-date");
    signedInJoinDate.innerHTML = currentUser.joinDate;

    const response = await fetch(
      `http://localhost:3000/collections/user/${currentUserId}?status=PLAYED`,
      {
        headers: {
          Authorization: localStorage.getItem("authToken"),
        },
      }
    );
    const playedGamesArray = await response.json();
    const playedGamesCount = playedGamesArray.length;
    const signedInPlayedCount = document.getElementById("played-games-count");
    signedInPlayedCount.innerHTML = playedGamesCount;
  });

async function getUserbyId(userId) {
  const response = await fetch(`http://localhost:3000/users/${userId}`);
  return response.json();
}

const form = document.getElementById("update-form");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:3000/users/whoami", {
    headers: {
      Authorization: localStorage.getItem("authToken"),
    },
  })
    .then((response) => response.json())
    .then(async (currentUserId) => {
      fetch(`http://localhost:3000/users/${currentUserId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("authToken"),
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            createPopUpMsg("System failed to update your profile.");
            // window.location.href = 'profile.html';
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(() => {
          createPopUpMsg("You have successfully updated your profile.");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
});

const logoutButton = document.getElementById("logout-btn");

logoutButton.addEventListener("click", () => {
  createPopUpMsg("You have failed to updated your profile.");
  fetch("http://localhost:3000/signout", { method: "POST" })
    .then(() => {
      localStorage.removeItem("authToken");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

function createPopUpMsg(msg) {
  var modalContainer = document.createElement("div");
  modalContainer.style.position = "fixed";
  modalContainer.style.bottom = "0";
  modalContainer.style.right = "0";
  modalContainer.style.width = "100%";
  modalContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  modalContainer.style.transition = "opacity 0.3s, transform 0.3s";

  var modalContent = document.createElement("div");
  modalContent.style.position = "absolute";
  modalContent.style.bottom = "0";
  modalContent.style.right = "0";
  modalContent.style.backgroundColor = "white";
  modalContent.style.padding = "20px";
  modalContent.style.borderRadius = "8px";
  modalContent.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.2)";
  modalContent.style.transition = "opacity 0.3s, transform 0.3s";

  var messageElement = document.createElement("p");
  messageElement.style.color = "black";
  messageElement.innerHTML = msg;

  modalContent.appendChild(messageElement);
  modalContainer.appendChild(modalContent);
  document.body.appendChild(modalContainer);

  setTimeout(function () {
    modalContainer.style.opacity = "1";
    modalContent.style.transform = "translate(-5%, -10%) scale(1)";
  }, 10);

  setTimeout(function () {
    modalContainer.style.opacity = "0";
    modalContent.style.transform = "translate(-5%, -10%) scale(0.5)";
    setTimeout(function () {
      document.body.removeChild(modalContainer);
    }, 300);
  }, 2000);
}

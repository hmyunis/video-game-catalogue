let userChoice = "played";

function saveToCollection(gameId) {
  let newUserData;
  let userCollectionId;

  fetch(`http://localhost:3000/users/whoami`)
    .then((res) => res.json())
    .then((user) => {
      userCollectionId = user["collectionId"];

      fetch(`http://logalhost:300/collections/${userCollectionId}`)
        .then((res) => res.json())
        .then((userData) => {
          newUserData = { ...userData };
          newUserData[`${userChoice}Games`].append(gameId);

          fetch(`http://logalhost:300/collections/${userCollectionId}`, {
            method: "PATCH",
            headers: {
              "Content-type": "application/json; charset-utf8",
            },
            body: newUserData,
          });
        });
    });
}

function activation(value) {
  userChoice = value;
}

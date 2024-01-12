var browseContainer = document.getElementById('browse-games-container');
fetch('http://localhost:3000/games')
    .then(function (response) { return response.json(); })
    .then(function (data) {
    data.forEach(function (game) {
        insertGameItemsToHTML(game);
    });
})
    .catch(function (error) { return console.error('ERROR: ', error); });
function insertGameItemsToHTML(gameObj, userId) {
    if (userId === void 0) { userId = 3; }
    var id = gameObj.id, title = gameObj.title, releaseDate = gameObj.releaseDate, imageUrl = gameObj.imageUrl;
    var gameItemTemplate = "\n    <div id=\"game-id-".concat(id, "\" class=\"w-72 h-1/4 m-5 text-white rounded-xl bg-slate-900 hover:-translate-y-3 transition-all duration-300\">\n        <img src=\"").concat(imageUrl, "\" alt=\"").concat(title, "\" class=\"rounded-t-xl h-96 w-full\">\n        <section class=\"p-3 h-fit w-full\">\n            <hgroup>\n                <h3 class=\"text-3xl\" id=\"game-title\">").concat(title, "</h3>\n                <h5 class=\"text-sm text-slate-500\" id=\"game-release-date\">").concat(releaseDate, "</h5>\n            </hgroup>\n            <div class=\"flex justify-between mt-1\">\n                <button class=\"text-sm text-blue-500\" id=\"game-").concat(id, "-details\" onclick=\"displayDetails(").concat(id, ");\">Details</button>\n                <section class=\"flex gap-3\">\n                    <select id=\"add-to-collection-for-").concat(userId, "\" class=\"text-black bg-[#1efe80] rounded\" onchange=\"activation(event.target.value)\">\n                        <option value=\"\" disabled selected>Add to</option>\n                        <option value=\"played\">Played</option>\n                        <option value=\"playing\">Playing</option>\n                        <option value=\"planned\">Planned</option>\n                    </select>\n                    <button id=\"game-").concat(id, "-save\" onclick=\"saveToCollection(").concat(id, ")\" class=\"bg-blue-400 p-1 px-2 rounded hover:bg-white hover:text-blue-600\">Save</button>\n                </section>\n            </div>\n        </section>\n    </div>\n    ");
    browseContainer === null || browseContainer === void 0 ? void 0 : browseContainer.insertAdjacentHTML('beforeend', gameItemTemplate);
}

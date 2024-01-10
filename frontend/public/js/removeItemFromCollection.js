var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function deleteGame(gameId) {
    return __awaiter(this, void 0, void 0, function () {
        var userId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getLoggedInUsersId()];
                case 1:
                    userId = _a.sent();
                    console.log(getActiveTabName(), gameId, userId);
                    fetch("http://localhost:3000/collections?status=".concat(getActiveTabName(), "&gameId=").concat(gameId, "&userId=").concat(userId), {
                        method: 'DELETE',
                        headers: {
                            'Content-type': 'application/json; charset-utf8',
                        },
                    })
                        .then(function (res) { return res.json(); })
                        .then(function (deletedGame) {
                        createPopUpMessage("Game removed successfully.");
                        var gameElement = document.getElementById("game-id-".concat(gameId));
                        if (gameElement) {
                            gameElement.remove();
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
}
function getLoggedInUsersId() {
    return __awaiter(this, void 0, void 0, function () {
        var response, userId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch('http://localhost:3000/users/whoami', {
                        headers: {
                            Authorization: localStorage.getItem('authToken'),
                        },
                    })];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 2:
                    userId = _a.sent();
                    return [2 /*return*/, userId];
            }
        });
    });
}
function getActiveTabName() {
    var _a, _b, _c;
    var tabListItems = [
        (_a = document.getElementById('played-tab')) === null || _a === void 0 ? void 0 : _a.parentElement,
        (_b = document.getElementById('playing-tab')) === null || _b === void 0 ? void 0 : _b.parentElement,
        (_c = document.getElementById('planned-tab')) === null || _c === void 0 ? void 0 : _c.parentElement,
    ].filter(Boolean); // Filter out null values and cast to HTMLElement array
    var activeTab;
    tabListItems.forEach(function (item) {
        var _a;
        if (item.classList.contains('text-[#1efe80]')) {
            activeTab = (_a = item.firstElementChild) === null || _a === void 0 ? void 0 : _a.innerHTML.trim().toUpperCase();
        }
    });
    return activeTab || '';
}
function createPopUpMessage(msg) {
    var modalHTML = "\n    <div class=\"fixed bottom-0 right-0 w-full duration-300 transition-all\" id=\"modalContainer\">\n        <div class=\"absolute bottom-2 duration-300 right-2 bg-green-200 p-4 px-8 rounded-3xl text-lg rounded-br-none shadow-lg transition-all text-green-950\" id=\"modalContent\">\n            <p>".concat(msg, "</p>\n        </div>\n    </div>\n    ");
    var newElement = document.createElement('div');
    newElement.innerHTML = modalHTML;
    document.body.appendChild(newElement);
    var modalContainer = document.getElementById('modalContainer');
    var modalContent = document.getElementById('modalContent');
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

// interface GameAttrs {
//     id: number;
//     title: string;
//     description: string;
//     genre: string;
//     platform: string;
//     releaseDate: string;
// }

// interface DisplayableGameAttrs {
//     id: number;
//     imgSrc: string;
//     title: string;
//     releaseDate: string;
// }
const APILINK =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&query=";
  const action: = document.getElementById("sort-by-action");
  const shooter = document.getElementById("sort-by-shooter");
  const Horror = document.getElementById("sort-by-horror");
  const Fighting = document.getElementById("sort-by-fighting");
  const Anime = document.getElementById("sort-by-anime");
  const RPG = document.getElementById("sort-by-rpg");
  const Strategy = document.getElementById("sort-by-strategy");
  const Racing = document.getElementById("sort-by-racing");
  const main = document.getElementById("browse-games-container");
  const Sport = document.getElementById("sort-by-sports");

import { insertGameItemToHTML } from "./displayAllGames";

fetch(APILINK)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((game) => {
      insertGameItemToHTML(game);
    });
  })
  .catch((error) => console.error("ERROR: ", error));

  
action.addEventListener("click", (e) => {
    e.preventDefault();
    main.innerHTML = "";
    game(SEARCHAPI + "Action");
  });
  Strategy.addEventListener("click", (e) => {
    e.preventDefault();
    main.innerHTML = "";
    game(SEARCHAPI + "Strategy");
  });
  Racing.addEventListener("click", (e) => {
    e.preventDefault();
    main.innerHTML = "";
    game(SEARCHAPI + "Racing");
  });
  RPG.addEventListener("click", (e) => {
    e.preventDefault();
    main.innerHTML = "";
    game(SEARCHAPI + "RPG");
  });
  Anime.addEventListener("click", (e) => {
    e.preventDefault();
    main.innerHTML = "";
    game(SEARCHAPI + "Anime");
  });
  Fighting.addEventListener("click", (e) => {
    e.preventDefault();
    main.innerHTML = "";
    game(SEARCHAPI + "Fighting");
  });
  Horror.addEventListener("click", (e) => {
    e.preventDefault();
    main.innerHTML = "";
    game(SEARCHAPI + "Horror");
  });
  shooter.addEventListener("click", (e) => {
    e.preventDefault();
    main.innerHTML = "";
    game(SEARCHAPI + "shooter");
  });
  
  Sport.addEventListener("click", (e) => {
    e.preventDefault();
    main.innerHTML = "";
    game(SEARCHAPI + "Sport");
  });


const APILINK =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&query=";

const action = document.getElementById("sort-by-action");
const shooter = document.getElementById("sort-by-shooter");
const Horror = document.getElementById("sort-by-horror");
const Fighting = document.getElementById("sort-by-fighting");
const Anime = document.getElementById("sort-by-anime");
const RPG = document.getElementById("sort-by-rpg");
const Strategy = document.getElementById("sort-by-strategy");
const Racing = document.getElementById("sort-by-racing");
const main = document.getElementById("browse-games-container");
const Sport = document.getElementById("sort-by-sports");

function game(link) {
  fetch(link)
    .then((games) => games.json())
    .then((data) => {
      for (let element of data.results) {
        const card = document.createElement("div");
        card.classList.add(
          "w-72",
          "m-5",
          "text-white",
          "ounded-xl",
          "bg-slate-900",
          "hover:-translate-y-3",
          "transition-all",
          "duration-300"
        );
        const image = document.createElement("img");
        image.src = IMG_PATH + element.poster_path;
        image.classList.add("rounded-t-xl");
        card.appendChild(image);
        const sec = document.createElement("section");
        sec.classList.add("p-3");
        const hgro = document.createElement("hgroup");
        const h3 = document.createElement("h3");
        h3.textContent = `${element.title}`;
        h3.classList.add("text-3xl");
        hgro.appendChild(h3);
        const h5 = document.createElement("h5");
        h5.textContent = `${element.release_date}`;
        h5.classList.add("text-sm", "text-slate-500");
        hgro.appendChild(h5);
        sec.appendChild(hgro);

        const flexed = document.createElement("div");
        flexed.classList.add("flex", "justify-between", "mt-1");
        const detail = document.createElement("button");
        detail.classList.add("text-sm", "text-bule-500");
        flexed.appendChild(detail);
        const another = document.createElement("section");
        another.classList.add("flex", "gap-3");
        const stat = document.createElement("select");
        stat.classList.add("text-black", "bg-[#1efe80]", "rounded");
        const addto = document.createElement("option");
        addto.value = "";
        addto.disabled = true;
        addto.selected = true;
        addto.innerText = "Add to";
        stat.appendChild(addto);
        const Played = document.createElement("option");
        Played.value = "Played";
        Played.innerText = "Played";
        stat.appendChild(Played);
        const Playing = document.createElement("option");
        Playing.value = "Playing";
        Playing.innerText = "Playing";
        stat.appendChild(Playing);
        const planned = document.createElement("option");
        planned.value = "Planned";
        planned.innerText = "Planned";
        stat.appendChild(planned);
        another.appendChild(stat);
        const button = document.createElement("button");
        button.classList.add(
          "bg-blue-400",
          "p-1",
          "px-2",
          "rounded",
          "hover:bg-white",
          "hover:text-blue-600"
        );
        button.innerText = "Save";
        another.appendChild(button);
        flexed.appendChild(another);
        sec.appendChild(flexed);
        card.appendChild(sec);
        main.appendChild(card);
      }
    });
}

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

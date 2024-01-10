"use strict";

const form = document.getElementById("signup-form");
const signInLink = document.getElementById("signin");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const Confirmpassword = document.getElementById("confirm-password").value;

  fetch(
    signInLink.innerHTML.toLowerCase() === "sign up"
      ? "http://localhost:3000/signin"
      : "http://localhost:3000/signup",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        Confirmpassword: Confirmpassword,
      }),
    }
  )
    .then((response) => {
      if (!response.ok) {
        creatPopUpMsg("UserName or Password incorrect");
        // window.location.href = 'profile.html';
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("authToken", `Bearer ${data}`);
      document.cookie = `user_token=${data};path=/`;
    })
    .then(() => {
      window.location.href = "home.html";
    });
});

const signUpTitle = document.getElementById("signup-title");
const submitButton = document.getElementById("submit-btn");
const alreadyHave = document.getElementById("already-have");

signInLink.addEventListener("click", () => {
  document.querySelector("body").classList.toggle("bg-slate-500");
  document.querySelector("body").classList.toggle("bg-slate-600");
  if (signInLink.innerHTML.toLowerCase() === "sign in") {
    signUpTitle.innerHTML = "Sign In to Your Account";
    submitButton.innerHTML = "Sign In";
    signInLink.innerHTML = "Sign Up";
    form.id = "signin-form";
  } else if (signInLink.innerHTML.toLowerCase() === "sign up") {
    signUpTitle.innerHTML = "Sign Up Now";
    submitButton.innerHTML = "Sign Up";
    signInLink.innerHTML = "Sign In";
    form.id = "signup-form";
  }
});

function creatPopUpMsg(msg) {
  const modalHTML = `
  <div class="fixed bottom-0 right-0 w-full duration-300 transition-all" id="modalContainer">
      <div class="absolute bottom-2 duration-300 right-2 bg-green-200 p-4 px-8 rounded-3xl text-lg rounded-br-none shadow-lg transition-all text-green-950" id="modalContent">
          <p>${msg}</p>
      </div>
  </div>
  `;
  const newElement = document.createElement("div");
  newElement.innerHTML = modalHTML;
  document.body.appendChild(newElement);
  const modalContainer = document.getElementById("modalContainer");
  const modalContent = document.getElementById("modalContent");

  if (modalContainer && modalContent) {
    setTimeout(function () {
      modalContainer.style.opacity = "1";
      modalContent.style.transform = "translate(-5%, -10%) scale(1)";
    }, 10);

    setTimeout(function () {
      modalContainer.style.opacity = "0";
      modalContent.style.transform = "translate(-5%, -10%) scale(0.5)";
      setTimeout(function () {
        document.body.removeChild(newElement);
      }, 300);
    }, 3000);
  }
}

"use strict";

// Select Element From DOM
const guessInput = document.getElementById("guess");
const guessResult = document.querySelector(".guess-result");
const scoreEl = document.querySelector(".score");
const highestScoreEl = document.querySelector(".highest-score");
const checkButton = document.querySelector(".check-btn");
const tryAgainButton = document.querySelector(".try-again-btn");
const toggleTheme = document.querySelector(".toggle-theme-btn");
const html = document.querySelector("html");
const themeIcon = document.querySelector(".toggle-theme-btn img");
const body = document.body;

// Event Handlers
const generateRandomNum = () => Math.floor(Math.random() * 20) + 1;
const updateScore = () => {
  scoreEl.textContent = score;
  if (score === 0) {
    guessResult.classList.add("lost");
    guessResult.textContent = "You lost the game";
    checkButton.textContent = "New Game";
  }
};

const updateHighestScore = (t) => {
  if (t === 0) {
    highestScoreEl.textContent = 0;
  } else {
    if (score > highestScore) {
      highestScoreEl.textContent = score;
    }
  }
};

const newGame = () => {
  if (html.classList.contains("dark")) {
    body.style.backgroundColor = "#333333";
  } else {
    body.style.backgroundColor = "#eee";
  }
  checkButton.textContent = "Check";
  guessInput.value = "";
  score = 20;
  updateScore();
  guessResult.textContent = "Enter a guess";
  guessResult.classList.remove("correct");
  guessResult.classList.remove("lost");

  randomNumber = generateRandomNum();
};

const tryAgain = () => {
  newGame();
  highestScore = 0;
  updateHighestScore(0);
};

const changeTheme = () => {
  html.classList.toggle("dark");
  if (themeIcon.getAttribute("src") === "./icon/dark.svg") {
    themeIcon.setAttribute("src", "./icon/light.svg");
    body.style.backgroundColor = "#333333";
  } else {
    themeIcon.setAttribute("src", "./icon/dark.svg");
    body.style.backgroundColor = "#eee";
  }
};
const checkGuess = (e) => {
  if (e.target.textContent === "New Game") {
    newGame();
  } else {
    const guess = Number(guessInput.value);
    if (guess && score > 0) {
      score--;
      guessResult.classList.remove("changed");
      void guessResult.offsetWidth;
      if (guess > randomNumber) {
        guessResult.textContent = "Too High";
        updateScore();
      } else if (guess < randomNumber) {
        guessResult.textContent = "Too Low";
        updateScore();
      } else {
        guessResult.textContent = "Correct Number";
        guessResult.classList.add("correct");
        checkButton.textContent = "New Game";
        updateScore();
        updateHighestScore();
        body.style.backgroundColor = "#00ced1";
      }
      guessResult.classList.add("changed");
    } else {
      guessResult.textContent = "No Number";
    }
  }
};

// Listen To Events
checkButton.addEventListener("click", checkGuess);
tryAgainButton.addEventListener("click", tryAgain);
toggleTheme.addEventListener("click", changeTheme);

// Global Variables
let score = 20;
let highestScore = 0;
let randomNumber = generateRandomNum();

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
// Event Handlers

const generateRandomNum = () => Math.floor(Math.random() * 20) + 1;
const updateScore = () => {
  scoreEl.textContent = score;
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
  checkButton.textContent = "Check";
  guessInput.value = "";
  score = 20;
  updateScore();
  guessResult.textContent = "Enter a guess";
  guessResult.classList.remove("correct");
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
  } else {
    themeIcon.setAttribute("src", "./icon/dark.svg");
  }
};
// Listen To Events

checkButton.addEventListener("click", (e) => {
  if (e.target.textContent === "New Game") {
    newGame();
  } else {
    const guess = Number(guessInput.value);
    if (!Number.isNaN(guess) && guess !== 0) {
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
        updateHighestScore();
      }
      guessResult.classList.add("changed");
    }
  }
});

tryAgainButton.addEventListener("click", tryAgain);

toggleTheme.addEventListener("click", changeTheme);
// Global Variables
let score = 20;
let highestScore = 0;
let randomNumber = generateRandomNum();

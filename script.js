const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
const words = [
  "ground",
  "abounding",
  "redundant",
  "scream",
  "faulty",
  "wrap",
  "throat",
  "ship",
  "remarkable",
  "rail",
  "green",
  "class",
  "pedal",
  "loud",
  "relieved",
  "ahead",
  "passenger",
  "successful",
  "comb",
  "crib",
];

// Init
let randomWord;
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
let score = 0;
let time = 10;

// Switch difficulty in settings
difficultySelect.value = difficulty;

// generate random word from array
const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

// Focus on text on load
text.focus();

// add random word to DOM
const addWordToDOM = () => {
  randomWord = getRandomWord();
  word.innerText = randomWord;
};

addWordToDOM();

// Game over
const gameOver = () => {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = "flex";
};

// Update time function
const updateTime = () => {
  time--;
  timeEl.innerText = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
};

// Start countdown
const timeInterval = setInterval(updateTime, 1000);

// Update score
const updateScore = () => {
  score++;
  scoreEl.innerText = score;
};

// Check user input
const checkInput = (e) => {
  if (e.target.value === randomWord) {
    text.value = "";
    addWordToDOM();
    updateScore();
    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }
    updateTime();
  }
};

// Event Listeners
text.addEventListener("input", checkInput);
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

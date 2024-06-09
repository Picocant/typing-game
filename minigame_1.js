const sequenceDisplay = document.getElementById("sequence");
const timerDisplay = document.getElementById("timer");
const inputSequence = document.getElementById("input-sequence");
const startButton = document.getElementById("start-button");
const messageDisplay = document.getElementById("message");

//mengatur kecepatan timer
let sequence = "";
let timeLimit = 10;
let timer;
let isPlaying = false;

//isi karakter
function generateSequence(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

function startGame() {
  if (isPlaying) return;
  isPlaying = true;
  sequence = generateSequence(10); //output
  sequenceDisplay.textContent = sequence;
  inputSequence.value = "";
  inputSequence.disabled = false;
  inputSequence.focus();
  messageDisplay.textContent = "";
  startButton.disabled = true;
  startTimer();
}

function startTimer() {
  let timeLeft = timeLimit;
  timerDisplay.textContent = `Time: ${timeLeft}`;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame(false);
    }
  }, 1000);
}

function resetGame() {
  sequenceDisplay.textContent = "";
  timerDisplay.textContent = "";
  messageDisplay.textContent = "";
  inputSequence.value = "";
  isPlaying = false;
  startButton.disabled = false;
}

function endGame(success) {
  isPlaying = false;
  inputSequence.disabled = true;
  startButton.disabled = false;
  if (success) {
    messageDisplay.textContent = "ANDA BENAR!";
    messageDisplay.style.color = "#0f0";

    setTimeout(() => {
      resetGame();
      startGame();
    }, 3000); //timer loop
  } else {
    messageDisplay.textContent = `Iniloh yang benar : ${sequence}`;
    messageDisplay.style.color = "#f00";
  }
}

inputSequence.addEventListener("input", () => {
  if (inputSequence.value.toUpperCase() === sequence) {
    clearInterval(timer);
    endGame(true);
  }
});

startButton.addEventListener("click", startGame);

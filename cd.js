let timeLeft = 15;
let clickCount = 0;
let gameOver = false;
let timer;

const timerElement = document.getElementById("timer");
const clickCountElement = document.getElementById("click-count");
const messageElement = document.getElementById("message");
const clickButton = document.getElementById("click-btn");
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");

function startGame() {
  clickCount = 0;
  timeLeft = 15;
  gameOver = false;
  clickCountElement.textContent = clickCount;
  messageElement.textContent = "";
  clickButton.disabled = false;
  startButton.disabled = true;
  restartButton.style.display = "none";
  timerElement.classList.remove("timer-warning");

  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft <= 5) {
      timerElement.classList.add("timer-warning");
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function endGame() {
  gameOver = true;
  clickButton.disabled = true;
  startButton.disabled = false;
  restartButton.style.display = "inline-block";

  if (clickCount >= 50) {
    messageElement.textContent = `🎉 Great job, Hajra! You Win! (${clickCount} clicks)`;
    messageElement.style.color = "green";
    confettiEffect();
  } else {
    messageElement.textContent = `❌ Oops Hajra! You Lose! Only ${clickCount} clicks 😅`;
    messageElement.style.color = "red";
  }
}

function restartGame() {
  clearInterval(timer);
  startButton.disabled = false;
  restartButton.style.display = "none";
  clickCount = 0;
  timeLeft = 15;
  timerElement.textContent = timeLeft;
  clickCountElement.textContent = clickCount;
  messageElement.textContent = "";
  timerElement.classList.remove("timer-warning");
}

clickButton.addEventListener("click", () => {
  if (!gameOver) {
    clickCount++;
    clickCountElement.textContent = clickCount;

    // Small bounce animation
    clickButton.style.transform = "scale(1.2)";
    setTimeout(() => {
      clickButton.style.transform = "scale(1)";
    }, 100);
  }
});

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);

function confettiEffect() {
  var duration = 2 * 1000;
  var end = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

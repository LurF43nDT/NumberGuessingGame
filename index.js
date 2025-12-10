const minNum = 1;
const maxNum = 100;

const guessForm = document.getElementById("guessForm");
const guessInput = document.getElementById("guessInput");
const messageEl = document.getElementById("message");
const attemptsEl = document.getElementById("attempts");
const rangeHintEl = document.getElementById("rangeHint");
const resetBtn = document.getElementById("resetBtn");
const videoContainer = document.getElementById("videoContainer");
const winVideo = document.getElementById("winVideo");

let answer = getRandomNumber();
let attempts = 0;
let minHint = minNum;
let maxHint = maxNum;

function getRandomNumber() {
    return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

function updateUI(text, intent = "neutral") {
    messageEl.textContent = text;
    messageEl.dataset.intent = intent;
    attemptsEl.textContent = `Attempts: ${attempts}`;
    rangeHintEl.textContent = `Range: ${minHint} - ${maxHint}`;
}

function handleGuess(event) {
    event.preventDefault();
    const value = Number(guessInput.value.trim());

    if (Number.isNaN(value)) {
        updateUI("Please enter a valid number.", "warn");
        return;
    }

    if (value < minNum || value > maxNum) {
        updateUI(`Pick between ${minNum} and ${maxNum}.`, "warn");
        return;
    }

    attempts += 1;

    if (value === answer) {
        updateUI(`Correct! The number was ${answer}. Attempts: ${attempts}`, "success");
        videoContainer.classList.remove("hidden");
        winVideo.scrollIntoView({ behavior: "smooth", block: "center" });
        winVideo.play().catch((error) => console.error("Error playing the video:", error));
        guessInput.disabled = true;
        guessForm.querySelector("button[type='submit']").disabled = true;
        return;
    }

    if (value < answer) {
        minHint = Math.max(minHint, value + 1);
        updateUI("Too low! Try a higher number.", "info");
    } else {
        maxHint = Math.min(maxHint, value - 1);
        updateUI("Too high! Try a lower number.", "info");
    }

    guessInput.value = "";
    guessInput.focus();
}

function resetGame() {
    answer = getRandomNumber();
    attempts = 0;
    minHint = minNum;
    maxHint = maxNum;
    guessInput.disabled = false;
    guessForm.querySelector("button[type='submit']").disabled = false;
    guessInput.value = "";
    videoContainer.classList.add("hidden");
    winVideo.pause();
    winVideo.currentTime = 0;
    updateUI("New game started. Good luck!");
    guessInput.focus();
}

updateUI("Start guessing to get feedback.");
guessForm.addEventListener("submit", handleGuess);
resetBtn.addEventListener("click", resetGame);
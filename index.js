const VALID_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const VALID_NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8"];
const ANSWER = "F8";

const guessForm = document.getElementById("guessForm");
const guessInput = document.getElementById("guessInput");
const messageEl = document.getElementById("message");
const attemptsEl = document.getElementById("attempts");
const rangeHintEl = document.getElementById("rangeHint");
const resetBtn = document.getElementById("resetBtn");
const videoContainer = document.getElementById("videoContainer");
const winVideo = document.getElementById("winVideo");

let attempts = 0;

function updateUI(text, intent = "neutral") {
    messageEl.textContent = text;
    messageEl.dataset.intent = intent;
    attemptsEl.textContent = `Attempts: ${attempts}`;
    rangeHintEl.textContent = "Valid: A-H followed by 1-8";
}

function handleGuess(event) {
    event.preventDefault();
    const raw = guessInput.value.trim().toUpperCase();

    if (!/^[A-H][1-8]$/.test(raw)) {
        updateUI("Use a letter A-H followed by a number 1-8 (e.g., F8).", "warn");
        return;
    }

    const letter = raw[0];
    const num = raw[1];

    attempts += 1;

    if (raw === ANSWER) {
        updateUI(`Correct! The code was ${ANSWER}. Attempts: ${attempts}`, "success");
        videoContainer.classList.remove("hidden");
        winVideo.scrollIntoView({ behavior: "smooth", block: "center" });
        winVideo.play().catch((error) => console.error("Error playing the video:", error));
        guessInput.disabled = true;
        guessForm.querySelector("button[type='submit']").disabled = true;
        return;
    }

    const targetLetter = ANSWER[0];
    const targetNum = ANSWER[1];

    let letterHint = "";
    if (letter < targetLetter) {
        letterHint = "Try a later letter.";
    } else if (letter > targetLetter) {
        letterHint = "Try an earlier letter.";
    }

    let numberHint = "";
    if (Number(num) < Number(targetNum)) {
        numberHint = "Number is higher.";
    } else if (Number(num) > Number(targetNum)) {
        numberHint = "Number is lower.";
    }

    const hint = [letterHint, numberHint].filter(Boolean).join(" ");
    updateUI(`Not quite. ${hint || "Adjust both letter and number."}`, "info");

    guessInput.value = "";
    guessInput.focus();
}

function resetGame() {
    attempts = 0;
    guessInput.disabled = false;
    guessForm.querySelector("button[type='submit']").disabled = false;
    guessInput.value = "";
    videoContainer.classList.add("hidden");
    winVideo.pause();
    winVideo.currentTime = 0;
    updateUI("New game started. Guess the code (A-H + 1-8).");
    guessInput.focus();
}

updateUI("Start guessing to get feedback.");
guessForm.addEventListener("submit", handleGuess);
resetBtn.addEventListener("click", resetGame);
const VALID_LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const VALID_NUMBERS = ["1", "2", "3", "4", "5", "6", "7", "8"];
const ANSWER = "F8"; // secret cell

const gridEl = document.getElementById("grid");
const messageEl = document.getElementById("message");
const attemptsEl = document.getElementById("attempts");
const rangeHintEl = document.getElementById("rangeHint");
const resetBtn = document.getElementById("resetBtn");
const videoContainer = document.getElementById("videoContainer");
const winVideo = document.getElementById("winVideo");

let attempts = 0;
const guessed = new Set();
const cellMap = new Map();

function updateUI(text, intent = "neutral") {
    messageEl.textContent = text;
    messageEl.dataset.intent = intent;
    attemptsEl.textContent = `Attempts: ${attempts}`;
    rangeHintEl.textContent = "Valid: A-H followed by 1-8";
}

function buildGrid() {
    gridEl.innerHTML = "";
    cellMap.clear();

    VALID_LETTERS.forEach((letter) => {
        VALID_NUMBERS.forEach((num) => {
            const code = `${letter}${num}`;
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "cell";
            btn.textContent = code;
            btn.dataset.code = code;
            btn.addEventListener("click", () => handleGuess(code));
            gridEl.appendChild(btn);
            cellMap.set(code, btn);
        });
    });
}

function handleGuess(code) {
    if (guessed.has(code)) {
        updateUI(`You already tried ${code}. Pick another cell.`, "warn");
        return;
    }

    guessed.add(code);
    attempts += 1;

    const btn = cellMap.get(code);

    if (code === ANSWER) {
        btn.classList.add("hit");
        updateUI(`Correct! The cell was ${ANSWER}. Attempts: ${attempts}`, "success");
        videoContainer.classList.remove("hidden");
        winVideo.scrollIntoView({ behavior: "smooth", block: "center" });
        winVideo.play().catch((error) => console.error("Error playing the video:", error));
        disableGrid();
        return;
    }

    btn.classList.add("miss");
    const hint = getHint(code);
    updateUI(`Not quite. ${hint}`, "info");
}

function getHint(code) {
    const letter = code[0];
    const num = Number(code[1]);
    const targetLetter = ANSWER[0];
    const targetNum = Number(ANSWER[1]);

    let letterHint = "";
    if (letter < targetLetter) {
        letterHint = "Try a later letter (downwards).";
    } else if (letter > targetLetter) {
        letterHint = "Try an earlier letter (upwards).";
    }

    let numberHint = "";
    if (num < targetNum) {
        numberHint = "Number is higher (move right).";
    } else if (num > targetNum) {
        numberHint = "Number is lower (move left).";
    }

    return [letterHint, numberHint].filter(Boolean).join(" ");
}

function disableGrid() {
    cellMap.forEach((btn) => {
        btn.classList.add("disabled");
        btn.disabled = true;
    });
}

function resetGame() {
    attempts = 0;
    guessed.clear();
    videoContainer.classList.add("hidden");
    winVideo.pause();
    winVideo.currentTime = 0;
    buildGrid();
    updateUI("New game started. Click a cell to guess.");
}

buildGrid();
updateUI("Start guessing to get feedback.");
resetBtn.addEventListener("click", resetGame);
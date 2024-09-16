// Define the range and generate a random answer
const minNum = 1;
const maxNum = 100;
const answer = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;

let attempts = 0;
let guess;
let running = true;

// Main game loop
while (running) {
    // Get user's guess
    guess = window.prompt(`Guess a number between ${minNum} and ${maxNum}`);
    guess = Number(guess);

    // Check if the input is a valid number
    if (isNaN(guess)) {
        window.alert("Please enter a valid number!");
    }
    // Check if the guess is within the valid range
    else if (guess < minNum || guess > maxNum) {
        window.alert(`Please enter a number between ${minNum} and ${maxNum}`);
    }
    else {
        attempts++; // Increment attempt counter

        // Check if the guess is too low
        if (guess < answer) {
            window.alert("Too low! Try again.");
        }
        // Check if the guess is too high
        else if (guess > answer) {
            window.alert("Too high! Try again.");
        }
        // Correct guess
        else {
            window.alert(`Correct! The answer was ${answer}. It took you ${attempts} attempts.`);
            running = false; // End the game loop
        }
    }
}

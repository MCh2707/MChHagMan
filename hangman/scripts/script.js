const wordList = [
    {
        word: "Cat",
        hint: "A small animal that says 'meow.'"
    },

    {
        word: "Lantern",
        hint: "A portable light source."
    },

    {
        word: "Library",
        hint: "A place where books are kept."
    },
    {
        word: "Kingdom",
        hint: "A territory ruled by a king or queen."
    },
    {
        word: "Capture",
        hint: "To take control of something or someone."
    },
    {
        word: "Daughter",
        hint: "A female child of parents."
    },
    {
        word: "Pyramid",
        hint: "A geometric shape with a square base and triangular sides."
    },
    {
        word: "Elephant",
        hint: "A large mammal with big ears and a trunk."
    },
    {
        word: "President",
        hint: "The leader of a country or organization."
    },
    {
        word: "Computer",
        hint: "A device used for processing data."
    },
    {
        word: "Mystery",
        hint: "Something that is difficult to understand or explain."
    },
    {
        word: "Flight",
        hint: "The act of flying through the air."
    },
    {
        word: "Medicine",
        hint: "A substance used to treat illness or injury."
    }
];


const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
let currentWord, wrongGuessCount = 0;
const maxGuesses = 6;
let guessedLetters = [];

const getRandomWord = () => {
   
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word.toLowerCase();
    guessedLetters = []; 

    
    document.querySelector(".hint-text").innerText = hint;

    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>` ).join("");
    
    const buttons = keyboardDiv.querySelectorAll("button");
    buttons.forEach(button => {
        button.disabled = false; 
        button.classList.remove("guessed");
    });
}

const gameModal = document.querySelector(".game-modal");
const modalContent = document.querySelector(".game-modal .content");
const playAgainButton = document.querySelector(".game-modal .play-again");

// ფუნქცია, რომელიც აჩვენებს თამაშის დასრულების ფანჯარას
const gameOver = (isVictory) => {
    gameModal.style.display = "flex";
    modalContent.innerHTML = `
        <img src="images/${isVictory ? "victory.gif" : "lost.gif"}" alt="${isVictory ? "Victory" : "Game Over"}">
        <h4>${isVictory ? "Victory!" : "Game Over"}</h4>
        <p>${isVictory ? "Congratulations! You guessed the word!" : `The correct word was: <b>${currentWord}</b>`}</p>
        <button class="play-again">Play Again</button>
    `;

    const newPlayAgainButton = document.querySelector(".game-modal .play-again");
    newPlayAgainButton.addEventListener("click", () => {
        gameModal.style.display = "none";
        wrongGuessCount = 0;
        hangmanImage.src = "images/hangman-0.svg";
        guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
        getRandomWord();
    });
};

// ფუნქციის განახლება თამაშის ლოგიკისთვის
const initGame = (button, clickedLetter) => {
    button.disabled = true; 
    button.classList.add("guessed"); 

    if (currentWord.includes(clickedLetter)) {
        [...currentWord].forEach((letter, index) => {
            if (letter === clickedLetter) {
                wordDisplay.querySelectorAll("li")[index].innerText = letter; 
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed"); 
            }
        });

        // შეამოწმე, თუ ყველა ასო სწორად არის შევსებული
        const allGuessed = [...wordDisplay.querySelectorAll("li")]
            .every(li => li.classList.contains("guessed"));
        if (allGuessed) return gameOver(true);
        
    } else {
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }

    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    if (wrongGuessCount === maxGuesses) return gameOver(false);
};

for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);

    button.addEventListener("click", e => {
        initGame(e.target, e.target.innerText.toLowerCase()); 
    });
}


getRandomWord();



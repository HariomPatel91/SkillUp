const gameBoard =
    document.getElementById("gameBoard");

const movesElement =
    document.getElementById("moves");

const matchesElement =
    document.getElementById("matches");

const timeElement =
    document.getElementById("time");

const restartBtn =
    document.getElementById("restartBtn");

const winMessage =
    document.getElementById("winMessage");

const finalStats =
    document.getElementById("finalStats");

const playAgainBtn =
    document.getElementById("playAgainBtn");


// ==========================================
// GAME VARIABLES
// ==========================================

const emojis = [
    "🍎",
    "🍌",
    "🍇",
    "🍉",
    "🍓",
    "🍊",
    "🥝",
    "🍍"
];

let cards = [];

let firstCard = null;

let secondCard = null;

let lockBoard = false;

let moves = 0;

let matches = 0;

let time = 0;

let timer = null;

let gameStarted = false;


// ==========================================
// START GAME
// ==========================================

function startGame() {

    clearInterval(timer);

    moves = 0;

    matches = 0;

    time = 0;

    firstCard = null;

    secondCard = null;

    lockBoard = false;

    gameStarted = false;


    movesElement.textContent = "0";

    matchesElement.textContent = "0";

    timeElement.textContent = "0s";


    winMessage.classList.add("hidden");


    createCards();
}


// ==========================================
// CREATE CARDS
// ==========================================

function createCards() {

    gameBoard.innerHTML = "";


    cards = [
        ...emojis,
        ...emojis
    ];


    shuffleCards();


    cards.forEach(function(emoji, index) {

        const card =
            document.createElement("button");

        card.classList.add("card");

        card.dataset.index = index;

        card.innerHTML = `

            <div class="card-back">
                ?
            </div>

            <div class="card-front">
                ${emoji}
            </div>

        `;


        card.addEventListener(
            "click",
            flipCard
        );


        gameBoard.appendChild(card);
    });
}


// ==========================================
// SHUFFLE
// ==========================================

function shuffleCards() {

    for (
        let i = cards.length - 1;
        i > 0;
        i--
    ) {

        const randomIndex =
            Math.floor(
                Math.random() * (i + 1)
            );


        [
            cards[i],
            cards[randomIndex]
        ] =
        [
            cards[randomIndex],
            cards[i]
        ];
    }
}


// ==========================================
// FLIP CARD
// ==========================================

function flipCard(event) {

    if (lockBoard) {
        return;
    }


    const card =
        event.currentTarget;


    if (
        card === firstCard ||
        card.classList.contains("matched")
    ) {
        return;
    }


    // Start timer on first move
    if (!gameStarted) {

        gameStarted = true;

        startTimer();
    }


    card.classList.add("flipped");


    if (!firstCard) {

        firstCard = card;

        return;
    }


    secondCard = card;


    moves++;

    movesElement.textContent =
        moves;


    checkMatch();
}


// ==========================================
// CHECK MATCH
// ==========================================

function checkMatch() {

    const firstIndex =
        Number(firstCard.dataset.index);

    const secondIndex =
        Number(secondCard.dataset.index);


    const firstEmoji =
        cards[firstIndex];

    const secondEmoji =
        cards[secondIndex];


    if (
        firstEmoji === secondEmoji
    ) {

        handleMatch();

    } else {

        handleMismatch();
    }
}


// ==========================================
// MATCH
// ==========================================

function handleMatch() {

    firstCard.classList.add(
        "matched"
    );

    secondCard.classList.add(
        "matched"
    );


    matches++;

    matchesElement.textContent =
        matches;


    resetCards();


    // All pairs matched
    if (matches === emojis.length) {

        finishGame();
    }
}


// ==========================================
// MISMATCH
// ==========================================

function handleMismatch() {

    lockBoard = true;


    setTimeout(function() {

        firstCard.classList.remove(
            "flipped"
        );

        secondCard.classList.remove(
            "flipped"
        );


        resetCards();

    }, 800);
}


// ==========================================
// RESET CARDS
// ==========================================

function resetCards() {

    firstCard = null;

    secondCard = null;

    lockBoard = false;
}


// ==========================================
// TIMER
// ==========================================

function startTimer() {

    timer = setInterval(function() {

        time++;

        timeElement.textContent =
            `${time}s`;

    }, 1000);
}


// ==========================================
// FINISH GAME
// ==========================================

function finishGame() {

    clearInterval(timer);

    gameStarted = false;


    setTimeout(function() {

        finalStats.textContent =
            `You completed the game in ${moves} moves and ${time} seconds!`;


        winMessage.classList.remove(
            "hidden"
        );

    }, 500);
}


// ==========================================
// RESTART
// ==========================================

restartBtn.addEventListener(
    "click",
    startGame
);


// ==========================================
// PLAY AGAIN
// ==========================================

playAgainBtn.addEventListener(
    "click",
    startGame
);


// ==========================================
// START
// ==========================================

startGame();
const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

const xScoreElement = document.getElementById("xScore");
const oScoreElement = document.getElementById("oScore");
const drawScoreElement = document.getElementById("drawScore");

const startMenu = document.getElementById("startMenu");
const gameContainer = document.getElementById("gameContainer");

const computerBtn = document.getElementById("computerBtn");
const twoPlayerBtn = document.getElementById("twoPlayerBtn");
const menuBtn = document.getElementById("menuBtn");

const difficultyMenu = document.getElementById("difficultyMenu");

const easyBtn = document.getElementById("easyBtn");
const mediumBtn = document.getElementById("mediumBtn");
const hardBtn = document.getElementById("hardBtn");
const backBtn = document.getElementById("backBtn");


let currentPlayer = "X";

let gameActive = true;

let vsComputer = false;

let difficulty = "easy";

let board = [
    "", "", "",
    "", "", "",
    "", ""
];


let xScore = 0;
let oScore = 0;
let drawScore = 0;


// ==========================================
// WINNING PATTERNS
// ==========================================

const winningPatterns = [

    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonal
    [0, 4, 8],
    [2, 4, 6]
];


// ==========================================
// CELL CLICK
// ==========================================

function handleCellClick(event) {

    const index =
        Number(event.target.dataset.index);


    if (!gameActive) {
        return;
    }


    if (board[index] !== "") {
        return;
    }


    // Computer mode me sirf X player click karega
    if (
        vsComputer &&
        currentPlayer !== "X"
    ) {
        return;
    }


    makeMove(index, currentPlayer);


    if (!gameActive) {
        return;
    }


    currentPlayer =
        currentPlayer === "X"
            ? "O"
            : "X";


    // Computer turn
    if (
        vsComputer &&
        currentPlayer === "O"
    ) {

        statusText.textContent =
            "🤖 Computer is thinking...";


        setTimeout(
            computerMove,
            500
        );

    } else {

        statusText.textContent =
            `Player ${currentPlayer}'s Turn`;
    }
}


// ==========================================
// MAKE MOVE
// ==========================================

function makeMove(index, player) {

    board[index] = player;

    cells[index].textContent = player;

    checkWinner();
}


// ==========================================
// COMPUTER MOVE
// ==========================================

function computerMove() {

    if (!gameActive) {
        return;
    }


    let move = -1;


    // ======================================
    // EASY
    // ======================================

    if (difficulty === "easy") {

        move = randomMove();
    }


    // ======================================
    // MEDIUM
    // ======================================

    else if (difficulty === "medium") {

        // Computer win
        move = findWinningMove("O");


        // Block player
        if (move === -1) {

            move =
                findWinningMove("X");
        }


        // Random move
        if (move === -1) {

            move = randomMove();
        }
    }


    // ======================================
    // HARD
    // ======================================

    else if (difficulty === "hard") {

        move = findWinningMove("O");


        // Block player
        if (move === -1) {

            move =
                findWinningMove("X");
        }


        // Center
        if (
            move === -1 &&
            board[4] === ""
        ) {

            move = 4;
        }


        // Corner
        if (move === -1) {

            const corners =
                [0, 2, 6, 8];


            const availableCorners =
                corners.filter(
                    index =>
                        board[index] === ""
                );


            if (
                availableCorners.length > 0
            ) {

                move =
                    availableCorners[
                        Math.floor(
                            Math.random() *
                            availableCorners.length
                        )
                    ];
            }
        }


        // Any empty cell
        if (move === -1) {

            move = randomMove();
        }
    }


    // ======================================
    // MAKE COMPUTER MOVE
    // ======================================

    if (move !== -1) {

        makeMove(move, "O");


        if (!gameActive) {
            return;
        }


        currentPlayer = "X";


        statusText.textContent =
            "Your Turn (X)";
    }
}


// ==========================================
// RANDOM MOVE
// ==========================================

function randomMove() {

    const emptyCells = [];


    for (
        let i = 0;
        i < board.length;
        i++
    ) {

        if (board[i] === "") {

            emptyCells.push(i);
        }
    }


    if (
        emptyCells.length === 0
    ) {

        return -1;
    }


    return emptyCells[
        Math.floor(
            Math.random() *
            emptyCells.length
        )
    ];
}


// ==========================================
// FIND WINNING MOVE
// ==========================================

function findWinningMove(player) {

    for (
        let pattern of winningPatterns
    ) {

        const a = pattern[0];

        const b = pattern[1];

        const c = pattern[2];


        const values = [

            board[a],

            board[b],

            board[c]
        ];


        if (
            values.filter(
                value =>
                    value === player
            ).length === 2
            &&
            values.includes("")
        ) {

            if (
                board[a] === ""
            ) {

                return a;
            }


            if (
                board[b] === ""
            ) {

                return b;
            }


            if (
                board[c] === ""
            ) {

                return c;
            }
        }
    }


    return -1;
}


// ==========================================
// CHECK WINNER
// ==========================================

function checkWinner() {

    for (
        let pattern of winningPatterns
    ) {

        const a = pattern[0];

        const b = pattern[1];

        const c = pattern[2];


        if (
            board[a] !== ""
            &&
            board[a] === board[b]
            &&
            board[a] === board[c]
        ) {

            const winner =
                board[a];


            gameActive = false;


            // =================================
            // WIN MESSAGE
            // =================================

            if (vsComputer) {

                if (
                    winner === "X"
                ) {

                    statusText.textContent =
                        "🎉 You Win!";

                } else {

                    statusText.textContent =
                        "🤖 Computer Wins!";
                }

            } else {

                statusText.textContent =
                    `🎉 Player ${winner} Wins!`;
            }


            // =================================
            // SCORE
            // =================================

            if (
                winner === "X"
            ) {

                xScore++;

                xScoreElement.textContent =
                    xScore;

            } else {

                oScore++;

                oScoreElement.textContent =
                    oScore;
            }


            // =================================
            // WINNING CELLS
            // =================================

            cells[a].classList.add("win");

            cells[b].classList.add("win");

            cells[c].classList.add("win");


            return;
        }
    }


    // ======================================
    // DRAW
    // ======================================

    if (
        !board.includes("")
    ) {

        statusText.textContent =
            "🤝 It's a Draw!";


        gameActive = false;


        drawScore++;


        drawScoreElement.textContent =
            drawScore;


        return;
    }
}


// ==========================================
// RESTART GAME
// ==========================================

function restartGame() {

    currentPlayer = "X";

    gameActive = true;


    board = [

        "", "", "",

        "", "", "",

        "", "", ""
    ];


    cells.forEach(
        function(cell) {

            cell.textContent = "";

            cell.classList.remove(
                "win"
            );
        }
    );


    if (vsComputer) {

        statusText.textContent =
            "Your Turn (X)";

    } else {

        statusText.textContent =
            "Player X's Turn";
    }
}


// ==========================================
// PLAY VS COMPUTER
// ==========================================

computerBtn.addEventListener(
    "click",
    function() {

        // Hide main buttons
        computerBtn.classList.add(
            "hidden"
        );

        twoPlayerBtn.classList.add(
            "hidden"
        );


        // Show difficulty
        difficultyMenu.classList.remove(
            "hidden"
        );
    }
);


// ==========================================
// EASY
// ==========================================

easyBtn.addEventListener(
    "click",
    function() {

        difficulty = "easy";

        startComputerGame();
    }
);


// ==========================================
// MEDIUM
// ==========================================

mediumBtn.addEventListener(
    "click",
    function() {

        difficulty = "medium";

        startComputerGame();
    }
);


// ==========================================
// HARD
// ==========================================

hardBtn.addEventListener(
    "click",
    function() {

        difficulty = "hard";

        startComputerGame();
    }
);


// ==========================================
// START COMPUTER GAME
// ==========================================

function startComputerGame() {

    vsComputer = true;


    startMenu.classList.add(
        "hidden"
    );


    difficultyMenu.classList.add(
        "hidden"
    );


    gameContainer.classList.remove(
        "hidden"
    );


    restartGame();
}


// ==========================================
// BACK BUTTON
// ==========================================

backBtn.addEventListener(
    "click",
    function() {

        difficultyMenu.classList.add(
            "hidden"
        );


        computerBtn.classList.remove(
            "hidden"
        );


        twoPlayerBtn.classList.remove(
            "hidden"
        );
    }
);


// ==========================================
// PLAY 2 PLAYERS
// ==========================================

twoPlayerBtn.addEventListener(
    "click",
    function() {

        vsComputer = false;


        startMenu.classList.add(
            "hidden"
        );


        gameContainer.classList.remove(
            "hidden"
        );


        restartGame();
    }
);


// ==========================================
// MAIN MENU
// ==========================================

menuBtn.addEventListener(
    "click",
    function() {

        gameContainer.classList.add(
            "hidden"
        );


        startMenu.classList.remove(
            "hidden"
        );


        // Reset menu
        difficultyMenu.classList.add(
            "hidden"
        );


        computerBtn.classList.remove(
            "hidden"
        );


        twoPlayerBtn.classList.remove(
            "hidden"
        );
    }
);


// ==========================================
// RESTART BUTTON
// ==========================================

restartBtn.addEventListener(
    "click",
    restartGame
);


// ==========================================
// CELL EVENTS
// ==========================================

cells.forEach(
    function(cell) {

        cell.addEventListener(
            "click",
            handleCellClick
        );
    }
);
const gameBoard =
    document.getElementById("gameBoard");

const scoreElement =
    document.getElementById("score");

const bestScoreElement =
    document.getElementById("bestScore");

const restartBtn =
    document.getElementById("restartBtn");

const gameOver =
    document.getElementById("gameOver");

const finalScore =
    document.getElementById("finalScore");

const playAgainBtn =
    document.getElementById("playAgainBtn");


const upBtn =
    document.getElementById("upBtn");

const downBtn =
    document.getElementById("downBtn");

const leftBtn =
    document.getElementById("leftBtn");

const rightBtn =
    document.getElementById("rightBtn");


// ==========================================
// GAME VARIABLES
// ==========================================

let board = [];

let score = 0;

let bestScore =
    Number(
        localStorage.getItem(
            "numberRushBest"
        )
    ) || 0;


bestScoreElement.textContent =
    bestScore;


// ==========================================
// START GAME
// ==========================================

function startGame() {

    board = [

        0, 0, 0, 0,

        0, 0, 0, 0,

        0, 0, 0, 0,

        0, 0, 0, 0

    ];


    score = 0;


    scoreElement.textContent =
        score;


    gameOver.classList.add(
        "hidden"
    );


    addRandomTile();

    addRandomTile();

    updateBoard();
}


// ==========================================
// ADD RANDOM TILE
// ==========================================

function addRandomTile() {

    const emptyCells = [];


    for (
        let i = 0;
        i < board.length;
        i++
    ) {

        if (board[i] === 0) {

            emptyCells.push(i);
        }
    }


    if (
        emptyCells.length === 0
    ) {

        return;
    }


    const randomIndex =
        emptyCells[
            Math.floor(
                Math.random() *
                emptyCells.length
            )
        ];


    // Mostly 2, sometimes 4

    board[randomIndex] =
        Math.random() < 0.9
            ? 2
            : 4;
}


// ==========================================
// UPDATE BOARD
// ==========================================

function updateBoard() {

    for (
        let i = 0;
        i < board.length;
        i++
    ) {

        const tile =
            document.getElementById(
                `tile-${i}`
            );


        tile.textContent =
            board[i] === 0
                ? ""
                : board[i];


        tile.removeAttribute(
            "data-value"
        );


        if (
            board[i] !== 0
        ) {

            tile.setAttribute(
                "data-value",
                board[i]
            );
        }
    }


    scoreElement.textContent =
        score;


    if (
        score > bestScore
    ) {

        bestScore = score;


        localStorage.setItem(
            "numberRushBest",
            bestScore
        );


        bestScoreElement.textContent =
            bestScore;
    }
}


// ==========================================
// MOVE
// ==========================================

function move(direction) {

    let oldBoard =
        [...board];


    if (
        direction === "left"
    ) {

        moveLeft();

    } else if (
        direction === "right"
    ) {

        moveRight();

    } else if (
        direction === "up"
    ) {

        moveUp();

    } else if (
        direction === "down"
    ) {

        moveDown();
    }


    const changed =
        board.some(
            (value, index) =>
                value !== oldBoard[index]
        );


    if (changed) {

        addRandomTile();

        updateBoard();


        if (
            !canMove()
        ) {

            showGameOver();
        }
    }
}


// ==========================================
// MOVE LEFT
// ==========================================

function moveLeft() {

    for (
        let row = 0;
        row < 4;
        row++
    ) {

        let start =
            row * 4;


        let line = [

            board[start],

            board[start + 1],

            board[start + 2],

            board[start + 3]

        ];


        line =
            mergeLine(line);


        for (
            let i = 0;
            i < 4;
            i++
        ) {

            board[start + i] =
                line[i];
        }
    }
}


// ==========================================
// MOVE RIGHT
// ==========================================

function moveRight() {

    for (
        let row = 0;
        row < 4;
        row++
    ) {

        let start =
            row * 4;


        let line = [

            board[start],

            board[start + 1],

            board[start + 2],

            board[start + 3]

        ];


        line.reverse();


        line =
            mergeLine(line);


        line.reverse();


        for (
            let i = 0;
            i < 4;
            i++
        ) {

            board[start + i] =
                line[i];
        }
    }
}


// ==========================================
// MOVE UP
// ==========================================

function moveUp() {

    for (
        let col = 0;
        col < 4;
        col++
    ) {

        let line = [

            board[col],

            board[col + 4],

            board[col + 8],

            board[col + 12]

        ];


        line =
            mergeLine(line);


        for (
            let row = 0;
            row < 4;
            row++
        ) {

            board[
                row * 4 + col
            ] =
                line[row];
        }
    }
}


// ==========================================
// MOVE DOWN
// ==========================================

function moveDown() {

    for (
        let col = 0;
        col < 4;
        col++
    ) {

        let line = [

            board[col],

            board[col + 4],

            board[col + 8],

            board[col + 12]

        ];


        line.reverse();


        line =
            mergeLine(line);


        line.reverse();


        for (
            let row = 0;
            row < 4;
            row++
        ) {

            board[
                row * 4 + col
            ] =
                line[row];
        }
    }
}


// ==========================================
// MERGE LINE
// ==========================================

function mergeLine(line) {

    // Remove empty cells

    line =
        line.filter(
            value => value !== 0
        );


    // Merge equal numbers

    for (
        let i = 0;
        i < line.length - 1;
        i++
    ) {

        if (
            line[i] === line[i + 1]
        ) {

            line[i] *= 2;


            score +=
                line[i];


            line[i + 1] = 0;
        }
    }


    // Remove zeros again

    line =
        line.filter(
            value => value !== 0
        );


    // Add empty cells

    while (
        line.length < 4
    ) {

        line.push(0);
    }


    return line;
}


// ==========================================
// CAN MOVE?
// ==========================================

function canMove() {

    // Empty cell available

    if (
        board.includes(0)
    ) {

        return true;
    }


    // Check horizontal

    for (
        let row = 0;
        row < 4;
        row++
    ) {

        for (
            let col = 0;
            col < 3;
            col++
        ) {

            const index =
                row * 4 + col;


            if (
                board[index] ===
                board[index + 1]
            ) {

                return true;
            }
        }
    }


    // Check vertical

    for (
        let row = 0;
        row < 3;
        row++
    ) {

        for (
            let col = 0;
            col < 4;
            col++
        ) {

            const index =
                row * 4 + col;


            if (
                board[index] ===
                board[index + 4]
            ) {

                return true;
            }
        }
    }


    return false;
}


// ==========================================
// GAME OVER
// ==========================================

function showGameOver() {

    finalScore.textContent =
        `Final Score: ${score}`;


    gameOver.classList.remove(
        "hidden"
    );
}


// ==========================================
// KEYBOARD CONTROLS
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "ArrowLeft"
        ) {

            event.preventDefault();

            move("left");

        } else if (
            event.key === "ArrowRight"
        ) {

            event.preventDefault();

            move("right");

        } else if (
            event.key === "ArrowUp"
        ) {

            event.preventDefault();

            move("up");

        } else if (
            event.key === "ArrowDown"
        ) {

            event.preventDefault();

            move("down");
        }
    }
);


// ==========================================
// BUTTON CONTROLS
// ==========================================

upBtn.addEventListener(
    "click",
    function() {

        move("up");
    }
);


downBtn.addEventListener(
    "click",
    function() {

        move("down");
    }
);


leftBtn.addEventListener(
    "click",
    function() {

        move("left");
    }
);


rightBtn.addEventListener(
    "click",
    function() {

        move("right");
    }
);


// ==========================================
// RESTART
// ==========================================

restartBtn.addEventListener(
    "click",
    startGame
);


playAgainBtn.addEventListener(
    "click",
    startGame
);


// ==========================================
// START
// ==========================================

startGame();
const gameArea =
    document.getElementById("gameArea");

const player =
    document.getElementById("player");

const scoreElement =
    document.getElementById("score");

const bestScoreElement =
    document.getElementById("bestScore");

const startBtn =
    document.getElementById("startBtn");

const restartBtn =
    document.getElementById("restartBtn");

const leftBtn =
    document.getElementById("leftBtn");

const rightBtn =
    document.getElementById("rightBtn");

const gameOver =
    document.getElementById("gameOver");

const finalScore =
    document.getElementById("finalScore");

const playAgainBtn =
    document.getElementById("playAgainBtn");


/* =========================
   GAME VARIABLES
========================= */

let playerX = 50;

let score = 0;

let bestScore =
    Number(
        localStorage.getItem(
            "skyDodgeBest"
        )
    ) || 0;

let gameRunning = false;

let gameLoop = null;

let obstacleTimer = null;

let obstacleSpeed = 3;

let spawnTime = 1200;


/* =========================
   INITIAL SCORE
========================= */

bestScoreElement.textContent =
    bestScore;


/* =========================
   PLAYER POSITION
========================= */

function updatePlayer() {

    player.style.left =
        playerX + "%";
}


/* =========================
   MOVE LEFT
========================= */

function moveLeft() {

    if (!gameRunning) {
        return;
    }

    playerX -= 5;

    if (playerX < 8) {
        playerX = 8;
    }

    updatePlayer();
}


/* =========================
   MOVE RIGHT
========================= */

function moveRight() {

    if (!gameRunning) {
        return;
    }

    playerX += 5;

    if (playerX > 92) {
        playerX = 92;
    }

    updatePlayer();
}


/* =========================
   KEYBOARD
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "ArrowLeft" ||
            event.key.toLowerCase() === "a"
        ) {

            event.preventDefault();

            moveLeft();

        }

        else if (
            event.key === "ArrowRight" ||
            event.key.toLowerCase() === "d"
        ) {

            event.preventDefault();

            moveRight();
        }
    }
);


/* =========================
   BUTTON CONTROLS
========================= */

leftBtn.addEventListener(
    "click",
    moveLeft
);

rightBtn.addEventListener(
    "click",
    moveRight
);


/* =========================
   START GAME
========================= */

function startGame() {

    clearInterval(gameLoop);

    clearTimeout(obstacleTimer);

    document
        .querySelectorAll(".obstacle")
        .forEach(
            obstacle =>
                obstacle.remove()
        );


    score = 0;

    obstacleSpeed = 3;

    spawnTime = 1200;

    playerX = 50;

    gameRunning = true;


    scoreElement.textContent =
        score;

    gameOver.classList.add(
        "hidden"
    );

    updatePlayer();


    startBtn.textContent =
        "⏸️ Running";


    createObstacle();


    gameLoop =
        setInterval(
            updateObstacles,
            20
        );
}


/* =========================
   CREATE OBSTACLE
========================= */

function createObstacle() {

    if (!gameRunning) {
        return;
    }


    const obstacle =
        document.createElement(
            "div"
        );


    obstacle.classList.add(
        "obstacle"
    );


    const areaWidth =
        gameArea.clientWidth;


    const obstacleWidth = 55;


    const randomX =
        Math.random() *
        (
            areaWidth -
            obstacleWidth
        );


    obstacle.style.left =
        randomX + "px";


    obstacle.style.top =
        "-80px";


    gameArea.appendChild(
        obstacle
    );


    obstacleTimer =
        setTimeout(
            createObstacle,
            spawnTime
        );
}


/* =========================
   UPDATE OBSTACLES
========================= */

function updateObstacles() {

    const obstacles =
        document.querySelectorAll(
            ".obstacle"
        );


    obstacles.forEach(
        function(obstacle) {

            let top =
                parseFloat(
                    obstacle.style.top
                );


            top += obstacleSpeed;


            obstacle.style.top =
                top + "px";


            if (
                checkCollision(
                    obstacle
                )
            ) {

                endGame();

                return;
            }


            if (
                top >
                gameArea.clientHeight
            ) {

                obstacle.remove();

                increaseScore();
            }

        }
    );
}


/* =========================
   COLLISION
========================= */

function checkCollision(
    obstacle
) {

    const playerRect =
        player.getBoundingClientRect();


    const obstacleRect =
        obstacle.getBoundingClientRect();


    return (

        playerRect.left <
        obstacleRect.right &&

        playerRect.right >
        obstacleRect.left &&

        playerRect.top <
        obstacleRect.bottom &&

        playerRect.bottom >
        obstacleRect.top

    );
}


/* =========================
   SCORE
========================= */

function increaseScore() {

    score++;

    scoreElement.textContent =
        score;


    if (
        score > bestScore
    ) {

        bestScore = score;


        bestScoreElement.textContent =
            bestScore;


        localStorage.setItem(
            "skyDodgeBest",
            bestScore
        );
    }


    /*
       धीरे-धीरे game difficult होगा
    */

    if (
        score % 5 === 0
    ) {

        obstacleSpeed += 0.5;

        if (
            spawnTime > 500
        ) {

            spawnTime -= 80;
        }
    }
}


/* =========================
   END GAME
========================= */

function endGame() {

    if (!gameRunning) {
        return;
    }


    gameRunning = false;


    clearInterval(gameLoop);

    clearTimeout(obstacleTimer);


    finalScore.textContent =
        "Your Score: " + score;


    gameOver.classList.remove(
        "hidden"
    );


    startBtn.textContent =
        "▶️ Start";
}


/* =========================
   RESTART
========================= */

restartBtn.addEventListener(
    "click",
    startGame
);


playAgainBtn.addEventListener(
    "click",
    startGame
);


startBtn.addEventListener(
    "click",
    function() {

        if (!gameRunning) {

            startGame();
        }
    }
);
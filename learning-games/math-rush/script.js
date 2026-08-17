// ==========================================
// MATH RUSH
// ==========================================

let currentLevel = "";

let currentQuestion = 0;

let score = 0;

let answerSelected = false;


// ==========================================
// QUESTIONS
// ==========================================

const questions = {

    // ======================================
    // EASY
    // ======================================

    easy: [

        {
            question: "5 + 7 = ?",

            answers: [
                "10",
                "11",
                "12",
                "13"
            ],

            correct: "12"
        },

        {
            question: "15 - 6 = ?",

            answers: [
                "7",
                "8",
                "9",
                "10"
            ],

            correct: "9"
        },

        {
            question: "4 × 5 = ?",

            answers: [
                "15",
                "20",
                "25",
                "30"
            ],

            correct: "20"
        },

        {
            question: "20 ÷ 4 = ?",

            answers: [
                "4",
                "5",
                "6",
                "8"
            ],

            correct: "5"
        },

        {
            question: "10 + 15 = ?",

            answers: [
                "20",
                "25",
                "30",
                "35"
            ],

            correct: "25"
        }

    ],


    // ======================================
    // MEDIUM
    // ======================================

    medium: [

        {
            question: "25% of 200 = ?",

            answers: [
                "25",
                "40",
                "50",
                "75"
            ],

            correct: "50"
        },

        {
            question: "15 × 8 = ?",

            answers: [
                "100",
                "110",
                "120",
                "130"
            ],

            correct: "120"
        },

        {
            question: "144 ÷ 12 = ?",

            answers: [
                "10",
                "11",
                "12",
                "14"
            ],

            correct: "12"
        },

        {
            question: "3² + 4² = ?",

            answers: [
                "20",
                "25",
                "30",
                "35"
            ],

            correct: "25"
        },

        {
            question: "If x + 7 = 15, what is x?",

            answers: [
                "6",
                "7",
                "8",
                "9"
            ],

            correct: "8"
        }

    ],


    // ======================================
    // HARD
    // ======================================

    hard: [

        {
            question: "What is 15% of 480?",

            answers: [
                "62",
                "72",
                "82",
                "92"
            ],

            correct: "72"
        },

        {
            question: "Solve: 2x + 6 = 20",

            answers: [
                "5",
                "6",
                "7",
                "8"
            ],

            correct: "7"
        },

        {
            question: "What is √144 + √81?",

            answers: [
                "19",
                "20",
                "21",
                "22"
            ],

            correct: "21"
        },

        {
            question: "What is 2/3 of 90?",

            answers: [
                "50",
                "60",
                "70",
                "80"
            ],

            correct: "60"
        },

        {
            question: "A number is increased from 200 to 250. What is the percentage increase?",

            answers: [
                "20%",
                "25%",
                "30%",
                "35%"
            ],

            correct: "25%"
        }

    ]

};


// ==========================================
// START GAME
// ==========================================

function startGame(level) {

    currentLevel = level;

    currentQuestion = 0;

    score = 0;

    document
        .getElementById("levelScreen")
        .classList.add("hidden");

    document
        .getElementById("resultScreen")
        .classList.add("hidden");

    document
        .getElementById("gameScreen")
        .classList.remove("hidden");

    document
        .getElementById("levelTitle")
        .innerText =
        level.toUpperCase() + " LEVEL";

    document
        .getElementById("score")
        .innerText = score;

    showQuestion();

}


// ==========================================
// SHOW QUESTION
// ==========================================

function showQuestion() {

    answerSelected = false;

    const questionData =
        questions[currentLevel][currentQuestion];


    document
        .getElementById("questionNumber")
        .innerText =
        currentQuestion + 1;


    document
        .getElementById("question")
        .innerText =
        questionData.question;


    const answersContainer =
        document.getElementById("answers");


    answersContainer.innerHTML = "";


    questionData.answers.forEach(function(answer) {

        const button =
            document.createElement("button");


        button.innerText = answer;


        button.classList.add(
            "answer-btn"
        );


        button.onclick = function() {

            checkAnswer(
                button,
                answer
            );

        };


        answersContainer.appendChild(
            button
        );

    });

}


// ==========================================
// CHECK ANSWER
// ==========================================

function checkAnswer(button, answer) {

    if (answerSelected) {

        return;

    }

    answerSelected = true;


    const correctAnswer =
        questions[currentLevel]
        [currentQuestion]
        .correct;


    if (answer === correctAnswer) {

        button.classList.add(
            "correct"
        );

        score += 10;


        document
            .getElementById("score")
            .innerText = score;

    }

    else {

        button.classList.add(
            "wrong"
        );


        const allButtons =
            document.querySelectorAll(
                ".answer-btn"
            );


        allButtons.forEach(function(btn) {

            if (
                btn.innerText ===
                correctAnswer
            ) {

                btn.classList.add(
                    "correct"
                );

            }

        });

    }

}


// ==========================================
// NEXT QUESTION
// ==========================================

function nextQuestion() {

    if (!answerSelected) {

        alert(
            "Please select an answer first!"
        );

        return;

    }


    currentQuestion++;


    if (
        currentQuestion >=
        questions[currentLevel].length
    ) {

        showResult();

        return;

    }


    showQuestion();

}


// ==========================================
// RESULT
// ==========================================

function showResult() {

    document
        .getElementById("gameScreen")
        .classList.add("hidden");


    document
        .getElementById("resultScreen")
        .classList.remove("hidden");


    document
        .getElementById("finalScore")
        .innerText =
        score + " / 50";


    let message = "";


    if (score === 50) {

        message =
            "🏆 Perfect! You are a Math Master!";

    }

    else if (score >= 30) {

        message =
            "👏 Great Job! Keep Practicing!";

    }

    else {

        message =
            "💪 Good Try! Practice makes you better!";

    }


    document
        .getElementById("resultMessage")
        .innerText =
        message;

}


// ==========================================
// RESTART
// ==========================================

function restartGame() {

    document
        .getElementById("resultScreen")
        .classList.add("hidden");


    document
        .getElementById("levelScreen")
        .classList.remove("hidden");

}
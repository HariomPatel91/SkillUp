// ==========================================
// BRAIN CHALLENGE
// ==========================================

let currentLevel = "";
let currentQuestion = 0;
let score = 0;
let answerSelected = false;


// ==========================================
// QUESTIONS
// ==========================================

const questions = {

    easy: [

        {
            question: "What comes next? 2, 4, 6, 8, ?",
            answers: ["9", "10", "11", "12"],
            correct: "10"
        },

        {
            question: "Which number is the smallest?",
            answers: ["5", "2", "8", "10"],
            correct: "2"
        },

        {
            question: "If you have 3 apples and get 2 more, how many apples do you have?",
            answers: ["4", "5", "6", "7"],
            correct: "5"
        },

        {
            question: "What comes next? 5, 10, 15, 20, ?",
            answers: ["21", "25", "30", "35"],
            correct: "25"
        },

        {
            question: "Which shape has 3 sides?",
            answers: ["Square", "Triangle", "Circle", "Rectangle"],
            correct: "Triangle"
        }

    ],


    medium: [

        {
            question: "What comes next? 3, 6, 12, 24, ?",
            answers: ["30", "36", "48", "50"],
            correct: "48"
        },

        {
            question: "If ALL cats are animals and Tom is a cat, then Tom is a...",
            answers: ["Plant", "Animal", "Bird", "Fish"],
            correct: "Animal"
        },

        {
            question: "What is 15% of 200?",
            answers: ["15", "20", "30", "40"],
            correct: "30"
        },

        {
            question: "Which number does not belong?",
            answers: ["2", "4", "8", "15"],
            correct: "15"
        },

        {
            question: "What comes next? 1, 4, 9, 16, ?",
            answers: ["20", "25", "30", "36"],
            correct: "25"
        }

    ],


    hard: [

        {
            question: "What comes next? 2, 6, 12, 20, 30, ?",
            answers: ["36", "40", "42", "44"],
            correct: "42"
        },

        {
            question: "If 5 machines make 5 items in 5 minutes, how long would 1 machine take to make 1 item?",
            answers: ["1 minute", "5 minutes", "10 minutes", "25 minutes"],
            correct: "5 minutes"
        },

        {
            question: "A clock shows 3:00. What is the angle between the hands?",
            answers: ["45°", "60°", "90°", "180°"],
            correct: "90°"
        },

        {
            question: "What comes next? 1, 1, 2, 3, 5, 8, ?",
            answers: ["11", "12", "13", "15"],
            correct: "13"
        },

        {
            question: "If TODAY is Monday, what day will it be after 10 days?",
            answers: ["Wednesday", "Thursday", "Friday", "Saturday"],
            correct: "Thursday"
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

    document.getElementById("levelScreen")
        .classList.add("hidden");

    document.getElementById("resultScreen")
        .classList.add("hidden");

    document.getElementById("gameScreen")
        .classList.remove("hidden");

    document.getElementById("levelTitle").innerText =
        level.toUpperCase() + " LEVEL";

    document.getElementById("score").innerText = score;

    showQuestion();
}


// ==========================================
// SHOW QUESTION
// ==========================================

function showQuestion() {

    answerSelected = false;

    const questionData =
        questions[currentLevel][currentQuestion];

    document.getElementById("question").innerText =
        questionData.question;

    const answersContainer =
        document.getElementById("answers");

    answersContainer.innerHTML = "";

    questionData.answers.forEach(function(answer) {

        const button =
            document.createElement("button");

        button.innerText = answer;

        button.classList.add("answer-btn");

        button.onclick = function() {

            checkAnswer(button, answer);

        };

        answersContainer.appendChild(button);

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
        questions[currentLevel][currentQuestion].correct;

    if (answer === correctAnswer) {

        button.classList.add("correct");

        score += 10;

        document.getElementById("score").innerText =
            score;

    } else {

        button.classList.add("wrong");

        // Show correct answer

        const allButtons =
            document.querySelectorAll(".answer-btn");

        allButtons.forEach(function(btn) {

            if (btn.innerText === correctAnswer) {

                btn.classList.add("correct");

            }

        });

    }

}


// ==========================================
// NEXT QUESTION
// ==========================================

function nextQuestion() {

    if (!answerSelected) {

        alert("Please select an answer first!");

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

    document.getElementById("gameScreen")
        .classList.add("hidden");

    document.getElementById("resultScreen")
        .classList.remove("hidden");

    document.getElementById("finalScore").innerText =
        score + " / 50";

}


// ==========================================
// RESTART
// ==========================================

function restartGame() {

    document.getElementById("resultScreen")
        .classList.add("hidden");

    document.getElementById("levelScreen")
        .classList.remove("hidden");

}
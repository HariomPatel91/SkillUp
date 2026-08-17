// ==========================================
// GK MASTER
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
            question: "What is the capital of India?",
            answers: [
                "Mumbai",
                "New Delhi",
                "Kolkata",
                "Chennai"
            ],
            correct: "New Delhi"
        },

        {
            question: "How many days are there in a week?",
            answers: [
                "5",
                "6",
                "7",
                "8"
            ],
            correct: "7"
        },

        {
            question: "Which planet is known as the Red Planet?",
            answers: [
                "Earth",
                "Mars",
                "Jupiter",
                "Venus"
            ],
            correct: "Mars"
        },

        {
            question: "How many colors are there in a rainbow?",
            answers: [
                "5",
                "6",
                "7",
                "8"
            ],
            correct: "7"
        },

        {
            question: "Which animal is known as the King of the Jungle?",
            answers: [
                "Tiger",
                "Elephant",
                "Lion",
                "Bear"
            ],
            correct: "Lion"
        }

    ],


    // ======================================
    // MEDIUM
    // ======================================

    medium: [

        {
            question: "Which is the largest planet in our Solar System?",
            answers: [
                "Earth",
                "Mars",
                "Jupiter",
                "Saturn"
            ],
            correct: "Jupiter"
        },

        {
            question: "Who wrote the Indian national anthem?",
            answers: [
                "Mahatma Gandhi",
                "Rabindranath Tagore",
                "Jawaharlal Nehru",
                "Subhas Chandra Bose"
            ],
            correct: "Rabindranath Tagore"
        },

        {
            question: "Which gas do plants mainly absorb from the atmosphere for photosynthesis?",
            answers: [
                "Oxygen",
                "Nitrogen",
                "Carbon dioxide",
                "Hydrogen"
            ],
            correct: "Carbon dioxide"
        },

        {
            question: "Which is the longest river in India?",
            answers: [
                "Yamuna",
                "Ganga",
                "Godavari",
                "Narmada"
            ],
            correct: "Ganga"
        },

        {
            question: "Which organ pumps blood throughout the human body?",
            answers: [
                "Brain",
                "Lungs",
                "Heart",
                "Kidney"
            ],
            correct: "Heart"
        }

    ],


    // ======================================
    // HARD
    // ======================================

    hard: [

        {
            question: "Which is the smallest planet in our Solar System?",
            answers: [
                "Mars",
                "Mercury",
                "Venus",
                "Neptune"
            ],
            correct: "Mercury"
        },

        {
            question: "Which layer of the atmosphere contains most of the ozone?",
            answers: [
                "Troposphere",
                "Stratosphere",
                "Mesosphere",
                "Thermosphere"
            ],
            correct: "Stratosphere"
        },

        {
            question: "What is the SI unit of electric resistance?",
            answers: [
                "Volt",
                "Ampere",
                "Ohm",
                "Watt"
            ],
            correct: "Ohm"
        },

        {
            question: "Which Indian state has the longest coastline?",
            answers: [
                "Maharashtra",
                "Tamil Nadu",
                "Gujarat",
                "Kerala"
            ],
            correct: "Gujarat"
        },

        {
            question: "Which blood group is commonly known as the universal red-cell donor?",
            answers: [
                "AB+",
                "A+",
                "O−",
                "B+"
            ],
            correct: "O−"
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

        button.classList.add("answer-btn");

        button.onclick = function() {

            checkAnswer(
                button,
                answer
            );

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
        questions[currentLevel]
        [currentQuestion]
        .correct;


    if (answer === correctAnswer) {

        button.classList.add("correct");

        score += 10;

        document
            .getElementById("score")
            .innerText = score;

    }

    else {

        button.classList.add("wrong");

        const allButtons =
            document.querySelectorAll(
                ".answer-btn"
            );

        allButtons.forEach(function(btn) {

            if (
                btn.innerText ===
                correctAnswer
            ) {

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

        message = "🏆 Excellent! Perfect Score!";

    }

    else if (score >= 30) {

        message = "👏 Great Job! Keep Learning!";

    }

    else {

        message = "💪 Good Try! Learn and Try Again!";

    }

    document
        .getElementById("resultMessage")
        .innerText = message;

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
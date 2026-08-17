// ==========================================
// CODE QUEST
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
            question: "Which language is commonly used to create web pages?",
            answers: [
                "HTML",
                "C++",
                "Python",
                "Java"
            ],
            correct: "HTML"
        },

        {
            question: "Which symbol is used for a comment in JavaScript?",
            answers: [
                "//",
                "##",
                "<!--",
                "**"
            ],
            correct: "//"
        },

        {
            question: "Which keyword is commonly used to declare a variable in JavaScript?",
            answers: [
                "let",
                "print",
                "integer",
                "define"
            ],
            correct: "let"
        },

        {
            question: "Which language is famous for using indentation to define code blocks?",
            answers: [
                "Python",
                "HTML",
                "CSS",
                "SQL"
            ],
            correct: "Python"
        },

        {
            question: "What does CPU stand for?",
            answers: [
                "Central Processing Unit",
                "Computer Personal Unit",
                "Central Program Utility",
                "Computer Processing User"
            ],
            correct: "Central Processing Unit"
        }

    ],


    // ======================================
    // MEDIUM
    // ======================================

    medium: [

        {
            question: "What is the output of: 5 + 3?",
            answers: [
                "6",
                "7",
                "8",
                "9"
            ],
            correct: "8"
        },

        {
            question: "Which data type is used for whole numbers in C++?",
            answers: [
                "int",
                "float",
                "char",
                "string"
            ],
            correct: "int"
        },

        {
            question: "Which loop is commonly used when the number of repetitions is known?",
            answers: [
                "for loop",
                "if statement",
                "switch",
                "class"
            ],
            correct: "for loop"
        },

        {
            question: "Which operator is used for equality comparison in JavaScript?",
            answers: [
                "=",
                "==",
                "+=",
                "!="
            ],
            correct: "=="
        },

        {
            question: "Which of these is NOT a programming language?",
            answers: [
                "Python",
                "Java",
                "HTML",
                "C++"
            ],
            correct: "HTML"
        }

    ],


    // ======================================
    // HARD
    // ======================================

    hard: [

        {
            question: "What will be the output of: let x = 10; x += 5; ?",
            answers: [
                "5",
                "10",
                "15",
                "20"
            ],
            correct: "15"
        },

        {
            question: "Which concept allows a class to acquire properties of another class?",
            answers: [
                "Inheritance",
                "Compilation",
                "Iteration",
                "Casting"
            ],
            correct: "Inheritance"
        },

        {
            question: "Which data structure follows LIFO?",
            answers: [
                "Queue",
                "Stack",
                "Array",
                "Tree"
            ],
            correct: "Stack"
        },

        {
            question: "Which data structure follows FIFO?",
            answers: [
                "Stack",
                "Queue",
                "Tree",
                "Graph"
            ],
            correct: "Queue"
        },

        {
            question: "What is the time complexity of binary search on a sorted array?",
            answers: [
                "O(n)",
                "O(n²)",
                "O(log n)",
                "O(1)"
            ],
            correct: "O(log n)"
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
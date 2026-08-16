// ==========================================
// SKILLUP - FIREBASE JAVASCRIPT
// ==========================================

// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


// ==========================================
// FIREBASE CONFIG
// ==========================================

const firebaseConfig = {
    apiKey: "AIzaSyAGRiax1lT6WFBGAIWu36DxnqYvGXImvpw",
    authDomain: "skillup-c8b46.firebaseapp.com",
    projectId: "skillup-c8b46",
    storageBucket: "skillup-c8b46.firebasestorage.app",
    messagingSenderId: "603510096467",
    appId: "1:603510096467:web:c36ea0ebb461f013dd7ca6",
    measurementId: "G-SGXQB1BXW7"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);


// ==========================================
// AUTH
// ==========================================

// Show Create Account
window.showCreateAccount = function () {

    document.getElementById("loginPage")
        .classList.add("hidden");

    document.getElementById("createAccountPage")
        .classList.remove("hidden");

};


// Show Login
window.showLogin = function () {

    document.getElementById("createAccountPage")
        .classList.add("hidden");

    document.getElementById("loginPage")
        .classList.remove("hidden");

};


// ==========================================
// CREATE ACCOUNT
// ==========================================

window.createAccount = async function () {

    const name =
        document.getElementById("signupName")
            .value.trim();

    const email =
        document.getElementById("signupEmail")
            .value.trim();

    const password =
        document.getElementById("signupPassword")
            .value;

    const message =
        document.getElementById("signupMessage");


    if (name === "" || email === "" || password === "") {

        message.innerText =
            "Please fill all fields.";

        message.style.color = "red";

        return;
    }


    if (password.length < 6) {

        message.innerText =
            "Password must be at least 6 characters.";

        message.style.color = "red";

        return;
    }


    try {

        const userCredential =
            await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
            userCredential.user;


        // Save user's name in Firebase Authentication
        await updateProfile(user, {
            displayName: name
        });


        message.innerText =
            "✅ Account created successfully!";

        message.style.color = "green";


        document.getElementById("signupPassword")
            .value = "";


        setTimeout(function () {

            showLogin();

        }, 1000);


    } catch (error) {

        console.error(error);


        if (error.code === "auth/email-already-in-use") {

            message.innerText =
                "This email is already registered.";

        }

        else if (error.code === "auth/invalid-email") {

            message.innerText =
                "Please enter a valid email.";

        }

        else if (error.code === "auth/weak-password") {

            message.innerText =
                "Password is too weak.";

        }

        else {

            message.innerText =
                "Account creation failed: " +
                error.message;

        }


        message.style.color = "red";

    }

};


// ==========================================
// LOGIN
// ==========================================

window.login = async function () {

    const email =
        document.getElementById("loginEmail")
            .value.trim();

    const password =
        document.getElementById("loginPassword")
            .value;

    const message =
        document.getElementById("loginMessage");


    if (email === "" || password === "") {

        message.innerText =
            "Please enter email and password.";

        message.style.color = "red";

        return;
    }


    try {

        const userCredential =
            await signInWithEmailAndPassword(
                auth,
                email,
                password
            );


        const user =
            userCredential.user;


        message.innerText =
            "✅ Login successful!";

        message.style.color = "green";


        openApp(user);


    } catch (error) {

        console.error(error);


        if (
            error.code === "auth/invalid-credential" ||
            error.code === "auth/wrong-password" ||
            error.code === "auth/user-not-found"
        ) {

            message.innerText =
                "❌ Wrong email or password.";

        }

        else if (error.code === "auth/invalid-email") {

            message.innerText =
                "Please enter a valid email.";

        }

        else {

            message.innerText =
                "Login failed: " +
                error.message;

        }


        message.style.color = "red";

    }

};


// ==========================================
// OPEN APP
// ==========================================

function openApp(user) {

    document.getElementById("loginPage")
        .classList.add("hidden");

    document.getElementById("createAccountPage")
        .classList.add("hidden");

    document.getElementById("appPage")
        .classList.remove("hidden");


    const name =
        user.displayName || "User";


    document.getElementById("welcomeUser")
        .innerText =
        "Welcome " + name + " 👋";


    generateReferralCode(user.email);

    showSection("home");

}


// ==========================================
// LOGOUT
// ==========================================

window.logout = async function () {

    try {

        await signOut(auth);

        document.getElementById("appPage")
            .classList.add("hidden");

        document.getElementById("loginPage")
            .classList.remove("hidden");


        document.getElementById("loginEmail")
            .value = "";

        document.getElementById("loginPassword")
            .value = "";


    } catch (error) {

        console.error(error);

    }

};


// ==========================================
// AUTH STATE
// ==========================================

onAuthStateChanged(auth, function (user) {

    if (user) {

        openApp(user);

    }

});


// ==========================================
// SECTIONS
// ==========================================

window.showSection = function (sectionName) {

    const sections =
        document.querySelectorAll(".section");


    sections.forEach(function (section) {

        section.classList.add("hidden");

    });


    const selectedSection =
        document.getElementById(sectionName);


    if (selectedSection) {

        selectedSection.classList.remove("hidden");

    }


    if (sectionName === "quiz") {

        currentQuestion = 0;

        score = 0;

        loadQuestion();

    }

};


// ==========================================
// QUIZ
// ================= PROGRAMMING QUIZ =================

const quizData = {

    C: [
        {
            question: "Which function is used to print output in C?",
            answers: ["input()", "printf()", "print()", "output()"],
            correct: 1
        },
        {
            question: "Which symbol ends a statement in C?",
            answers: [".", ",", ";", ":"],
            correct: 2
        },
        {
            question: "Which data type is used to store an integer?",
            answers: ["float", "int", "char", "double"],
            correct: 1
        },
        {
            question: "Which loop executes at least once?",
            answers: ["for", "while", "do-while", "if"],
            correct: 2
        },
        {
            question: "Which symbol is used for a single-line comment in C?",
            answers: ["//", "#", "/*", "--"],
            correct: 0
        }
    ],

    "C++": [
        {
            question: "Who developed C++?",
            answers: [
                "Dennis Ritchie",
                "Bjarne Stroustrup",
                "James Gosling",
                "Guido van Rossum"
            ],
            correct: 1
        },
        {
            question: "Which keyword is used to create a class in C++?",
            answers: [
                "class",
                "object",
                "new",
                "define"
            ],
            correct: 0
        },
        {
            question: "Which concept allows the same function name with different parameters?",
            answers: [
                "Inheritance",
                "Encapsulation",
                "Function Overloading",
                "Abstraction"
            ],
            correct: 2
        },
        {
            question: "Which concept allows one class to acquire properties of another?",
            answers: [
                "Inheritance",
                "Compilation",
                "Looping",
                "Casting"
            ],
            correct: 0
        },
        {
            question: "Which operator is used to access an object's member?",
            answers: [".", "#", "@", "$"],
            correct: 0
        }
    ],

    Python: [
        {
            question: "Which function is used to display output in Python?",
            answers: [
                "echo()",
                "print()",
                "display()",
                "output()"
            ],
            correct: 1
        },
        {
            question: "Which symbol is used for comments in Python?",
            answers: ["//", "#", "/*", "--"],
            correct: 1
        },
        {
            question: "Which keyword is used to define a function?",
            answers: [
                "function",
                "define",
                "def",
                "fun"
            ],
            correct: 2
        },
        {
            question: "Which data type stores an ordered collection of items?",
            answers: [
                "list",
                "int",
                "float",
                "bool"
            ],
            correct: 0
        },
        {
            question: "Which loop is commonly used to iterate over a sequence?",
            answers: [
                "for",
                "switch",
                "case",
                "goto"
            ],
            correct: 0
        }
    ],

    Java: [
        {
            question: "Who originally developed Java?",
            answers: [
                "James Gosling",
                "Bjarne Stroustrup",
                "Dennis Ritchie",
                "Guido van Rossum"
            ],
            correct: 0
        },
        {
            question: "Which keyword is used to create a class in Java?",
            answers: [
                "class",
                "Class",
                "object",
                "newclass"
            ],
            correct: 0
        },
        {
            question: "Which method is the entry point of a Java program?",
            answers: [
                "start()",
                "run()",
                "main()",
                "execute()"
            ],
            correct: 2
        },
        {
            question: "Which keyword is used for class inheritance in Java?",
            answers: [
                "inherits",
                "extends",
                "inherit",
                "using"
            ],
            correct: 1
        },
        {
            question: "Which data type stores whole numbers in Java?",
            answers: [
                "float",
                "char",
                "int",
                "boolean"
            ],
            correct: 2
        }
    ]

};


// Quiz variables

let currentLanguage = "";
let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;


// Start Quiz

function startQuiz(language) {

    currentLanguage = language;

    currentQuestionIndex = 0;

    score = 0;

    answerSelected = false;

    document.getElementById("quizLanguages")
        .classList.add("hidden");

    document.getElementById("quizFinished")
        .classList.add("hidden");

    document.getElementById("quizGame")
        .classList.remove("hidden");

    document.getElementById("quizTitle").innerText =
        language + " Quiz";

    showQuestion();
}


// Show Question

function showQuestion() {

    answerSelected = false;

    const questions = quizData[currentLanguage];

    const currentQuestion =
        questions[currentQuestionIndex];

    document.getElementById("questionNumber").innerText =
        "Question " +
        (currentQuestionIndex + 1) +
        " / " +
        questions.length;

    document.getElementById("question").innerText =
        currentQuestion.question;

    document.getElementById("quizResult").innerText = "";

    const answersDiv =
        document.getElementById("answers");

    answersDiv.innerHTML = "";


    currentQuestion.answers.forEach((answer, index) => {

        const button =
            document.createElement("button");

        button.innerText = answer;

        button.className = "quiz-answer";

        button.onclick = function() {

            if (answerSelected) {
                return;
            }

            answerSelected = true;

            if (index === currentQuestion.correct) {

                score++;

                button.innerText =
                    answer + " ✅";

                document.getElementById("quizResult")
                    .innerText = "Correct Answer! 🎉";

            } else {

                button.innerText =
                    answer + " ❌";

                document.getElementById("quizResult")
                    .innerText = "Wrong Answer!";

            }

        };

        answersDiv.appendChild(button);

    });

}


// Next Question

function nextQuestion() {

    if (!answerSelected) {

        alert("Please select an answer first.");

        return;

    }

    currentQuestionIndex++;

    const questions = quizData[currentLanguage];

    if (currentQuestionIndex < questions.length) {

        showQuestion();

    } else {

        finishQuiz();

    }

}


// Finish Quiz

function finishQuiz() {

    document.getElementById("quizGame")
        .classList.add("hidden");

    document.getElementById("quizFinished")
        .classList.remove("hidden");

    document.getElementById("finalScore").innerText =
        currentLanguage +
        " Quiz Score: " +
        score +
        " / " +
        quizData[currentLanguage].length;

}


// Restart same Quiz

function restartQuiz() {

    startQuiz(currentLanguage);

}


// Choose another Quiz

function chooseQuiz() {

    document.getElementById("quizFinished")
        .classList.add("hidden");

    document.getElementById("quizLanguages")
        .classList.remove("hidden");

}

// ==========================================
// SHAYARI
// ==========================================

const shayaris = [

    "मेहनत इतनी खामोशी से करो, कि सफलता शोर मचा दे। 🚀",

    "आज की मेहनत ही कल की पहचान बनेगी। 💪",

    "सपने वो नहीं जो नींद में आते हैं, सपने वो हैं जो आपको सोने नहीं देते। ✨",

    "छोटे कदम भी एक दिन बड़ी मंजिल तक ले जाते हैं। 🌟",

    "सीखते रहो, बढ़ते रहो और कभी हार मत मानो। 🔥",

    "कामयाबी मेहनत करने वालों के कदम चूमती है। 🏆"

];


window.newShayari = function () {

    const randomIndex =
        Math.floor(
            Math.random() *
            shayaris.length
        );


    document.getElementById("shayariText")
        .innerText =
        shayaris[randomIndex];

};


// ==========================================
// RESUME
// ==========================================

window.generateResume = function () {

    const name =
        document.getElementById("resumeName")
            .value.trim();

    const email =
        document.getElementById("resumeEmail")
            .value.trim();

    const phone =
        document.getElementById("resumePhone")
            .value.trim();

    const education =
        document.getElementById("resumeEducation")
            .value.trim();

    const skills =
        document.getElementById("resumeSkills")
            .value.trim();

    const about =
        document.getElementById("resumeAbout")
            .value.trim();


    if (
        name === "" ||
        email === "" ||
        education === ""
    ) {

        alert(
            "Please fill Name, Email and Education."
        );

        return;

    }


    const output =
        document.getElementById("resumeOutput");


    output.innerHTML = `

        <h1>${name}</h1>

        <p>
            <strong>Email:</strong>
            ${email}
        </p>

        <p>
            <strong>Phone:</strong>
            ${phone}
        </p>

        <hr>

        <h3>About Me</h3>

        <p>${about}</p>

        <h3>Education</h3>

        <p>${education}</p>

        <h3>Skills</h3>

        <p>${skills}</p>

        <br>

        <button onclick="window.print()">
            Print / Save Resume
        </button>

    `;


    output.classList.remove("hidden");

};


// ==========================================
// REFER & EARN
// ==========================================

function generateReferralCode(email) {

    let code = "SKILLUP";


    if (email) {

        code =
            "SKILLUP" +
            email
                .substring(0, 4)
                .toUpperCase();

    }


    document.getElementById("referralCode")
        .innerText =
        code;

}


window.copyReferral = function () {

    const code =
        document.getElementById("referralCode")
            .innerText;


    navigator.clipboard.writeText(code);


    document.getElementById("copyMessage")
        .innerText =
        "✅ Referral code copied!";

};


function getReferralLink() {

    return (
        window.location.origin +
        window.location.pathname +
        "?ref=" +
        document.getElementById("referralCode")
            .innerText
    );

}


window.copyReferralLink = function () {

    const link =
        getReferralLink();


    navigator.clipboard.writeText(link);


    document.getElementById("shareMessage")
        .innerText =
        "✅ Referral link copied!";

};


window.shareReferral = async function () {

    const link =
        getReferralLink();


    if (navigator.share) {

        try {

            await navigator.share({

                title: "Join SkillUp",

                text:
                    "Join SkillUp - Learn, Play & Grow 🚀",

                url: link

            });

        }

        catch (error) {

            console.log(
                "Share cancelled"
            );

        }

    }

    else {

        navigator.clipboard.writeText(link);


        document.getElementById("shareMessage")
            .innerText =
            "✅ Link copied! You can share it with your friends.";

    }

};


// ==========================================
// PDF MAKER
// ==========================================

window.generatePDF = function () {

    const title =
        document.getElementById("pdfTitle")
            .value.trim();

    const content =
        document.getElementById("pdfContent")
            .value.trim();


    if (
        title === "" ||
        content === ""
    ) {

        alert(
            "Please enter PDF title and content."
        );

        return;

    }


    const printWindow =
        window.open("", "_blank");


    if (!printWindow) {

        alert(
            "Please allow pop-ups for SkillUp."
        );

        return;

    }


    printWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <title>${title}</title>

            <style>

                body {

                    font-family:
                        Arial, sans-serif;

                    padding: 50px;

                    line-height: 1.7;

                    color: #222;

                }

                h1 {

                    text-align: center;

                    margin-bottom: 30px;

                }

                .content {

                    white-space: pre-wrap;

                    font-size: 16px;

                }

            </style>

        </head>

        <body>

            <h1>${title}</h1>

            <div class="content">
                ${content}
            </div>

        </body>

        </html>

    `);


    printWindow.document.close();

    printWindow.focus();


    setTimeout(function () {

        printWindow.print();

    }, 500);

};
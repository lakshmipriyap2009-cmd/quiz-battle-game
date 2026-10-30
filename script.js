
const questions = [
    {
        question: "Which language is used to style web pages?",
        answers: ["HTML", "CSS", "Python", "Java"],
        correct: "CSS"
    },
    {
        question: "Which language makes web pages interactive?",
        answers: ["CSS", "HTML", "JavaScript", "SQL"],
        correct: "JavaScript"
    },
    {
        question: "Which tag is used to create a hyperlink in HTML?",
        answers: ["<link>", "<href>", "<a>", "<p>"],
        correct: "<a>"
    },
    {
        question: "Which company developed JavaScript's original engine?",
        answers: ["Netscape", "Microsoft", "Google", "Apple"],
        correct: "Netscape"
    },
    {
        question: "Which symbol is used for a single-line comment in JavaScript?",
        answers: ["<!-- -->", "//", "**", "##"],
        correct: "//"
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const resultElement = document.getElementById("result");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

function showQuestion() {
    const question = questions[currentQuestion];

    questionElement.textContent = question.question;
    answerButtons.innerHTML = "";
    resultElement.textContent = "";
    nextButton.style.display = "none";

    question.answers.forEach(answer => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.classList.add("answer-btn");
        button.addEventListener("click", () => checkAnswer(button, answer));

        answerButtons.appendChild(button);
    });

    scoreElement.textContent = `Score: ${score}`;
}

function checkAnswer(selectedButton, answer) {
    const correctAnswer = questions[currentQuestion].correct;
    const buttons = answerButtons.querySelectorAll("button");

    buttons.forEach(button => {
        button.disabled = true;

        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }
    });

    if (answer === correctAnswer) {
        score++;
        resultElement.textContent = "🎉 Correct answer!";
    } else {
        selectedButton.classList.add("wrong");
        resultElement.textContent = "❌ Wrong answer! Try the next one.";
    }

    scoreElement.textContent = `Score: ${score}`;
    nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    questionElement.textContent = "🏆 Quiz Completed!";
    answerButtons.innerHTML = "";
    resultElement.textContent = `Your final score is ${score} out of ${questions.length}.`;
    nextButton.textContent = "Play Again";
    nextButton.style.display = "inline-block";

    nextButton.onclick = () => {
        currentQuestion = 0;
        score = 0;
        nextButton.textContent = "Next Question";
        nextButton.onclick = null;
        showQuestion();
    };
}

showQuestion();

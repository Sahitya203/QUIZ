const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false }
    ]
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false }
    ]
  },
  {
    question: "Largest ocean?",
    answers: [
      { text: "Atlantic", correct: false },
      { text: "Indian", correct: false },
      { text: "Pacific", correct: true },
      { text: "Arctic", correct: false }
    ]
  },
  {
    question: "Which is NOT a language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JS", correct: false }
    ]
  },
  {
    question: "Symbol of gold?",
    answers: [
      { text: "Ag", correct: false },
      { text: "Au", correct: true },
      { text: "Gd", correct: false },
      { text: "Go", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}

function showQuestion() {
  const q = quizQuestions[currentQuestionIndex];
  questionText.textContent = q.question;
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  progressBar.style.width = ((currentQuestionIndex + 1) / quizQuestions.length) * 100 + "%";//css style elemnt
  //0+1 bcz we strt with 1/5 *100 20%color

  answersContainer.innerHTML = "";

  q.answers.forEach(ans => {//function(ans)//showing all answers
    const btn = document.createElement("button");//dynamic btn crtion
    btn.textContent = ans.text;//set btn txt
    btn.classList.add("answer-btn");//add answe-btn styles to btn
    btn.onclick = () => checkAnswer(ans.correct, btn);//all answers on by one .correct
    answersContainer.appendChild(btn)
  });
}

function checkAnswer(correct, button) {//passing btn bcz which button the user clicked
  if (correct) {
    button.classList.add("correct");//js dynmic add these incorrct and correct 
    score++;
    scoreSpan.textContent = score;
  } else {
    button.classList.add("incorrect");
  }

  setTimeout(() => {// when user click we show red or grren for a short moment afetr it goes to n ext qus autoamticly
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 800);
}

function showResults() {
  quizScreen.classList.remove("active");//close quis scrren  disply none
  resultScreen.classList.add("active");//active res scrren disply:block
  finalScoreSpan.textContent = score;

  if (score === 5) resultMessage.textContent = "Perfect!";
  else if (score >= 3) resultMessage.textContent = "Good job!";
  else resultMessage.textContent = "Try again!";
}

function restartQuiz() {
  resultScreen.classList.remove("active");
  startScreen.classList.add("active");
}

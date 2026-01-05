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
    question: "Which Memory is Fastest?",
    answers: [
      { text: "RAM", correct: false },
      { text: "ROM", correct: false },
      { text: "Hard Disk", correct: false },
      { text: "Cache Memory", correct: true}
    ]
  },
  {
    question: "CPU Stands For?",
    answers: [
      { text: "control processing unit", correct: false },
      { text: "central processing unit", correct: true },
      { text: "computer personal unit", correct: false },
      { text: "common private unit", correct: false }
    ]
  },
  {
    question: "Which Memory is Temporary?",
    answers: [
      { text: "RAM", correct: true },
      { text: "ROM", correct: false },
      { text: "PenDrive", correct: false },
      { text: "Hard Disk", correct: false }
    ]
  },
  {
    question: "Which Component Performs Arithmetic and Logical Operations?",
    answers: [
      { text: "Contro unit", correct: false },
      { text: "Register", correct: false },
      { text: "ALU", correct: true },
      { text: "Cache", correct: false }
    ]
  },
  {
    question: "RAM stands for?",
    answers: [
      { text: "Read Access Memory", correct: false },
      { text: "Random Access Memory", correct: true },
      { text: "Rapid Action Memory", correct: false },
      { text: "Read And Modify", correct: false }
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
    btn.classList.add("answer-btn");//add answer-btn styles to btn
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

  setTimeout(() => {// when user click we show red or green for a short moment after it goes to n  questions autoamtically
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

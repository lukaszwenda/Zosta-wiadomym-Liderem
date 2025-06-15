// ✅ script.js – w pełni naprawiony (poprawne ocenianie po tekście, losowe pytania, przycisk powtórki)

const questionContainer = document.querySelector(".question-text");
const questionNumber = document.querySelector(".question-number");
const answersBlock = document.querySelector(".quiz-container");
const nextButton = document.getElementById("nextBtn");

let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let shuffledAnswers = [];
let correctAnswerText = "";

function startQuiz() {
  fetch("full-quiz-question-bank.json")
    .then((res) => res.json())
    .then((data) => {
      questions = shuffleArray(data).slice(0, 10);
      currentQuestionIndex = 0;
      score = 0;
      showQuestion();
    });
}

function showQuestion() {
  const q = questions[currentQuestionIndex];
  questionNumber.textContent = `Pytanie ${currentQuestionIndex + 1} z 10`;
  questionContainer.textContent = q.question;

  document.querySelectorAll(".answer-button").forEach((btn) => btn.remove());
  const existingRetryBtn = document.getElementById("retryBtn");
  if (existingRetryBtn) existingRetryBtn.remove();

  // zapisz poprawną odpowiedź jako tekst
  correctAnswerText = q.answers[q.correct];

  shuffledAnswers = shuffleArray(
    q.answers.map((text, index) => ({ text, index }))
  );

  shuffledAnswers.forEach(({ text }, index) => {
    const btn = document.createElement("button");
    btn.className = "answer-button";
    btn.textContent = text;
    btn.addEventListener("click", () => selectAnswer(index));
    answersBlock.insertBefore(btn, nextButton);
  });

  nextButton.classList.remove("visible");
  nextButton.textContent = "Dalej";
  nextButton.style.display = "inline-block";
}

function selectAnswer(selectedIndex) {
  document.querySelectorAll(".answer-button").forEach((b) => {
    b.style.backgroundColor = "white";
  });
  event.target.style.backgroundColor = "#d2ead2";
  nextButton.classList.add("visible");

  const selectedAnswerText = shuffledAnswers[selectedIndex].text;
  if (selectedAnswerText === correctAnswerText) {
    score++;
  }
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < 10) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  document.querySelectorAll(".answer-button").forEach((btn) => btn.remove());
  questionNumber.textContent = "Test zakończony";
  questionContainer.textContent = `Twój wynik: ${score}/10`;
  nextButton.style.display = "none";

  const retryBtn = document.createElement("button");
  retryBtn.id = "retryBtn";
  retryBtn.textContent = "Powtórz test";
  retryBtn.className = "next-button visible";
  retryBtn.addEventListener("click", startQuiz);
  answersBlock.appendChild(retryBtn);
}

function shuffleArray(array) {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

startQuiz();

const questions = [
  {
    q: "Jakie działanie najlepiej odzwierciedla zaangażowanie pracownika?",
    a: ["Reagowanie tylko na polecenia", "Samodzielna inicjatywa i odpowiedzialność", "Wykonywanie zadań bez refleksji"],
    correct: 1
  },
  {
    q: "Co może świadczyć o niskim poziomie zaangażowania?",
    a: ["Brak zainteresowania wynikami", "Uczestnictwo w spotkaniach", "Terminowa realizacja zobowiązań"],
    correct: 0
  },
  {
    q: "Jakie zachowanie świadczy o odwadze pracownika?",
    a: ["Zachowawczość", "Inicjatywa w sytuacjach niepewnych", "Brak sprzeciwu wobec błędów"],
    correct: 1
  },
  {
    q: "Kiedy odważny pracownik powinien zgłaszać ryzyko?",
    a: ["Po fakcie", "Od razu po zauważeniu", "Po konsultacji z zespołem"],
    correct: 1
  },
  {
    q: "Jakie działanie jest wyrazem ciekawości?",
    a: ["Podążanie za procedurą", "Proponowanie ulepszeń", "Ignorowanie rynku"],
    correct: 1
  },
  {
    q: "Jak ciekawy pracownik reaguje na dobre praktyki?",
    a: ["Zgłasza i omawia je", "Ignoruje", "Zatrzymuje dla siebie"],
    correct: 0
  },
  {
    q: "Jak wspierający pracownik wpływa na innych?",
    a: ["Krytykuje publicznie", "Daje przestrzeń i wyraża uznanie", "Wyznacza zadania bez wyjaśnień"],
    correct: 1
  },
  {
    q: "Co oznacza budowanie pozytywnej atmosfery?",
    a: ["Otwartość, szacunek, zaufanie", "Brak uwag", "Mało komunikacji"],
    correct: 0
  },
  {
    q: "Co jest fundamentem współpracy?",
    a: ["Niezależność", "Wspólne cele i wsparcie", "Podział obowiązków"],
    correct: 1
  },
  {
    q: "Jak wspierać zespół?",
    a: ["Unikać tematów", "Dzielić się wiedzą i pomagać", "Skupić się na KPI"],
    correct: 1
  }
];

let current = 0;
let score = 0;
const selected = shuffle([...questions]).slice(0, 10);

const questionBox = document.getElementById("question");
const answersBox = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const scoreBox = document.getElementById("score");
const feedbackBox = document.getElementById("feedback");
const resultBox = document.getElementById("result-box");

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function showQuestion() {
  const q = selected[current];
  questionBox.textContent = `Pytanie ${current + 1}: ${q.q}`;
  answersBox.innerHTML = "";
  q.a.forEach((answer, i) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.className = "answer-btn button";
    btn.onclick = () => {
      if (i === q.correct) score++;
      Array.from(answersBox.children).forEach(b => b.disabled = true);
      nextBtn.style.display = "block";
    };
    answersBox.appendChild(btn);
  });
}

nextBtn.onclick = () => {
  current++;
  if (current < selected.length) {
    showQuestion();
    nextBtn.style.display = "none";
  } else {
    questionBox.style.display = "none";
    answersBox.style.display = "none";
    nextBtn.style.display = "none";
    resultBox.style.display = "block";
    scoreBox.textContent = `${score} / ${selected.length}`;

    if (score === 10) {
      feedbackBox.textContent = "Świetnie! Jesteś świadomym liderem!";
    } else if (score >= 8) {
      feedbackBox.textContent = "Bardzo dobrze! Jesteś na dobrej drodze.";
    } else {
      feedbackBox.textContent = "Zachęcamy do dalszego rozwoju w obszarze zachowań ABEG.";
    }
  }
};

showQuestion();

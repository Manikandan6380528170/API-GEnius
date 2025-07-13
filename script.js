const questions = [
  {
        question: "Web services were widely used in which environment?",
        options: ["Mobile Computing", "Digital Computing", "Distributed computing", "All these"],
        answer: "Distributed computing"
      },
      {
        question: "Web service is used for which service?",
        options: ["Host", "Run", "Compile", "Debug"],
        answer: "Host"
      },
      {
        question: "Rely on xml based messaging and operate through?",
        options: ["WSDL", "VCCI", "XML", "ERP"],
        answer: "WSDL"
      },
{
        question: "Which type of webservice used the HTTP method?",
        options: ["SOAP", "REST", "UDP", "FTP"],
        answer: "REST"
      },
{
        question: "What are the emergence of web service?",
        options: ["Interoperability", "High reliability", "Resource sharing", "Service request"],
        answer: "Interoperability"
      },
{
        question: "Which architecture were client can communicate with server?",
        options: ["Client-server", "Dumb terminals", "Thick client", "Thin client"],
        answer: "Client-server"
      },
{
        question: "Which client is a leight weight computer as software application?",
        options: ["Thin", "Thick", "Dumb", "Server"],
        answer: "Thin"
      },
{
        question: "Which can be interact with server primarily for data storage and communication?",
        options: ["Thin", "Thick", "Dumb", "Server"],
        answer: "Thick"
      },
{
        question: "An Software application that runs within web browser?",
        options: ["Browserbased client", "Native Client", "Thick client", "Thin client"],
        answer: "Browserbased client"
      },
{
        question: "An Application which run an smartphone with their own code and UI?",
        options: ["Browserbased client", "Mobile Client", "Thick client", "Thin client"],
        answer: "Mobile Client"
      },
{
        question: "The standardized ways for application to communicate over the internet?",
        options: ["XML", "XSD", "WSDL", "UDDI"],
        answer: "XML"
      },
{
        question: "What is the primary purpose of XML?",
        options: ["To style HTML documents","To store and transport data","To create hyperlinks","To generate videos"],
        answer: "To store and transport data"
      },
{
        question: "Which of the following is true about XML tags?",
        options: ["Tags are optional","Tags must be properly nested","Tags can comtain spaces","Tags are case-insensitive"],
        answer: "Tags must be properly nested"
      },
{
        question: "What is a root element in XML?",
        options: ["The first element of a document", "A special attribute", "The main container for all other element", "An optional features in xml"],
        answer: "The main container for all other element"
      },
{
        question: "Which character must be escaped in XML?",
        options: ["@", "$", "&", "%"],
        answer: "&"
      },
{
        question: "Which syntax is correct for an empty elements in XML?",
        options: ["<empty>", "<empty></empty>", "<empty/>", "</empty>"],
        answer: "<empty/>"
      },
{
        question: "What is the role of CDATA in XML?",
        options: ["Store comments", "Include raw data without parsing", "Define attributes'", "Create namespaces"],
        answer: "Include raw data without parsing"
      },
{
        question: "What is the advantage of XML over JSON?",
        options: ["Conciseness", "Built-in data types", "Strong scheme support", "Faster processing"],
        answer: "Strong scheme support"
      },
{
        question: "What does a well-formed XML document means?",
        options: ["JSON Schema", "XML Schema(XSD)", "CSV", "YAML"],
        answer: "XML Schema(XSD)"
      },
{
        question: "What is a significant limitation of XML compared to JSON?",
        options: ["Lack of schema support", "Verbose syntax", "No support for hierarchical structures", "Cannot be validated"],
        answer: "Verbose syntax"
      },
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;

const questionBox = document.getElementById("question");
const answersBox = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const scoreCard = document.getElementById("score-card");
const scoreDisplay = document.getElementById("score");
const totalDisplay = document.getElementById("total");
const timeDisplay = document.getElementById("time");
const resultMessage = document.getElementById("result-message");

function startTimer() {
  clearInterval(timer);
  timeLeft = 15;
  timeDisplay.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      lockAnswers();
    }
  }, 1000);
}

function showQuestion() {
  const q = questions[currentQuestion];
  questionBox.textContent = q.question;
  answersBox.innerHTML = "";
  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => selectAnswer(index);
    answersBox.appendChild(btn);
  });
  nextBtn.style.display = "none";
  startTimer();
}

function selectAnswer(index) {
  const correct = questions[currentQuestion].correct;
  const buttons = answersBox.querySelectorAll("button");
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) {
      btn.style.backgroundColor = "#90ee90"; // green
    } else if (i === index) {
      btn.style.backgroundColor = "#ffcccb"; // red
    }
  });
  if (index === correct) score++;
  clearInterval(timer);
  nextBtn.style.display = "block";
}

function lockAnswers() {
  const correct = questions[currentQuestion].correct;
  const buttons = answersBox.querySelectorAll("button");
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) {
      btn.style.backgroundColor = "#90ee90";
    }
  });
  nextBtn.style.display = "block";
}

function showScore() {
  questionBox.textContent = "Quiz Finished!";
  answersBox.innerHTML = "";
  nextBtn.style.display = "none";
  scoreCard.classList.remove("hidden");
  scoreDisplay.textContent = score;
  totalDisplay.textContent = questions.length;

  if (score >= 2) {
    resultMessage.textContent = "🎉 Congratulations! Great Job!";
  } else {
    resultMessage.textContent = "😢 Better luck next time!";
  }
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

window.onload = showQuestion;

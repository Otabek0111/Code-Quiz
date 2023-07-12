// console.log("script is connected");

//variables need to create
/*
start Btn
inputButtons
ansBtn1
ansBtn2
ansBtn3
ansBtn4
submitAns
checkAns
*/

//variable decloration

var startButton = document.querySelector(".beginButton");

var startScreen = document.querySelector("#startScreen");

var ansCheckEl = document.querySelector(".ansCheck");

var questionsSection = document.querySelector("#questions");

var time = document.getElementById("time");

let questionEl = document.querySelector(".question");

var nextButton = document.getElementById("nextQuestion");

var choiceAEl = document.querySelector(".choiceA");

var choiceBEl = document.querySelector(".choiceB");

var choiceCEl = document.querySelector(".choiceC");

var choiceDEl = document.querySelector(".choiceD");

var choicesButtonEl = document.querySelectorAll("#choiceButton");

var finalScoreEl = document.querySelector("#finalScore");

var highScoreSec = document.querySelector("#highScoreSec");

var submitSec = document.querySelector(".submitSec");

var completeSec = document.querySelector("#completion");

submitSec.setAttribute("class", "hide");
highScoreSec.setAttribute("class", "hide");

var currentQuestionIndex = 0;

var timeRemaining = 100;

var count = 0;

var score = 0;

var currentIndex = 0;

//array of all the questions
const questionsArray = [
  {
    question: "The first index of an array is __.",
    choices: ["a. All", "b. 1", "c. 5", "d. 0"],
    correctAnswer: "d. 0",
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["a. <script>", "b. <javascript>", "c. <scripting>", "d. <js>"],
    correctAnswer: "a. <script>",
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    choices: ["a. onmouseclick", "b. onclick", "c. onchange", "d. onmouseover"],
    correctAnswer: "b. onclick",
  },
  {
    question: "How to write an IF statement in JavaScript?",
    choices: [
      "a. if i == 5 then",
      "b. if i = 5 then",
      "c. if(i == 5)",
      "d. if i = 5",
    ],
    correctAnswer: "c. if(i == 5)",
  },
  {
    question: "How do you add a comment in a JavaScript?",
    choices: [
      "a. //comment",
      "b. <!--comment-->",
      "c. comment",
      "d. *comment *",
    ],
    correctAnswer: "a. //comment",
  },
  {
    question: "Arrays in JavaScript can be used to store _____.",
    choices: [
      "a. numbers and strings",
      "b. other arrays",
      "c. booleans",
      "d. all of the above",
    ],
    correctAnswer: "b. other arrays",
  },
];

//functions created
function beginButton() {
  //   console.log("start quiz button works");
  startScreen.setAttribute("class", "hide");
  questionsSection.classList.remove("hide");

  getQuestion(currentIndex);
  timer();
}

function finish() {
  questionsSection.setAttribute("class", "hide");
  submitSec.setAttribute("class", "block");

  finalScoreEl.textContent = "Score: " + score;
  time.setAttribute("class", "hide");
}

function getQuestion(index) {
  questionEl.textContent = questionsArray[index].question;

  choiceAEl.textContent = questionsArray[index].choices[0];

  choiceBEl.textContent = questionsArray[index].choices[1];

  choiceCEl.textContent = questionsArray[index].choices[2];

  choiceDEl.textContent = questionsArray[index].choices[3];

  currentIndex = index;

  ansCheckEl.classList.remove("hide");
  ansCheckEl.textContent = "";

}

// loop through choices array and create a button element for each choice
// append buttons to choices div

function timer() {
  var timeInt = setInterval(function () {
    time.textContent = "Time remaining: " + timeRemaining + " s ";
    timeRemaining--;

    if (timeRemaining <= 0) {
      clearInterval(timeInt);
      time.textContent = "time's up";
      completeSec.textContent = "time's up";
      finish();
    } else if (count >= questionsArray.length) {

      clearInterval(timeInt);
      
      finish();
    }
  }, 1000);
}

function checkResponse(event) {
  event.preventDefault();
  //setTimeout(function(){ ansCheckEl.setAttribute("class", "hide"); } ,3500);

  console.log(questionsArray[currentIndex].correctAnswer);
  console.log(event.target.textContent);

  if (questionsArray[currentIndex].correctAnswer == event.target.textContent) {
    ansCheckEl.textContent = "correct";
    score++;
  } else {
    timeRemaining = timeRemaining - 5;
    ansCheckEl.textContent =
      "incorrect, the correct choice was " +
      questionsArray[currentIndex].correctAnswer;
  }
  setTimeout(function () {
    ansCheckEl.setAttribute("class", "hide");
    if (currentIndex < questionsArray.length) {
      getQuestion(currentIndex + 1);
    } else {
      finish();
    }
    count++;
  }, 3000);
}

startButton.onclick = beginButton;

choicesButtonEl.forEach(function (click) {
  click.addEventListener("click", checkResponse);
});

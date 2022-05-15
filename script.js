const btnStart = document.getElementById("btn-start");
const landingPage = document.getElementById("landing-page");
const spanTimer = document.getElementById("span-timer");

const questionPage = document.getElementById("question-page");
const questionTitle = document.getElementById("question-title");
const choicesList = document.getElementById("choices-list");
const choicesButtons = document.getElementById("choices.buttons");
const answerFeedback = document.getElementById("feedback-comment");

const endGamePage = document.getElementById("end-game-page");
let userScore = document.getElementById("score");
let userName = document.getElementById("input-user-name");
const btnSubmitName = document.getElementById("btn-submit-name");

const savedScorePage = document.getElementById("highscore-page");
const preScoresList = document.getElementById("pre-scores");
const restartButton = document.getElementById("restart");

let timeRemaining = 60; // 60 seconds
spanTimer.textContent = timeRemaining;
let timerId;
let CurrentQuestion = 0;

console.log(questions);

function checkAnswer(event) {
  event.preventDefault();

  // when the user clicks on the choice btn
  // Check if user answered correctly

  const isCorrect = event.target.getAttribute("data-is-correct") === "true";

  console.log(isCorrect);

  // if correct
  if (isCorrect) {
    answerFeedback.textContent = "Your answer is correct!";
  } else {
    // if wrong
    answerFeedback.textContent = "Incorrect!";

    // deduct the time by 10 seconds
    timeRemaining = timeRemaining - 10;
  }

  // 2

  // move on the next question
  CurrentQuestion = CurrentQuestion + 1;

  // if no questions left, we will end the game.
  if (CurrentQuestion >= questions.length) {
    // end the game
    return endGame();
  }
  // 3
  renderQuestion(CurrentQuestion);
}

function renderQuestion(questionIndex) {
  // get the questions from questions array
  const question = questions[questionIndex];

  // get the title, put in the DOM
  const title = question.title;

  // get the choices
  const choices = question.choices;

  questionTitle.textContent = title;

  // clear the existing li
  choicesList.textContent = "";

  // loop through it
  for (let index = 0; index < choices.length; index++) {
    const choice = choices[index];

    // generate button, put in the DOM
    const li = document.createElement("li");
    const button = document.createElement("button");

    button.classList.add("btn-choice");

    // add and attribute to id if answer is correct or not
    button.setAttribute("data-is-correct", choice.isAnswer);

    button.textContent = choice.title;

    button.addEventListener("click", checkAnswer);

    li.appendChild(button);

    choicesList.append(li);
  }
}

function startTimer() {
  // timer is  --- a ticking clock
  // every passing second we decrease the clock by 1
  timerId = setInterval(function () {
    // timeRemaining--;
    timeRemaining = timeRemaining - 1;

    // when the time left is less <0
    if (timeRemaining < 0) {
      // end the game
      endGame();
    } else {
      spanTimer.textContent = timeRemaining;
    }
  }, 1000);
}

// When the user clicks on the start button
btnStart.addEventListener("click", function (event) {
  // hide the landing page
  landingPage.classList.add("hide");

  // show the first question
  questionPage.classList.remove("hide");

  // start the timer
  startTimer();

  renderQuestion(CurrentQuestion);
});

//end game page

function endGame() {
  // stop the timer
  clearInterval(timerId);

  // hide the question page
  questionPage.classList.add("hide");

  // show the end game screen
  endGamePage.classList.remove("hide");

  // set score for user based on time left.
  userScore.textContent = timeRemaining;
}

// when the user clicks on the submit btn
btnSubmitName.addEventListener("click", function (event) {
  event.preventDefault();
  
  const name = document.getElementById("input-user-name").value;

  let preScores = JSON.parse(localStorage.getItem("previous-scores"));
  if (preScores === null) {
    preScores = [];
  }

   const highscores = {
    name: name,
    score: timeRemaining,
  };

  preScores.push(highscores);

  localStorage.setItem("highscores", JSON.stringify(highscores));
  scoresBoard();
  
  //if user didn't enter initials or name.
 if (userName == "") {
  // (show the error message under the input)
  alert("Please enter your name or initials!");

  // throw an error in console
  throw "empty input";
  
}

  function scoresBoard() {
    clearInterval(timeRemaining);
    timerId.textContent = 0;
    savedScorePage.classList.remove("hide");
    endGamePage.classList.add("hide");

    // Display list
    const highscoreDataString = localStorage.getItem("highscores");
    const highscoreDt = JSON.parse(highscoreDataString);

    preScoresList.textContent = "";
    for (let index = 0; index < highscoreDt.length; index++) {
      const highscores = highscoreDt[index];

      const li = document.createElement("li");
      li.textContent = highscores.name + "-" + highscores.score;

      preScoresList.append(li);
    }
  }

});


// When user clicks on the restart btn
restartButton.addEventListener("click", function (event) {
  timeRemaining = 60;
  // spanTimer.textContent = timeRemaining;
  CurrentQuestion = 0;
  // endGamePage.classList.add("hide");

  // Hide high score page
  savedScorePage.classList.add("hide");

  // show landing page
  landingPage.classList.remove("hide");
});

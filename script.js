const btnStart = document.getElementById("btn-start");
const landingPage = document.getElementById("landing-page");
const questionPage = document.getElementById("question-page");
const answerFeedback = document.getElementById("feedback-comment");
const endGamePage = document.getElementById("end-game-page");
const spanTimer = document.getElementById("span-timer");
const choicesList = document.getElementById("choices-list");
const questionTitle = document.getElementById("question-title");
const btnSubmitName = document.getElementById("btn-submit-name");
const inputUserName = document.getElementById("input-user-name");
const userName = document.getElementById("user-name");
const userScore = document.getElementById("score");
const highscorePage = document.getElementById("highscore-page");
const highscoreList = document.getElementById("highscore-list");

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

function endGame() {
  // stop the timer
  clearInterval(timerId);

  // hide the question page
  questionPage.classList.add("hide");

  // show the end game screen
  endGamePage.classList.remove("hide");
}

function startTimer() {
  // timer is  --- a ticking clock
  // every passing second we decrease the clock by 1
  timerId = setInterval(function () {
    // timeRemaining--;
    timeRemaining = timeRemaining - 1;

    // when the timeleft is less <0
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

// end game screen
// when the user clicks on the submit btn

btnSubmitName.addEventListener("click", function (event) {
  event.preventDefault();
  const userInput = inputUserName.value;
  console.log(userInput);

  // if user didn't enter anything in the field

  if (userInput == "") {
    // (show the error message under the input)
    alert("Please enter your name or initials!");

    // throw an error
    throw "empty input";
  }

  let highscoreList = JSON.parse(localStorage.getItem("highscore-list"));
  if (highscoreList === null) {
      highscoreList = [];
  }

  // save the user name to the hs list --- local storage
  localStorage.setItem("userName", userInput);
  localStorage.setItem("score", "data-is-correct");

  console.log(score);

  // Highscore is the end game score.
  // highscore should contain user name and score.
function displayHighScore() {
    clearInterval(timerId);
    timeRemaining.inputUserName = 0;
    highscoreList.classList.remove('hide');
    endGamePage.classList.add('hide');

}
  //  Array of names + scores

  const highScore = ["userName", "score"]

  const highScore = {userName:"Name", score:0}
  document.getElementById(),this.innerHTML = highScore;

  // show the highscore page
});

// highscore page
// grab the items from local storage
// render it as a list

// user can play again by clicking play again button
restartButton.addEventListener('click', function (event) {
    clearInterval(timerInterval);
    timeRemaining = 60;
    timerElement.textContent = timeRemaining;
    endGamePage.classList.add('hide');
    highScores.classList.add('hide');
    landingPage.classList.remove('hide');
    questionIndex = 0;
});


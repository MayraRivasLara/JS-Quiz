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
let inputUserName = document.getElementById("input-user-name");
const btnSubmitName = document.getElementById("btn-submit-name");

const highscorePage = document.getElementById("highscore-page");
const highscoreList = document.getElementById("highscore-list");
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
  
  const userName = document.getElementById("input-user-name").value;

  // if user didn't enter anything in the field

  if (userName == "") {
    // (show the error message under the input)
    alert("Please enter your name or initials!");

    // throw an error
    throw "empty input";
  }

  // hide end game page
  endGamePage.classList.add("hide");

  // Show high score page
  highscorePage.classList.remove("hide");


  // render highscores in a list - Add the new score to the existing scores - if exist.
  // Local Storage

  let previousHighScores = JSON.parse(localStorage.getItem("highscore-list"));

  if (previousHighScores === null) {
    previousHighScores = [];
  }

  const topPlayer = {
    name: userName,
    score: timeRemaining,
  };

  previousHighScores.push(topPlayer);

  localStorage.setItem("highscore-list", JSON.stringify(previousHighScores));

   
  
  //   const topScoresList = localStorage.getItem("highscore-list");
  //   const highScoreData = JSON.parse(topScoresList);

  //   highscoreList.textContent = "";
  //   for (let index = 0; index < highScoreData.length; index++) {
  //     const topScore = highScore[index];

  //     const list = document.createElement("li");

  //     list.textContent = topScore.userName + "-" + topScore.score;

  //     highscoreList.append(li);
  //   }
  // }

  // highScoreList.sort();

  // if (highScoreList.length > 10) {
  //   highScoreList.shift();
  // }

  // localStorage.setItem("highScores", JSON.stringify(highScoreList))

  // console.log(userScore);
});

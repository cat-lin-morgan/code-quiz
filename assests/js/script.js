//variables
var questions = [
    {
        text: "CAn you get knocked up off a dirty old cum rag?",
        answers: [
            {
                text: "Only on Sundays.", 
                correct: true,
            },
            {
                text: "Never",
                correct: false,
            },
            {
                text: "Yes",
                correct: false,
            },
            {
                text: "Only if it's fresh.",
                correct: false,
            }
        ]
    }
];

var localStorageName = "highscores";
var defaultCurrentQuestion = 0;
var currentQuestion = defaultCurrentQuestion;
var defaultCurrentScore = 0;
var currentScore = defaultCurrentScore;
var defaultCurrentTimer = 75;
var currentTimer = defaultCurrentTimer;
var timePenalty = 10;
var quizContainerEl = document.querySelector('#quiz-container');
var scoreEl = document.querySelector('#view-score');
var timerEl = document.querySelector('#timer');
var highScoresBtnEl = document.querySelector("#view-score");

//create element helper function
var createElement = function (type, properties) {
    // Type should be a string, properties should be an object
    var element = document.createElement(type);
    if (properties != null || properties != undefined) {
        var propertyKeys = Object.keys(properties);
        for (var i = 0; i < propertyKeys.length; i++) {
            element.setAttribute(propertyKeys[i], properties[propertyKeys[i]])
        }
    }
    return element;
};

var destroyElement = function () {
    quizContainerEl.innerHTML = null;
}

//first page
var displayStartScreen = function() {
    destroyElement();
    //show welcome message and start button
    var headerOne = createElement("h1");
    headerOne.textContent = "Welcome To Cat's Coding Quiz";
    var introParagraph = createElement("p");
    introParagraph.textContent = "Click thru the questions in a short amount of time to prove your worth of being in the class.";
    //assign startGame to start button
    var startBtn = createElement("button");
    startBtn.textContent = "Start Game";
    startBtn.addEventListener("click", startGame);
    quizContainerEl.appendChild(headerOne);
    quizContainerEl.appendChild(introParagraph);
    quizContainerEl.appendChild(startBtn);
}

//timer start function
var startCountdown = function() {
    //every second decrease timer by one
    var timeInterval = setInterval(function() {
        if (currentTimer === 0) {
            clearInterval(timeInterval);
            //if timer is zero clear timer and call stopGame
            timerEl.textContent = "You're out of time!!!";
            displayStopGame();
        } else {
            currentTimer--;
            timerEl.textContent = currentTimer;
        }
    }, 1000);
}

var resetGame = function () {
    //set current q, current score, and current time
    currentTimer = defaultCurrentTimer;
    currentQuestion = defaultCurrentQuestion;
    currentScore = defaultCurrentScore;

}

//start quiz function
var startGame = function() {
    //will call reset game
    resetGame();
    //call start countdwon
    startCountdown();
    //call display current question
    displayCurrentQuestion();
}

var incorrectAnswer = function () {
    //take away time
    currentTimer - timePenalty;
    var judgementEl = document.querySelector("#judgements");
    judgementEl.textContent = "WRONG!!!";
    //display next question
    setTimeout(() => {  
        displayCurrentQuestion(); 
    }, 1500);
}

var correctAnswer = function() {
    //increase current score
    currentScore = currentScore + 10;
    var judgementEl = document.querySelector("#judgements");
    judgementEl.textContent = "CORRECT!!!";
    //display next question
    setTimeout(() => {  
        displayCurrentQuestion(); 
    }, 1500);
}

var displayCurrentQuestion = function () {
    destroyElement();
    //if there are no more questions then call stopGame
    if (currentQuestion >= questions.length) {
        console.log("out of questions");
        displayStopGame();
        return;
    }
    //looks up current questions in questions array
    var question = questions[currentQuestion]
    //creat dom elements and display them
    var questionHeader = createElement("h2");
    questionHeader.textContent = question.text;
    quizContainerEl.appendChild(questionHeader);
    var answers = question.answers;
    for (var i = 0; i < answers.length; i++){
        var answer = answers[i];
        var answerBtn = createElement("button");
        answerBtn.textContent = answer.text;
        quizContainerEl.appendChild(answerBtn);
        //assign incorrect and correct buttons
        if (answer.correct === true) {
            answerBtn.addEventListener("click", correctAnswer);
        } else {
            answerBtn.addEventListener("click", incorrectAnswer);
        }
    }
    var judgement = createElement("div", {id: "judgements"});
    quizContainerEl.appendChild(judgement);
    //increment currents questions
    currentQuestion++;
}

//stop quiz
var displayStopGame = function () {
    //stop timer
    destroyElement();
    //the new page renders
    var finalScoreHeader = createElement("h2");
    finalScoreHeader.textContent = "You're done!";
    var finalScoreText = createElement("p");
    finalScoreText.textContent = "Your final score is " + currentScore + ".";
    quizContainerEl.appendChild(finalScoreHeader);
    quizContainerEl.appendChild(finalScoreText);
    //render input and submit button
    var initialForm = createElement("form");
    var initialFormLabel = createElement("label", {for: "initials"});
    initialFormLabel.textContent = "Enter Initials:";
    var initialFormInput = createElement("input", {type: "text", id: "initials", placeholder: "Enter My Void."});
    var initialFormBtn = createElement("button");
    initialFormBtn.textContent = "Yeet";
    initialForm.addEventListener("submit", handleSubmit);
    //append all items inside the form
    initialForm.appendChild(initialFormLabel);
    initialForm.appendChild(initialFormInput);
    initialForm.appendChild(initialFormBtn);
    quizContainerEl.appendChild(initialForm);
}

var clearHighScores = function () {
    localStorage.setItem(localStorageName, "");
    displayHighScore();
}

//assign sumbitlocalstorage to submit button
var handleSubmit = function () {
    var playerInitials = document.querySelector("#initials").value;
    submitLocalStorage(playerInitials, currentScore);
    displayHighScore();
}

var loadHighScores = function() {
    var scores = localStorage.getItem(localStorageName);
    if (scores === null || scores === "") {
        scores = [];
    } else {
        scores = JSON.parse(scores);
    }
    return scores;
}

var submitLocalStorage = function (initials, highscore) {
    //load highscors and assign to variable
    var scores = loadHighScores();
    var newHighScore = {
        initials: initials,
        highscore: highscore,
    }
    //add the initials and highscore to highscore list
    scores.push(newHighScore);
    //write the updates list to local storage
    localStorage.setItem(localStorageName, JSON.stringify(scores));
}

//display high scores
var displayHighScore = function() {
    destroyElement();
    //gives button options to delete highscore 
    var finalScoreHeader = createElement("h2");
    finalScoreHeader.textContent = "High Scores";
    quizContainerEl.appendChild(finalScoreHeader);
    var clearScoresBtn = createElement("button");
    clearScoresBtn.textContent = "Wipe away your dreams.";
    clearScoresBtn.addEventListener("click", clearHighScores);
    var goBackBtn = createElement("button");
    goBackBtn.textContent = "Go back.";
    goBackBtn.addEventListener("click", displayStartScreen);
    //displays whats in local storage as dom elements on high score table
    //loadinng high scores and submiting to variable
    var scores = loadHighScores();
    //if no highscores, show empty state
    if (scores.length === 0) {
        var emptyOption = createElement("p");
        emptyOption.textContent = "No highscores to display!";
        quizContainerEl.appendChild(emptyOption);
    } else {
        //loop through the array and make each element for page
        for (var i = 0; i < scores.length; i++) {
            var score = scores[i];
            var scoreRow = createElement("div");
            scoreRow.textContent = (i + 1) + ". " + score.initials + " - " + score.highscore;
            quizContainerEl.appendChild(scoreRow);
        }
    }
    quizContainerEl.appendChild(clearScoresBtn);
    quizContainerEl.appendChild(goBackBtn);
    
}

//call display start screen
displayStartScreen();
highScoresBtnEl.addEventListener("click", displayHighScore);


//noticed bugs
//timer doesn't restart on new game
//you can submit blank initials
//pause timer when you end the game
//doesn't display high score yet
//create highscore in local score if it doesn't exist
//variables
var questions = [];
var currentQuestion = 0;
var currentScore = 0;
var timer = 75;
var quizContainerEl = document.querySelector('#quiz-container');
var scoreEl = document.querySelector('#view-score');
var timerEl = document.querySelector('#timer');

//helper function
//create highscore in local score if it doesn't exist
//create element helper function
var createElement = function (type, properties) {
    var element = document.createElement(type)
    var propertyKeys = object.keys(properties)
    for (var i = 0; i < propertyKeys.length; i++) {
        element.setAttribute(propertyKeys[i], properties[i])
    }
    return element;
}

//first page
var displayStartScreen = function() {
    //show welcome message and start button
    //assign startGame to star button
}

//timer start function
var startCountdown = function() {
        //every second decrease timer by one
        //if timer is zero clear timer and call stopGame
}

var resetGame = function () {
    //set current q, current score, and current original values
}

//start quiz function
var startGame = function() {
    //will call reset game
    //call start coountdwon 
    //call display current question
}

var incorrectAnswer = function () {
    //going to display wrong answer and take away time
}

var correctAnswer = function() {
    //display correct answer and increase current score
}

var displayCurrentQuestion = function () {
    //if there are no more questions then call stopGame
    //looks up current questions in questions array
    //creat dom elements and display them
    //assign incorrect and correct buttons
    //increment currents questions
    //displayCurretnQuestions will call itself
}

//stop quiz
var displayStopGame = function () {
    //render input and submit button
    //assign sumbitlocalstorage to submit button
}

var submitLocalStorage = function (name, highscore) {
    //add name and score to local storage
}

//display high scores
var displayHighScore = function() {
    //displays whats in local storage as dom elements
    //gives button options to delete highscore 
    //or calls displaystartscreen
}

//call display start screen

//button to start quiz and other events
//add start game to button click event
var mainEl = document.getElementById('main');
var subMainEl = document.getElementById('submain');
var timerEl = document.getElementById('countdown');
var arrAnswers = [{question: "question 1"
                  ,answer1: "answer 1-1"
                  ,answer2: "answer 1-2"
                  ,answer3: "answer 1-3"
                  ,answer4: "answer 1-4"
                  ,correct: "answer3"}
                  ,{question: "question 2"
                  ,answer1: "answer 2-1"
                  ,answer2: "answer 2-2"
                  ,answer3: "answer 2-3"
                  ,answer4: "answer 2-4"
                  ,correct: "answer1"}
                  ,{question: "question 3"
                  ,answer1: "answer 3-1"
                  ,answer2: "answer 3-2"
                  ,answer3: "answer 3-3"
                  ,answer4: "answer 3-4"
                  ,correct: "answer4"}
                  ,{question: "question 4"
                  ,answer1: "answer 4-1"
                  ,answer2: "answer 4-2"
                  ,answer3: "answer 4-3"
                  ,answer4: "answer 4-4"
                  ,correct: "answer2"}
                  ,{question: "question 5"
                  ,answer1: "answer 5-1"
                  ,answer2: "answer 5-2"
                  ,answer3: "answer 5-3"
                  ,answer4: "answer 5-4"
                  ,correct: "answer4"}];
var quizEl = document.getElementById('questions');
var message =
  'Some say the world will end in 🔥, Some say in ice. From what I’ve tasted of desire, I hold with those who favor fire. But if it had to perish twice, I think I know enough of hate. To say that for destruction ice, Is also great, And would suffice.';
var words = message.split(' ');
var numQuestion = 0;
// Timer that counts down from 5
function startQuiz() {
  var timeLeft = 75;
  var timeInterval = setInterval(function () {
    mainEl.textContent = "";
    subMainEl.textContent = "";
    timerEl.textContent = "Time: " + timeLeft;
    timeLeft--;
    var listAnswers = "";
    var question = "";
    var correctResponse = "";
    var questionEl = document.createElement("div");
    questionEl.className = "questionnaire";
    questionEl.id = "question";
    question = "<h1>" + arrAnswers[numQuestion].question + "</h1>"
    listAnswers = listAnswers + "<button id='answer1' class='btn'>" + arrAnswers[numQuestion].answer1 + "</button>";
    listAnswers = listAnswers + "<button id='answer2' class='btn'>" + arrAnswers[numQuestion].answer2 + "</button>";
    listAnswers = listAnswers + "<button id='answer3' class='btn'>" + arrAnswers[numQuestion].answer3 + "</button>";
    listAnswers = listAnswers + "<button id='answer4' class='btn'>" + arrAnswers[numQuestion].answer4 + "</button>";
    questionEl.innerHTML = question + listAnswers;
    mainEl.appendChild(questionEl);
    correctResponse = arrAnswers[numQuestion].correct;
    var AnswerBtn = document.getElementById("question");
    AnswerBtn.addEventListener("click", function(event){
      var userResponse = event.target.id;
      numQuestion++;
      var showCorrect = document.createElement("div");;
      showCorrect.className = "prueba"
      if (userResponse === correctResponse){
        console.log("RESPUESTA CORRECTA");
        showCorrect.innerHTML = "</ hr><p>CORRECT</p>"
      }else{
        console.log("RESPUESTA INCORRECTA");
        showCorrect.innerHTML = "</ hr><p>INCORRECT</p>"
        timeLeft = timeLeft-10;
      };
      subMainEl.appendChild(showCorrect);
    });
    if (timeLeft < 0 || numQuestion === arrAnswers.length){
        clearInterval(timeInterval);
        timerEl.textContent = "";
        mainEl.textContent = "se acabo";
        //quizResults();
    }
  }, 1000);
}

// Displays the message one word at a time
function quizResults() {
  var wordCount = 0;

  // Uses the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var msgInterval = setInterval(function () {
    // If there are no more words left in the message
    if (words[wordCount] === undefined) {
      // Use `clearInterval()` to stop the timer
      clearInterval(msgInterval);
    } else {
      // Display one word of the message
      mainEl.textContent = words[wordCount];
      wordCount++;
    }
  }, 1000);
}
var intro = function(){
    var introEl = document.createElement("div");
    introEl.className = "intro";
    introEl.innerHTML = "<h1>Coding Quiz Challenge</h1><p>Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score time by 10 seconds.</p><button id='start' class='btn'>Start Quiz</button>";
    mainEl.appendChild(introEl);
    var startBtn = document.querySelector("#start");
    startBtn.addEventListener("click",startQuiz);
};
intro();
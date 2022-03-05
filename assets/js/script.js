/* ------------------------- */
/* Project  : Code Quiz      */
/* File     : script.js      */
/* Author   : Vicente Garcia */
/* Date     : 03/01/2022     */
/* Modified : 03/05/2022     */
/* ------------------------- */
var headerEl = document.getElementById('header');
var mainEl = document.getElementById('main');
var subMainEl = document.getElementById('submain');
var arrQuiz = [{question: "What is one advantage of Responsive Design for a developer?"
                 ,answer: ["Faster page loading time"
                          ,"Faster development"
                          ,"More social sharing"
                          ,"Improved SEO"]
                ,correct: 1}
              ,{question: "When using flexbox, which property needs to be adjusted in order to add space between items?"
                 ,answer: ["justify-content"
                          ,"flex-flow"
                          ,"align-content"
                          ,"space-between"]
                ,correct: 0}
              ,{question: "What is a CSS reset?"
                 ,answer: ["Deleting the contenst of a stylesheet to implement entirely new design"
                          ,"A CSS property that resets the values of child elements"
                          ,"A media query that resets the responsive design when switching devices"
                          ,"A stylesheet that clears the default formatting of the browser"]
                ,correct: 3}
              ,{question: "What is wireframing? "
                 ,answer: ["A blueprint of our website's page layout"
                          ,"A 3D model of our websites structure made from wires"
                          ,"Wireframing helps us quickly set up our HTML page"
                          ,"A CSS library that helps in the creation of borders around our boxed elements"]
                ,correct: 0}
              ,{question: "How do we stop a loop from from repeating indefinitely?"
                 ,answer: ["We have to explicitly end the loop with the break keyword"
                          ,"A loop will stop executing when the condition is true"
                          ,"A loop will stop executing when the condition is false"
                          ,"When we have iterated through half of the condition"]
                ,correct: 2}
              ,{question: "What is the purpose of the 'This' operator?"
                 ,answer: ["This' keyword lets us make a reference to our window gives us access to special object methods"
                          ,"The keyword 'This' refers to the object it is in. 'This' changes based on which object it is in when being called"
                          ,"This' keyword allows us to specify certain variables to it which can be used in the global scope"
                          ,"This' is an array where we can easily store global variables for when we need access to them"]
                ,correct: 1}
              ,{question: "What is an object method?"
                 ,answer: ["Keys in an object that have a number assigned to it"
                          ,"A function that takes an object for an argument"
                          ,"A function associated with an object"
                          ,"An array saved inside of an object"]
                ,correct: 2}
              ,{question: "What is an API?"
                 ,answer: ["Application Protocol Interface. It allows two applications to communicate if they are both using the same server"
                          ,"Application Programming Interface. It allows two applications to communicate with each other"
                          ,"Application Path Interface. It allows two applications to run in tandem"
                          ,"Application Programming Installer. It allows applications to be installed onto the users computer"]
                ,correct: 1}
              ,{question: "Why do we need to convert an object into JSON in order for it to properly persist to local storage?"
                 ,answer: ["Local storage can only store strings, so we convert the object to JSON to store it properly"
                          ,"Local storage only accepts JSON objects"
                          ,"It is convention to store objects using JSON, and we must follow that pattern so that our code is easy to read"
                          ,"Local storage cannot read JavaScript, so we convert JavaScript into JSON"]
                ,correct: 0}
              ,{question: "What is jQuery UI?"
                 ,answer: ["jQuery UI is a set of user interface website templates"
                          ,"jQuery UI is a framework to create interactive user interfaces"
                          ,"jQuery UI is a design pattern that has to be used when creating interactive UI's with JavaScript"
                          ,"jQuery UI is a curated set of user interface widgets, effects, and themes that extends the functionality of the core jQuery library"]
                ,correct: 3}
              ];
var score = 0;
var viewScores = true;
var initialsScore = [];
var saveScore = function(){
  localStorage.setItem("scoreQuiz", JSON.stringify(initialsScore));
}
var loadScore = function(){
  initialsScore = JSON.parse(localStorage.getItem('scoreQuiz'));
  if(!initialsScore){
    initialsScore = [];
  };
};
var highScore = function(){
  if(viewScores){
  mainEl.textContent = "";
  headerEl.textContent = "";
  loadScore();
  var scoreEl = document.createElement("div");
  var scores="";
  scoreEl.className = "highScore";
  for(i=0;i<initialsScore.length;i++){
    scores = scores + "<p>"+ initialsScore[i].initials + " - " + initialsScore[i].score + "</p>";
  }
  scoreEl.innerHTML = "<h1>High Scores</h1>" + scores + "<button id='return' class='btn'>Go Back</button><button id='delete' class='btn'>Clear High Scores</button>";
  mainEl.appendChild(scoreEl);
  var returnBtn = document.querySelector("#return");
  returnBtn.addEventListener("click",function(){
    intro();
  });
  var deleteBtn = document.querySelector("#delete");
  deleteBtn.addEventListener("click",function(){
    initialsScore = [];
    saveScore();
    highScore();
  });
}
};
var quizResults = function() {
  viewScores = true;
  var resultEl = document.createElement("div");
  resultEl.className = "score";
  resultEl.innerHTML = "<h1>All done!</h1><p>Your final score is " + score + "</p>";
  mainEl.appendChild(resultEl);
  var saveEl = document.createElement("div");
  if (score > 0){
    saveEl.className = "save";
    saveEl.innerHTML ="<p>Enter your initials: </p><input type='text' name='score' maxlength='5'><button id='submit' class='btn'>Submit</button>";
    mainEl.appendChild(saveEl);
    var submitBtn = document.querySelector("#submit");
    submitBtn.addEventListener("click",function(){
    var initialsInput = document.querySelector("input[name='score']").value;
    if (initialsInput){
      var actualScore = [];
      actualScore = {
        initials: initialsInput,
        score: score
      };
      loadScore();
      initialsScore.push(actualScore);
      saveScore();
      highScore();
    }
  });
  }else{
    saveEl.className = "save";
    saveEl.innerHTML ="<button id='fail' class='btn'>Go Back</button>";
    mainEl.appendChild(saveEl);
    var failBtn = document.querySelector("#fail");
    failBtn.addEventListener("click",function(){
      intro();
    });
  }
};
var startQuiz = function(){
  var timerEl = document.getElementById('countdown');
  var timeLeft = 75;
  var numQuestion = 0;
  var load = true;
  score = 0;
  viewScores = false;
  var timeInterval = setInterval(function () {
    timerEl.textContent = "Time: " + timeLeft;
    timeLeft--;
    if (load){
      subMainEl.textContent = "";
      mainEl.textContent = "";
      var listAnswers = "";
      var question = "";
      var correctResponse = "";
      var numAnswer = 0;
      var questionEl = document.createElement("div");
      questionEl.className = "questionnaire";
      questionEl.id = "question";
      try{
        question = "<h1>" + arrQuiz[numQuestion].question + "</h1>";
        for(i=0;i<arrQuiz[numQuestion].answer.length;i++){
          numAnswer = i + 1;
          listAnswers = listAnswers + "<button id='answer" + i + "' class='btn answer'>" + numAnswer + ". " + arrQuiz[numQuestion].answer[i] + "</button>";
        }
        questionEl.innerHTML = question + listAnswers + "<hr width=100% color= black>";
        mainEl.appendChild(questionEl);
        correctResponse = "answer" + arrQuiz[numQuestion].correct;
        load = false;
        var AnswerBtn = document.getElementById("question");
        AnswerBtn.addEventListener("click", function(event){
          var userResponse = event.target.id;
          numQuestion++;
          load = true;
          var showResult = document.createElement("div");
          showResult.className = "result";
          if (userResponse === correctResponse){
            score = score + 1;
            showResult.innerHTML = "<p>CORRECT!</p>"
          }else{
            showResult.innerHTML = "<p>WRONG!</p>"
            timeLeft = timeLeft-10;
          };
          subMainEl.appendChild(showResult);
        });
      }catch(ArrayIndexOutOfBoundsException){
        // Catch when there are not more values in the array, just after all the questions have been answered
      };
    };
    if (timeLeft < 0 || numQuestion === arrQuiz.length){
      timeLeft = Math.max(timeLeft,0);
      score = score + timeLeft ;
      clearInterval(timeInterval);
      timerEl.textContent = "";
      mainEl.textContent = "";
      subMainEl.textContent = "";
      quizResults();
    }
  }, 1000);
};
var intro = function(){
    mainEl.textContent = "";
    headerEl.textContent = "";
    viewScores = true;
    var navEl = document.createElement("div");
    navEl.className = "nav";
    navEl.innerHTML = "<h1 class='scores'><a href='#' onclick='highScore()'>View high scores</a></h1><h1 id='countdown'></h1>"
    headerEl.appendChild(navEl);
    var introEl = document.createElement("div");
    introEl.className = "intro";
    introEl.innerHTML = "<h1>Coding Quiz Challenge</h1><p>Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score time by 10 seconds.</p><button id='start' class='btn'>Start Quiz</button>";
    mainEl.appendChild(introEl);
    var startBtn = document.querySelector("#start");
    startBtn.addEventListener("click",startQuiz);
};
intro();
//highScore();
//quizResults();
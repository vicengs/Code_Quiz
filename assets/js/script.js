/* ------------------------- */
/* Project  : Code Quiz      */
/* File     : script.js      */
/* Author   : Vicente Garcia */
/* Date     : 03/01/2022     */
/* Modified : 03/05/2022     */
/* ------------------------- */
// Objects in HTML structure
var headerEl = document.getElementById('header');
var mainEl = document.getElementById('main');
var subMainEl = document.getElementById('submain');
// Questions and answers array
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
// Global variables to use in all functions to avoid arguments
var score = 0;
var viewScores = true;
var initialsScore = [];
// Function to save (set) in local storage the array scores
var saveScore = function(){
  localStorage.setItem("scoreQuiz", JSON.stringify(initialsScore));
}
// Function to get array scores from local storage
var loadScore = function(){
  initialsScore = JSON.parse(localStorage.getItem('scoreQuiz'));
  // If is the first time or the scores were deleted, return a empty array to avoid an error
  if(!initialsScore){
    initialsScore = [];
  };
};
// Funtion to show high scores
var highScore = function(){
  // If flag is on the high scores section will be loaded
  if(viewScores){
    // Clear section to create high scores section
    mainEl.textContent = "";
    headerEl.textContent = "";
    // Get array scores from function
    loadScore();
    // Create element to display high scores
    var scoreEl = document.createElement("div");
    scoreEl.className = "highScore";
    // Initialize variables
    var scores="";
    var maxScore = 0;
    var nextScore = 0;
    var minIndex = 0;
    var nextIndex = 0;
    var numPosition = 0;
    // Begin loop to iterate depending how many elements there are in the scores array
    for (i=0; i<initialsScore.length; i++){
      nextScore = 0;
      // Reverse loop to validate each value 
      for (j=initialsScore.length-1; j>=0; j--){
        if (maxScore === 0){
          // Enter just the first time when haven't the maximum score value
          if (initialsScore[j].score > nextScore){
            // Get maximum score in the array
            nextScore = initialsScore[j].score;
            nextIndex = j;
          };
        }else if (initialsScore[j].score === maxScore){
          // Enter if the next value is the same than actual max score (not necessarily the maximum score in the score array)
          if (j < minIndex){
            // If index is not the same that before index so is a new equal score
            nextScore = initialsScore[j].score
            nextIndex = j;
            // Quit the loop and return to main loop to avoid get another value that is not equal
            break;
          };
        }else if (initialsScore[j].score < maxScore && initialsScore[j].score > nextScore){
            // Enter if the actual score in the loop is less than las max score but is greater than the others in the score array
            nextScore = initialsScore[j].score;
            nextIndex = j;
        };
      };
      // Asign values from next high score to print
      maxScore = nextScore;
      minIndex = nextIndex;
      // Number of position score
      numPosition = numPosition + 1;
      // Generate HTML element with next record in the sorted list
      scores = scores + "<p>"+ numPosition + ". " + initialsScore[minIndex].initials + " - " + initialsScore[minIndex].score + "</p>";
    };
    // Create buttons to go back to main section or delete high scores
    scoreEl.innerHTML = "<h1>High Scores</h1>" + scores + "<button id='return' class='btn'>Go Back</button><button id='delete' class='btn'>Clear High Scores</button>";
    mainEl.appendChild(scoreEl);
    // Function on click back to return main page
    var returnBtn = document.querySelector("#return");
    returnBtn.addEventListener("click",function(){
      intro();
    });
    // Function on click delete to delete high scores
    var deleteBtn = document.querySelector("#delete");
    deleteBtn.addEventListener("click",function(){
      initialsScore = [];
      saveScore();
      // Reload clean high scores page
      highScore();
    });
  };
};
// Function to show quiz results
var quizResults = function() {
  // Create HTML element to show final score
  var resultEl = document.createElement("div");
  resultEl.className = "score";
  resultEl.innerHTML = "<h1>All done!</h1><p>Your final score is " + score + "</p>";
  mainEl.appendChild(resultEl);
  var saveEl = document.createElement("div");
  // If score is greater than zero enable option to save score
  if (score > 0){
    saveEl.className = "save";
    saveEl.innerHTML ="<p>Enter your initials: </p><input type='text' name='score' maxlength='5'><button id='submit' class='btn'>Submit</button>";
    mainEl.appendChild(saveEl);
    // Create section to submit score
    var submitBtn = document.querySelector("#submit");
    submitBtn.addEventListener("click",function(){
    var initialsInput = document.querySelector("input[name='score']").value;
    if (initialsInput){
      var actualScore = [];
      actualScore = {
        initials: initialsInput,
        score: score
      };
      // Load scores in local storage to push the last score generated at the last
      loadScore();
      initialsScore.push(actualScore);
      // Save new array of scores to local storage
      saveScore();
      // Flag on to show results on click to show scores
      viewScores = true;
      // Call function that show high scores
      highScore();
    }
  });
  // If score is zero just show button to back main page
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
// Function to startQuiz
var startQuiz = function(){
  // Create countdown element
  var timerEl = document.getElementById('countdown');
  // Initialize values
  var timeLeft = 75;
  var numQuestion = 0;
  score = 0;
  // Flag to avoid load page just one time each question
  var load = true;
  // Flag off to avoid show high scores while quiz is in progress
  viewScores = false;
  // Function on interval of 1 second to 75 seconds
  var timeInterval = setInterval(function () {
    timerEl.textContent = "Time: " + timeLeft;
    // Reduce 1 second to interval
    timeLeft--;
    // Check if load new question
    if (load){
      // Clear sections on page
      subMainEl.textContent = "";
      mainEl.textContent = "";
      // Declare variables
      var listAnswers = "";
      var question = "";
      var correctResponse = "";
      var numAnswer = 0;
      // Create HTML element to show question on screen
      var questionEl = document.createElement("div");
      questionEl.className = "questionnaire";
      questionEl.id = "question";
      // Try to catch exception if is the last question 
      try{
        question = "<h1>" + arrQuiz[numQuestion].question + "</h1>";
        // Loop to show answers to question
        for(i=0;i<arrQuiz[numQuestion].answer.length;i++){
          numAnswer = i + 1;
          listAnswers = listAnswers + "<button id='answer" + i + "' class='btn answer'>" + numAnswer + ". " + arrQuiz[numQuestion].answer[i] + "</button>";
        }
        questionEl.innerHTML = question + listAnswers + "<hr width=100% color= black>";
        mainEl.appendChild(questionEl);
        // Get correct response to validate versus user selection
        correctResponse = "answer" + arrQuiz[numQuestion].correct;
        // Disable load question until new question
        load = false;
        // Create call function on click response button
        var AnswerBtn = document.getElementById("question");
        AnswerBtn.addEventListener("click", function(event){
          var userResponse = event.target.id;
          // Flag to load next question (+1)
          numQuestion++;
          // Flag to avoid load new question
          load = true;
          // Show instant result a question answered
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
    // Validate if time is left or all questions were answered
    if (timeLeft < 0 || numQuestion === arrQuiz.length){
      // Get time left if it is negative change to zero to avoid negative scores
      timeLeft = Math.max(timeLeft,0);
      // Get score, 1 point each response correct plus time left
      score = score + timeLeft ;
      // Ends interval
      clearInterval(timeInterval);
      // Clear screen to show new section (quiz results)
      timerEl.textContent = "";
      mainEl.textContent = "";
      subMainEl.textContent = "";
      headerEl.textContent = "";
      // Call function to show result on screen
      quizResults();
    }
  }, 1000);
};
// Function to load intro page
var intro = function(){
    // Clear container
    mainEl.textContent = "";
    headerEl.textContent = "";
    // Flag to avoid view scores
    viewScores = true;
    // Create HTML element to show in screen
    var navEl = document.createElement("div");
    navEl.className = "nav";
    navEl.innerHTML = "<h1 class='scores'><a href='#' onclick='highScore()'>View high scores</a></h1><h1 id='countdown'></h1>"
    headerEl.appendChild(navEl);
    var introEl = document.createElement("div");
    introEl.className = "intro";
    introEl.innerHTML = "<h1>Coding Quiz Challenge</h1><p>Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score time by 10 seconds.</p><button id='start' class='btn'>Start Quiz</button>";
    mainEl.appendChild(introEl);
    // Create call startQuiz function on click start button
    var startBtn = document.querySelector("#start");
    startBtn.addEventListener("click",startQuiz);
};
// Load landing page
intro();
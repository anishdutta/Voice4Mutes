// Model

function Question(stem, choices, answer) {
  this.stem = stem;
  this.choices = choices;
  this.answer = answer
}

Question.prototype.checkAnswer = function(choice) {
  return (choice === this.answer);
}

// Controller

function Quiz(questionList) {
  this.score = 0;
  this.questionList = questionList;
  this.questionNo = 0;
};

Quiz.prototype.getCurrentQuestion = function() {
  return this.questionList[this.questionNo];
};

Quiz.prototype.isEnded = function() {
  return this.questionNo == this.questionList.length;
};

Quiz.prototype.evaluateAnswer = function(answer) {
  if (this.getCurrentQuestion().checkAnswer(answer)) {
    this.score++;
  };
  this.questionNo++;
}

// View

function populate() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    var element = document.getElementById('stem');
    element.innerHTML = quiz.getCurrentQuestion().stem;

    for (i = 0; i < quiz.getCurrentQuestion().choices.length; i++) {
      var element = document.getElementById('option' + i);
      element.innerHTML = quiz.getCurrentQuestion().choices[i];
      checkAnswer('option' + i, quiz.getCurrentQuestion().choices[i]);
      recordProgress();
    };
  }
};

function showScores() {
  var scoreString = "<h1>Scores</h1>";
  scoreString += "<h3>You scored " + quiz.score + " out of " + quiz.questionList.length + "</h3>"
  scoreString += "<div id='refresh' class='refresh'>Re-take Quiz</div>"
  var element = document.getElementById('quiz-area');
  element.innerHTML = scoreString;

  var reTake = document.getElementById('refresh');
  reTake.onclick = function() {
    refresh()
  }
};

function checkAnswer(htmlId, answer) {
  var element = document.getElementById(htmlId);
  element.onclick = function() {
    quiz.evaluateAnswer(answer);
    populate();
  };
};

function setProgressBar() {
  var element = document.getElementById('progress');
  element.setAttribute('max', quiz.questionList.length);
};

function recordProgress() {
  var element = document.getElementById('progress');
  element.setAttribute('value', quiz.questionNo);
}

function refresh() {
  var renewHTML = '<div class="quiz" id="quiz-area"><div class="stem" id="stem"></div><div class="choice-flexbox"><div class="options" id="option0"></div><div class="options" id="option1"></div><div class="options" id="option2"></div><div class="options" id="option3"></div><div class="options" id="option4"></div></div>	<div class="progress"><div><progress id="progress" max="100" value="0"></progress></div><div>Your progress</div></div></div>'
  var element = document.getElementById('wrap');
  element.innerHTML = renewHTML

  quiz.score = 0;
  quiz.questionNo = 0;
  populate();
  setProgressBar();
}
var questions = [
  new Question("<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Sign_language_A.svg/323px-Sign_language_A.svg.png'>", ["S", "A", "B", "H", "I"], "A"),
  new Question("<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Sign_language_G.svg/491px-Sign_language_G.svg.png'>", ["G", "A", "B", "H", "K"], "G"),
  new Question("<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Sign_language_L.svg/387px-Sign_language_L.svg.png'>", ["Z", "L", "N", "M", "A"], "L"),
  new Question("<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Sign_language_R.svg/233px-Sign_language_R.svg.png'>", ["S", "R", "N", "T", "Q"], "R"),
  new Question("<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sign_language_W.svg/280px-Sign_language_W.svg.png'>", ["F", "W", "B", "H", "A"], "W"),
  new Question("<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Sign_language_Q.svg/384px-Sign_language_Q.svg.png'>", ["Q", "M", "B", "N", "O"], "Q"),
  new Question("<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Sign_language_C.svg/416px-Sign_language_C.svg.png'>", ["L", "Q", "B", "P", "C"], "C"),
 
  
]

var quiz = new Quiz(questions);

populate();
setProgressBar();
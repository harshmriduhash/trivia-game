$(document).ready(function() {

triviaStart = false;
highScore = 0;
score = 0;
lives = 3;
lunatic = false;
gameover=0;

timer = 9;
var intervalId;
var timerRunning = false;

random = 0;
oldrandom=100;
currentQuestion = {};

var sndEasy = new Audio('audio/easy.mp3')
var sndCorrect = new Audio('audio/correct.wav');
var sndIncorrect = new Audio('audio/incorrect.wav');
var sndGameOver = new Audio('audio/gameover.wav');
var sndEasyStart = new Audio('audio/easystart.wav');
var sndLunaticStart = new Audio('audio/lunaticstart.wav');

$('#songplayer').get(0).play();

$('.answers').click(function(){
	if ($(this).attr("id") === currentQuestion.a) {
		score++;
		updateNumbers();
		sndCorrect.play();
		if(lunatic) {
			newQuestionLunatic();
		}
		else {
			newQuestion();
		}

	}
	else if (lives>1) {
		lives--;
		updateNumbers();
		sndIncorrect.play();
		$(this).css("visibility", "hidden");
	}
	else {
		lives--;
		updateNumbers();
		sndIncorrect.play();
		if(currentQuestion.a === 'answer1'){
			$('.answers').hide();
			$('#answer1right').show();
			$('#answer2wrong').show();
			$('#answer3wrong').show();
			$('#answer4wrong').show();
		}
		else if(currentQuestion.a === 'answer2'){
			$('.answers').hide();
			$('#answer1wrong').show();
			$('#answer2right').show();
			$('#answer3wrong').show();
			$('#answer4wrong').show();
		}
		else if(currentQuestion.a === 'answer3'){
			$('.answers').hide();
			$('#answer1wrong').show();
			$('#answer2wrong').show();
			$('#answer3right').show();
			$('#answer4wrong').show();
		}
		else if(currentQuestion.a === 'answer4'){
			$('.answers').hide();
			$('#answer1wrong').show();
			$('#answer2wrong').show();
			$('#answer3wrong').show();
			$('#answer4right').show();
		}
		stopwatch.reset();
		setTimeout(gameOver,3000);
	}	
	// else {
	// 	lives--;
	// 	$(this).css("visibility", "hidden");
	// 	gameOver();
	// }
});

$('#tutorialpage').click(function(){
	if(gameover < 1){
		sndEasyStart.play();
		lunatic = false;
		newQuestion();
	}
	else{
		return;
	}
});

$('#easymode').click(function(){
	sndEasyStart.play();
	newGameEasy();
});

$('#lunaticmode').click(function(){
	sndLunaticStart.play();
	newGameLunatic();
});

function newGameEasy(){
	if (lunatic){
		lunatic = false;
		document.getElementById("answerscontainer").style.backgroundImage="url('images/cirno.gif')";
		var audioElement = document.getElementById("songplayer");
  		audioElement.setAttribute("src", "audio/easy.mp3");
		$('#songplayer').get(0).play();
		newQuestion();

		// Used to empty Video
		$('#videocontainer').empty();
		$('.noselect').css("background-color","");
		$('.formulabox').css('color', 'blue');
		document.getElementById("tutorialcontainer").style.backgroundImage="url('images/cirno.gif')";
	}
	else {
		newQuestion();
	}
}

function newGameLunatic(){
	if (lunatic){
		newQuestionLunatic();
	}
	else {
		lunatic = true;
		// Swap Background and Music
		// document.getElementById("answerscontainer").style.backgroundImage="url('images/cirnolunatic.gif')";
		// var audioElement = document.getElementById("songplayer");
  		// audioElement.setAttribute("src", "audio/lunatic.mp3");
  		// $('#songplayer').get(0).play();

  		// Swap to Video
  		document.getElementById("answerscontainer").style.backgroundImage="url('')";
  		document.getElementById("tutorialcontainer").style.backgroundImage="url('')";
  		$('.formulabox').css('color', 'white');
  		$('.noselect').css("background-color","#1D181B");
  		$('#songplayer').get(0).pause();
  		$('#videocontainer').append('<video id="cirnomathclass" autoplay loop><source src="media/cirnomathclass.mp4" type="video/mp4"></video>');
  		newQuestionLunatic();
	}
}

function newQuestion(){
	$('#tutorialpage').hide();
	$('#triviapage').show();
	random = Math.floor(Math.random()*questions.length);
	console.log(random);
	// $('#retrybuttonscontainer').hide();
	if (random===oldrandom) {
		newQuestion();
	}
	else {
		currentQuestion = questions[random];
		$('#questiondisplay').text(questions[random].q);
		$('#questiondisplay').hide();
		$('#questiondisplay').show();
		$('#answer1').text(questions[random].a1);
		$('#answer2').text(questions[random].a2);
		$('#answer3').text(questions[random].a3);
		$('#answer4').text(questions[random].a4);
		$('#answer1right').text(lunaticquestions[random].a1);
		$('#answer2right').text(lunaticquestions[random].a2);
		$('#answer3right').text(lunaticquestions[random].a3);
		$('#answer4right').text(lunaticquestions[random].a4);
		$('#answer1wrong').text(lunaticquestions[random].a1);
		$('#answer2wrong').text(lunaticquestions[random].a2);
		$('#answer3wrong').text(lunaticquestions[random].a3);
		$('#answer4wrong').text(lunaticquestions[random].a4);
		// $('#questiondisplay').css("visibility", "visible")
		$('.answers').show();
		$('.answersright').hide();
		$('.answerswrong').hide();
		$('.answers').css("visibility", "visible");
		stopwatch.reset();
		stopwatch.start();
		oldrandom = random;
	}
};

function newQuestionLunatic(){
	$('#tutorialpage').hide();
	$('#triviapage').show();
	random = Math.floor(Math.random()*lunaticquestions.length);
	var consolerandom = random+1;
	console.log('lunatic question: '+consolerandom);
	// $('#retrybuttonscontainer').hide();
	if (random===oldrandom) {
		newQuestionLunatic();
	}
	else {
		currentQuestion = lunaticquestions[random];
		$('#questiondisplay').text(lunaticquestions[random].q);
		$('#answer1').text(lunaticquestions[random].a1);
		$('#answer2').text(lunaticquestions[random].a2);
		$('#answer3').text(lunaticquestions[random].a3);
		$('#answer4').text(lunaticquestions[random].a4);
		$('#answer1right').text(lunaticquestions[random].a1);
		$('#answer2right').text(lunaticquestions[random].a2);
		$('#answer3right').text(lunaticquestions[random].a3);
		$('#answer4right').text(lunaticquestions[random].a4);
		$('#answer1wrong').text(lunaticquestions[random].a1);
		$('#answer2wrong').text(lunaticquestions[random].a2);
		$('#answer3wrong').text(lunaticquestions[random].a3);
		$('#answer4wrong').text(lunaticquestions[random].a4);
		// $('#questiondisplay').css("visibility", "visible")
		$('.answers').show();
		$('.answersright').hide();
		$('.answerswrong').hide();
		$('.answers').css("visibility", "visible");
		stopwatch.reset();
		stopwatch.start();
		oldrandom = random;
	}
};

var stopwatch = {
	start: function() {
		if (!timerRunning) {
		
		updateNumbers();
		timerRunning = true;
           	if (!lunatic) {
        		intervalId = setInterval(stopwatch.count, 999);
        	}
        	if (lunatic) {
        		intervalId = setInterval(stopwatch.count, 666);
        	}
    	}
    },

    count: function() {
    	if (timer > 0){
	    	timer--;
	    	updateNumbers();

    	}
    	else if(lives>1){
    		lives--;
    		sndIncorrect.play();
    		stopwatch.reset();
    		updateNumbers();
	    		if(currentQuestion.a === 'answer1'){
					$('.answers').hide();
					$('#answer1right').show();
					$('#answer2wrong').show();
					$('#answer3wrong').show();
					$('#answer4wrong').show();
				}
				else if(currentQuestion.a === 'answer2'){
					$('.answers').hide();
					$('#answer1wrong').show();
					$('#answer2right').show();
					$('#answer3wrong').show();
					$('#answer4wrong').show();
				}
				else if(currentQuestion.a === 'answer3'){
					$('.answers').hide();
					$('#answer1wrong').show();
					$('#answer2wrong').show();
					$('#answer3right').show();
					$('#answer4wrong').show();
				}
				else if(currentQuestion.a === 'answer4'){
					$('.answers').hide();
					$('#answer1wrong').show();
					$('#answer2wrong').show();
					$('#answer3wrong').show();
					$('#answer4right').show();
				}
		    	if(lunatic){
		    			setTimeout(newQuestionLunatic,3000);
		    	}
		 		else{
		    			setTimeout(newQuestion,3000);
		    	}
    		}
		else {
			lives--;
			sndIncorrect.play();
			updateNumbers();
			if(currentQuestion.a === 'answer1'){
				$('.answers').hide();
				$('#answer1right').show();
				$('#answer2wrong').show();
				$('#answer3wrong').show();
				$('#answer4wrong').show();
			}
			else if(currentQuestion.a === 'answer2'){
				$('.answers').hide();
				$('#answer1wrong').show();
				$('#answer2right').show();
				$('#answer3wrong').show();
				$('#answer4wrong').show();
			}
			else if(currentQuestion.a === 'answer3'){
				$('.answers').hide();
				$('#answer1wrong').show();
				$('#answer2wrong').show();
				$('#answer3right').show();
				$('#answer4wrong').show();
			}
			else if(currentQuestion.a === 'answer4'){
				$('.answers').hide();
				$('#answer1wrong').show();
				$('#answer2wrong').show();
				$('#answer3wrong').show();
				$('#answer4right').show();
			}
			stopwatch.reset();
			setTimeout(gameOver,3000);
		}
    	},

    reset: function() {
    	timer = 9
    	timerRunning = false;
    	clearInterval(intervalId);
    }
}

function gameOver() {
	sndGameOver.play();
	updateNumbers();
	// $('.answers').css("visibility", "hidden");
	// $('#questiondisplay').css("visibility", "hidden")
	$('#retrybuttonscontainer').show();
	$('#tutorialpage').show();
	$('#triviapage').hide();
	console.log('gameOver');
	lives = 3;
	score = 0;
	stopwatch.reset();
	gameover++;
}

function updateNumbers() {
	$('#scoredisplay').text(score);
	$('#livesdisplay').text(lives);
	$('#timerdisplay').text(timer);
	if(lunatic){
		$('#finalscoredisplay').text('Lunatic Score: '+score);
	}
	else{
		$('#finalscoredisplay').text('Score: '+score);
	}
}

// do{
// 	gameOver();
// }
// while (lives<1);

});
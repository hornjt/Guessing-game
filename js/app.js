var randNum = 0, numGuesses = 0, guessArray = [];
var $overlay = $('<div id="overlay"></div>');
var $image = $('<img>');
newGame();

/*
Resets all buttons and fields for a new game
*/
function newGame() {
	randNum = Math.round(Math.random() * 100);
	numGuesses = 5;
	console.log(randNum);

	// Reactivate both buttons
	$('#submit').prop("disabled", false);
	$('#hint').prop("disabled", false);
	$('#giveAnswer').text("");
	$('#guesses').text(numGuesses + " guesses remaining");
	guessArray = [];
}

/*
Handles the math for higher or lower
*/
function doMath(num) {
	var diff = Math.abs(num - randNum);
	if (num === randNum) {
		gameOver("You are CORRECT!");
		buildOverlay();
	} 
	else if (num < randNum && diff > 25) {
		$('#direction').text("You are ice cold, guess higher");
		return true;
	}
	else if (num < randNum && diff <= 25) {
		$('#direction').text("You are warm, guess higher");
		return true; 
	} 
	else if (num >randNum && diff <= 25) {
		$('#direction').text("You are warm, guess lower");
		return true; 
	} 
	else {
		$('#direction').text("You are ice cold, guess lower");
		return true;
	}
}

/*
Check if number has been guessed before
*/
function checkGuesses(guess) {
	if (guessArray.indexOf(guess) !== -1) {
		$('#doubleGuess').text("You already guessed that number");
		return false;
	}
	/*
	for (var i = 0; i < guessArray.length; i++) {
		if (guessArray[i] === guess) {
			
		}
	}
	*/
	else {
		guessArray.push(guess);
		$('#doubleGuess').text("");	
		return true;
	}
	
}

/*
End game as winner or loser
*/
function gameOver(string) {
	$('#guesses').text(string);
	$('#direction').text("");
	$('#submit').prop("disabled", true);
	$('#hint').prop("disabled", true);
	
}

/*
Submit button click event handler function
*/
$('#submit').click(function() {
	var textInput = $('#textbox').val();
	if (isNaN(textInput) || textInput < 1 || textInput > 100) {
		alert("Please enter a valid input");
		return;
	}

	//  parse string to number
	textInput = Number($('#textbox').val());	
 	// Number not already guessed and not a match === true
 	if (checkGuesses(textInput) && doMath(textInput)){
 		$('#guesses').text(--numGuesses + " guesses remaining");
 		if (numGuesses === 0) {
 			gameOver("Sorry, Play Again");
 			$('#giveAnswer').text("The answer was " + randNum);
 		}
 	}
 })

/*
Hint button click event handler function
*/
$('#hint').click(function() {
	$('#guesses').text(randNum);
})

/*
Play Again button click event handler function
*/
$('#playAgain').click(function() {
	newGame();
})

function buildOverlay() {
	$overlay.append($image);
	$("body").append($overlay);
	//event.preventDefault();
	var imageLocation = "img/win.jpg";
	$image.attr("src", imageLocation);
	// show the overlay
	$overlay.show();
}

$overlay.click(function() {
	$(this).hide();
});

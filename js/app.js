var randNum = 0;
var numGuesses = 0;
var guessArray = [];
newGame();

/*
Resets all buttons and fields for a new game
*/
function newGame() {
	randNum = Math.round(Math.random() * 100);
	numGuesses = 1;
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
	if (num === randNum) {
		gameOver("You are CORRECT!")
	} else if (num < randNum) {
		$('#direction').text("You are low, guess higher");
		return true;
	} else {
		$('#direction').text("You are high, guess lower");
		return true;
	}
}

/*
Check if number has been guessed before
*/
function checkGuesses(guess) {
	for (var i = 0; i < guessArray.length; i++) {
		if (guessArray[i] === guess) {
			$('#doubleGuess').text("You already guessed that number");
			return false;
		}
	}
	guessArray.push(guess);
	$('#doubleGuess').text("");	
	return true;
}

/*
Submit button click event handler function
*/
$('#submit').click(function() {
	var textInput = $('#textbox').val();
	if (isNaN(textInput)) {
		alert("Please enter a number");
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
End game as winner or loser
*/
function gameOver(string) {
	$('#guesses').text(string);
	$('#direction').text("");
	$('#submit').prop("disabled", true);
	$('#hint').prop("disabled", true);
}

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
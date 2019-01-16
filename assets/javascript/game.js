//Create an array of Words
var spookyWords = [
    "blood", 
    "bones", 
    "broomstick", 
    "candy", 
    "cauldron", 
    "cemetery", 
    "coffin", 
    "costume", 
    "curse", 
    "halloween", 
    "ghost", 
    "demon", 
    "fangs", 
    "magic", 
    "mummy", 
    "pumpkin", 
    "skeleton", 
    "scream", 
    "spell", 
    "spider", 
    "possession", 
    "exorcist", 
    "resurrection", 
    "tombstone", 
    "vampire", 
    "werewolf", 
    "witch", 
    "nightmare", 
    "wizard", 
    "zombie"
];

//Create a variable with a number of tries/lives to guess the word
var maxLives = 9;
//Create more variables to for the rest of the game
var guessedLetters = []; //Where all guessed letters will be pushed to display on screen to user
var currentWordIndex;//Index where current word will be referenced from
var guessingWord = [];//The word to be guessed at random
var remainingGuesses = 0;//The number of guesses the user has
var gameStarted = false;//Notifies computer if game has started
var gameComplete = true;//Notifies computer if game is done
var wins = 0;//The number of times the user has correctly guessed the word
var themeSong = new Audio(src="assets/Halloween.mp3");
var winSong = new Audio(src="assets/monstermashy.mp3");

//Function that resets the game.
function resetGame() {
    themeSong.play();//Starts theme song for the game
    winSong.pause();//Pauses and makes sure winning song doses not play at same time as theme song.
    winSong.currentTime = 0;
    remainingGuesses = maxLives;//Resets users guesses to equal max lives
    gameStarted = false;//Lets computer know game is not in process yet
    currentWordIndex = Math.floor(Math.random() * (spookyWords.length));//Random word is chosen from Spooky Words Array.
    guessedLetters = [];//Guessed letters are reset to show nothing, as no letters have been guessed yet.
    guessingWord = [];//Guessing Word is shown as blank array that will be filled.
    document.getElementById("halloween-pic").style.cssText = "display: block";//Halloween party picture is displayed.
    for (var i = 0; i < spookyWords[currentWordIndex].length; i++) { //For loop pushes underscores in place of letters in random word.
        guessingWord.push("_");
    }
    document.getElementById("survivor").style.cssText = "display: none";//Winning image is hidden from viewer.
    document.getElementById("victim").style.cssText = "display: none";//Losing Image is hidden from viewer.

    gameDisplay();//Tells gameDisplay function to execute.
};

function gameDisplay() { //Main functionality of game. What user primarily interacts with.
    document.getElementById("wins").innerText = wins;//Displays the amount of wins and sets it to zero.
    document.getElementById("currentWord").innerText = "";//Displays Current Word as blank.
    document.getElementById("halloween-pic").style.cssText = "display: block";//Continues to display Halloween party picture.
    for (var i = 0; i < guessingWord.length; i++) { //For loop takes the random word that is assigned to guessingWord and places it in the Current Word Section of the webpage.
        document.getElementById("currentWord").innerText += guessingWord[i];
    }
    document.getElementById("remainingGuesses").innerText = remainingGuesses;//Displays remaining guesses.
    document.getElementById("wrongGuess").innerText = guessedLetters;//Displays letters that are guessed.
    if(remainingGuesses <= 0) { //Tells the computer that when remaining guesses goes down to zero to display Losing Image, hide Halloween Party Pic, and that the game has finished.
        document.getElementById("victim").style.cssText = "display: block";
        document.getElementById("halloween-pic").style.cssText = "display: none";
        gameComplete = true;
    }
};
//Function that records user input
document.onkeyup = function(event) { //When user presses a key it resets the game. I had trouble with this. As page is first loaded it resets. And I have to hit two keys to properly start the game.
    console.log("Game completed", gameComplete);
    if(gameComplete){
        resetGame();
        gameComplete = false;
        console.log(gameComplete, "Game Reset");
    }
    else { //States that if the user presses a key from "A" to "Z" it will fire userGuess function and convert the keycode to lowercase in case of user error.
        if(event.keyCode >=65 && event.keyCode <= 90) {
            console.log("user pressed key");
            userGuess(event.key.toLowerCase());
        }
    }
};

function userGuess(letter) { //If guesses are greater than 0, the game has started or in progress
    if (remainingGuesses > 0){
        if (!gameStarted) {
            gameStarted = true;
        }
        if (guessedLetters.indexOf(letter) === -1) { //Checks guessed Letter Array to see if the letter from key is in there. If it isn't we push the letter to guessed letter.
            guessedLetters.push(letter);
            evaluateGuess(letter);//Send letters to be further evaluated.
        }
    }
    gameDisplay();//Updates game display that user sees based on letter pressed. Having difficulty with this. Shows Losing Image at beginning of game.
    checkWin();//Tells checkWin function to fire to see if user has correctly guessed the word. Having difficulty with this. Shows Winning Image at beginning of the game & plays winSong.
};
//Function that evaluates the users guess
function evaluateGuess(letter) {
    var positions = [];
    for (var i = 0; i <spookyWords[currentWordIndex].length; i++) {
        if (spookyWords[currentWordIndex][i] === letter) {//Checks to see if letter is in the random word.
            positions.push(i);//If it is, it displays the letter in the current word.
        }
    }
    if (positions.length <= 0) { //If the letter is not the word, reduces the lives/remaining guesses.
        remainingGuesses--;
    }
    else {
        for (var i = 0; i < positions.length; i++) {
            guessingWord[positions[i]] = letter;
        }
    }
};
//Function that checks if user has correctly guessed the word.
function checkWin() {
    if (guessingWord.indexOf("_") === -1) {//Says that if there are no more underscores in the guessing word do the following:
        document.getElementById("survivor").style.cssText = "display: block";//Displays the Winning Image.
        document.getElementById("halloween-pic").style.cssText = "display: none";//Hides the Halloween Party Picture. 
        wins++;//Adds wins.
        themeSong.pause();//Stops theme song.
        themeSong.currentTime = 0;
        winSong.play();//Plays winning song.
        winSong.currentTime = 15;
        gameComplete = true;//Notifies the computer that the game has finished and to reset.
    }
};
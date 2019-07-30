var nameList = [
    'dio', 'josuke', 'zeppeli', 'speedwagon', 'joseph', 'kakyoin', 'rohan', 'jotaro', 'kars', 'esidisi', 'wamuu', 'okuyasu', 'yoshikage', 'koichi'
];

// A VAR THAT HOLDS AN EMPTY STRING.
// IT WILL BE POPULATED WITH A RANDOM NAME FROM 'nameList'
var chosenName = '';
// VAR HOLDING AN EMPTY ARRAY THAT IS FILLED
// WITH THE LETTERS IN THE RANDOMLY CHOSEN NAME (RCN)
// EX: ['d', 'i', 'o']
// THIS ARRAY IS FOR REFRENCING, SO TO SPEAK, AS THE USER GUESSES
var lettersInChosenName = [];
// VAR REPRESENTING THE NUMBER OF '_' IN THE RCN
// DEFAULT AT 0, BUT WILL BE CHANGED TO MATCH THE
// NUMBER OF LETTERS IN THE RCN
var numBlanks = 0;
// VAR HOLDING ANOTHER EMPTY ARRAY.
// THIS HOLDS THE MATCHING NUM OF '_' IN IT AS THE RCN
// EX: ['_', '_', '_']
// IT WILL BE UPDATED WHEN A HIT/MATCH IS MADE
// EX: ['d', '_', 'o']
var blanksAndHits = [];
// ONE LAST ARRAY TO HOLD THE GUESSED LETTERS NOT IN THE RCN
var wrongGuesses = [];
// ANOTHER EMPTY STRING THAT WILL BE POPULATED WITH THE GUESSED LETTER
var letterGuessed = '';
// AND THESE VARS HOLD THE TALLY MARKS FOR THE USER
// WINS AND LOSSES, AS WELL AS NUM OF GUSSES THE USER HAS LEFT
// WHICH DEFAULTS AT 9 AND COUNTS DOWN IF A WRONG GUESS IS MADE
var wins = 0;
var losses = 0;
var guessesLeft = 9;


//------------------GAME-FUNCTIONS-----------------//

function startGame() {
    // THIS LINE RESETS THE VALUE BACK TO 9 TO START EACH NEW GAME
    guessesLeft = 9;
    // THIS LINE ISSUES A RANDOM NAME FROM 'nameList' TO 'chosenName'
    chosenName = nameList[Math.floor(Math.random() * nameList.length)];
    // THIS LINE SPLITS THE NAME UP INTO LETTERS AND PLACES THEM IN THE ARRAY
    lettersInChosenName = chosenName.split('');
    // THIS LINE CHANGES THE 0 VALUE ABOVE TO MATCH THE NUM OF LETTERS IN THE RCN
    numBlanks = lettersInChosenName.length;
    console.log(chosenName);

    // THIS CODE ALSO RESETS THESE VALUES FOR EACH NEW GAME
    blanksAndHits = [];
    wrongGuesses = [];

    // THIS FOR LOOP GOES THROUGH THE 'numBlanks' VALUE AND PUSHES
    // THAT MANY '_' INTO THE 'blanksAndHits' ARRAY.
    for (i = 0; i < numBlanks; i++) {
        blanksAndHits.push('_');
    }
    // THIS LOGS THE ARRAY WITH THE RCN REPRESENTED BY THE CORRECT
    // NUM OF '_' TO MATCH THE LETTERS THAT MAKE UP THE NAME
    console.log(blanksAndHits);

    document.getElementById('guessesLeft').innerHTML = guessesLeft;
    document.getElementById('nameBlanks').innerHTML = blanksAndHits.join(' ');
    document.getElementById('wrongGuesses').innerHTML = wrongGuesses.join(' ');
};


// THIS FUNCTION CHECKS THE USERS GUESSED LETTER FOR A HIT/MATCH
function checkLetter(letter) {
    // WE ESTABLISH A VAR THAT REPRESENTS WHETHER THE CHOSEN LETTER IS IN
    // THE RCN OR NOT, WITH A DEFAULT VALUE OF FALSE(NO)
    var letterInName = false;

    // THIS FOR LOOP SAYS THAT FOR EVERY BLANK IN THE RCN,
    // IF ONE OF THE LETTERS IN THE RCN === THE USERS GUESS,
    // THEN 'letterInName' SWITCHES TO TRUE(YES)
    for (i = 0; i < numBlanks; i++) {
        if (chosenName[i] === letter) {
            letterInName = true;
        }
    }
    // IF TRUE(YES), LOOP THROUGH THE BLANKS IN THE RCN ...
    // AND FOR EVERY INSTENT WHRE THE 'letter' MATCHES A LETTER IN THE RNC,
    // THEN MAKE EVERY ONE OF THOSE BLANKS IN THE 'blanksAndHits' ARRAY
    // EQUAL TO THAT LETTER.
    // IF FALSE(NO), THEN PUSH THAT LETTER INTO THE 'wrongGuesses' ARRAY
    // WHICH DISPLAYS IN HTML, AND SUBTRACT FROM 'guessesLeft' TALLY.
    if (letterInName) {
        for (j = 0; j < numBlanks; j++) {
            if (chosenName[j] === letter) {
                blanksAndHits[j] = letter;
            }
        }
        console.log(blanksAndHits);
    } else {
        wrongGuesses.push(letter);
        guessesLeft--;
    }
};


// THIS FUNCTION IS FOR WHEN A ROUND(1 GUESS) IS COMPLETE
function roundComplete() {
    // DISPLAY TALLY MARKS IN CONSOLE
    console.log('wins: ' + wins + ' | losses: ' + losses + ' | guesses remaining: ' + guessesLeft);
    // AND UPDATE THE HTML
    document.getElementById('guessesLeft').innerHTML = guessesLeft;
    document.getElementById('nameBlanks').innerHTML = blanksAndHits.join(' ');
    document.getElementById('wrongGuesses').innerHTML = wrongGuesses.join(' ');

    // THIS CODE IS TO DETERMINE WINS AND LOSSES, AS WELL AS RESTARTING
    // THE GAME IF NEEDED
    // IF ARRAY 'lettersInChosenName' IN STRING FORM EQUALS ARRAY 'blanksAndHits'
    // IN STRING FORM, THEN THE RCN HAS BEEN GUESSED.
    // ADD TO WINS TALLY, ALERT USER, UPDATE WIN COUNT, AND RESTART GAME
    // HOWEVER, IF GUESSES LEFT DROPS TO 0,
    // ADD TO LOSSESS TALLY, ALERT USER, UPDATE LOSS COUNT, AND RESTART GAME
    if (lettersInChosenName.toString() === blanksAndHits.toString()) {
        wins++;
        alert('you win');
        document.getElementById('winCounter').innerHTML = wins;
        startGame();
    }
    else if (guessesLeft === 0) {
        losses++;
        alert('you lose');
        document.getElementById('lossCounter').innerHTML = losses;
        startGame();
    }
};

// THIS IS A FUNCTION THAT ACTIVATES WHEN THE USER PRESSES A KEY(LETTER)
// IT TAKES THE EMPTY STRING WE ESTABLISHED ABOVE, AND PLACES THE KEY
// FROM THE EVENT INTO THAT VAR
// THEN WE CALL THE CHECKLETTER FUNCTION AND PLACE 'THAT' LETTER
// INTO IT AS A PARAMETER
// WE THEN CALL THE ROUNDCOMPLETE FUNCTION HERE, WHICH DETERMINES IF
// THE GAME CONTINUES OR ENDS, STARTING A NEW GAME IF NEEDED
document.onkeyup = function (event) {
    letterGuessed = String.fromCharCode(event.which).toLowerCase();
    checkLetter(letterGuessed);
    roundComplete();
};

// CALL THE STARTGAME FUNCTION SO THAT THE GAME IS RUNNING
// AS SOON AS THE PAGE IS LOADED
startGame();
/**
 * Created by Plamen on 13-Aug-15.
 */
$(document).ready(function () {

    $("#wrongInput").hide();
    $("#canv").hide();
    $("#rules").click(function () {
        window.open("Rulez.html");
    });


    var countWin = 0,
        countLose = 0,
        countLVL = 0;

    $("#sub").click(function () {
        $("#canv").show();
        $("#wrongInput").show();
        $("#wordToGuessContainer").hide();
        var c = document.getElementById("canv");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, 530, 400);

        $("#wrongInput").text("Incorrect guesses:");

        function drawHead(dashStyle) {

            var c = document.getElementById("canv");
            var ctx = c.getContext("2d");
            ctx.beginPath();

            ctx.arc(150, 130, 30, 0, 2 * Math.PI);
            ctx.setLineDash(dashStyle);
            ctx.stroke();
            ctx.closePath();
        }

        function drawWood(dashStyle) {

            var c = document.getElementById("canv");
            var ctx = c.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(300, 350);
            ctx.lineTo(300, 50);
            ctx.lineTo(100, 50);
            ctx.moveTo(150, 50);
            ctx.lineTo(150, 100);

            ctx.setLineDash(dashStyle);
            ctx.stroke();
            ctx.closePath();

        }

        function drawBody(dashStyle) {
            var c = document.getElementById("canv");
            var ctx = c.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(150, 160);
            ctx.lineTo(150, 260);
            //ctx.lineTo(100, 50);


            ctx.setLineDash(dashStyle);
            ctx.stroke();
            ctx.closePath();
        }

        function drawLeftHand(dashStyle) {

            var c = document.getElementById("canv");
            var ctx = c.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(150, 190);
            ctx.lineTo(120, 220);

            ctx.setLineDash(dashStyle);
            ctx.stroke();
            ctx.closePath();
        }

        function drawRightHand(dashStyle) {

            var c = document.getElementById("canv");
            var ctx = c.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(150, 190);
            ctx.lineTo(180, 220);

            ctx.setLineDash(dashStyle);
            ctx.stroke();
            ctx.closePath();
        }

        function drawLeftLeg(dashStyle) {

            var c = document.getElementById("canv");
            var ctx = c.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(150, 260);
            ctx.lineTo(120, 310);

            ctx.setLineDash(dashStyle);
            ctx.stroke();
            ctx.closePath();
        }

        function drawRightLeg(dashStyle) {

            var c = document.getElementById("canv");
            var ctx = c.getContext("2d");
            ctx.beginPath();
            ctx.moveTo(150, 260);
            ctx.lineTo(180, 310);

            ctx.setLineDash(dashStyle);
            ctx.stroke();
            ctx.closePath();
        }


        drawHead([5, 5]);
        drawWood([5, 5]);
        drawBody([5, 5]);
        drawLeftHand([5, 5]);
        drawRightHand([5, 5]);
        drawLeftLeg([5, 5]);
        drawRightLeg([5, 5]);


        // Global variables
        var canvas = document.getElementById('stage'),
            word = document.getElementById('word'),
            letters = document.getElementById('letters'),
            wordToGuess,
            wordLength,
            badGuesses,
            correctGuesses;


// Start new game
        function newGame() {
            var placeholders = '',
                frag = document.createDocumentFragment(),
                abc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
            badGuesses = 0;
            correctGuesses = 2;
            wordToGuess = getWord();
            wordLength = wordToGuess.length;
            var first = wordToGuess[0];
            placeholders = first.toUpperCase();
            // create row of underscores the same length as letters to guess
            for (var i = 1; i < wordLength - 1; i++) {

                placeholders += '_';

            }
            placeholders += wordToGuess[wordLength - 1].toUpperCase();
            word.innerHTML = placeholders;
            // create an alphabet pad to select letters
            letters.innerHTML = '';
            for (i = 0; i < 26; i++) {
                var div = document.createElement('div');
                div.style.cursor = 'pointer';
                div.innerHTML = abc[i];
                div.onclick = getLetter;
                frag.appendChild(div);
            }
            letters.appendChild(frag);
            drawCanvas();
        }

// Get selected letter and remove it from the alphabet pad
        function getLetter() {
            checkLetter(this.innerHTML);
            this.innerHTML = '&nbsp;';
            this.style.cursor = 'default';
            this.onclick = null;
            if (wrongGuess == true) {
                this.style.backgroundColor = 'red';
            }
            else
                this.style.backgroundColor = 'green';
        }

// Check whether selected letter is in the word to be guessed
        function checkLetter(letter) {
            var placeholders = word.innerHTML;
            wrongGuess = true;

            // split the placeholders into an array
            placeholders = placeholders.split('');
            // loop through the array

            for (var i = 1; i < wordLength - 1; i++) {
                // if the selected letter matches one in the word to guess,
                // replace the underscore and increase the number of correct guesses

                if (wordToGuess.charAt(i) == letter.toLowerCase()) {
                    placeholders[i] = letter;
                    wrongGuess = false;
                    correctGuesses++;
                    // redraw the canvas only if all letters have been guessed
                    if (correctGuesses == wordLength) {
                        drawCanvas();
                    }
                }
            }
            // if the guess was incorrect, increment the number of bad
            // guesses and redraw the canvas
            if (wrongGuess) {
                $("#wrongInput").append(letter, ", ");
                badGuesses++;
                drawCanvas();
            }
            // convert the array to a string and display it again
            word.innerHTML = placeholders.join('');

        }

// Draw the canvas
        function drawCanvas() {
            var c = canvas.getContext('2d');
            // reset the canvas and set basic styles
            canvas.width = canvas.width;
            c.lineWidth = 10;
            c.strokeStyle = 'green';
            c.font = 'bold 24px Optimer, Arial, Helvetica, sans-serif';
            c.fillStyle = 'red';

            if (badGuesses > 0) {
                drawWood([1, 0]);
                if (badGuesses > 1) {

                    drawHead([1, 0]);

                }
                if (badGuesses > 2) {
                    drawBody([1, 0]);
                }
                if (badGuesses > 3) {
                    drawLeftHand([1, 0]);

                }
                if (badGuesses > 4) {
                    drawRightHand([1, 0]);

                }
                if (badGuesses > 5) {

                    drawLeftLeg([1, 0]);
                }
                if (badGuesses > 6) {
                    drawRightLeg([1, 0]);

                }
                if (badGuesses > 7) {
                    $("#wordToGuessContainer").show();
                    badGuesses--;
                    countLVL++;
                    // display the correct answer
                    setTimeout(showResult, 200);

                    if (countLVL == 1) {
                        c.fillText('LVL1 Complete', 0, 80);
                        c.fillText('Incorrect Answer', 0, 120);

                    }
                    else if (countLVL == 2) {
                        c.fillText('LVL2 Complete', 0, 80);
                        c.fillText('Incorrect Answer', 0, 120);
                    }
                    else {
                        c.fillText('LVL3 Complete', 0, 80);
                        c.fillText('Incorrect Answer', 0, 120);
                    }


                    if (countLVL < 3 && countLose != 2) {
                        c.fillText('Select Category', 0, 160);
                    }
                    letters.innerHTML = '';
                    countLose++;

                    if (countLose == 2) {

                        //c.fillText('Game over', 45, 110);
                        alert("You Lose!\n\nPress 'OK' to play again.\n\nYou Won: " + countWin + "rounds.\n\nYou Lost: " + countLose + "rounds.");
                        alert.okButton = location.reload();

                    }
                }
            }
            // if the word has been guessed correctly, display message,
            // update score of games won, and then show score after 2 seconds
            if (correctGuesses == wordLength) {
                $("#wordToGuessContainer").show();
                badGuesses++;
                countLVL++;
                countWin++;

                letters.innerHTML = '';
                // increase score of won games
                // display score


                if (countLVL == 1) {
                    c.fillText('LVL1 Complete', 0, 80);
                    c.fillText('Correct Answer', 0, 120);
                }
                else if (countLVL == 2) {
                    c.fillText('LVL2 Complete', 0, 80);
                    c.fillText('Correct Answer', 0, 120);
                }
                else {
                    c.fillText('LVL3 Complete', 0, 80);
                    c.fillText('Correct Answer', 0, 120);
                }


                if (countLVL < 3 && countWin != 2) {
                    c.fillText('Select Category', 0, 160);
                }
                if (countWin == 2) {

                    alert("You Win!\n\nPress 'OK' to play again.\n\nYou Won: " + countWin + " rounds.\n\nYou Lost: " + countLose + " rounds.");
                    alert.okButton = location.reload();

                }
            }
        }


// When the game is over, display missing letters in red
        function showResult() {
            var placeholders = word.innerHTML;
            placeholders = placeholders.split('');

            for (i = 0; i < wordLength; i++) {

                if (placeholders[i] == '_') {

                    placeholders[i] = '<span style="color:red">' + wordToGuess.charAt(i).toUpperCase() + '</span>';

                }
            }
            word.innerHTML = placeholders.join('');
        }


        function getWord() {
            //categories which contain data that is about to be rolled randomly
            //array names are global in order to change them, after they are already used in this scope
             otbori = ["everton", "liverpool", "swansea", "chelsea", "hull", "levski", "cska"];
             filmi = ["alien", "gladiator", "jaws", "rocky", "godfather", "terminator"];
             gradove = ["manchester", "milan", "madrid", "amsterdam", "prague", "sofia"];
             jivotni = ["bear", "lion", "tiger", "dog", "hippo", "alligator", "raven", "eagle", "tarantula"];


            if ($("select").val() == "films") { //select the "select" value

                var duma = filmi[Math.floor(Math.random() * filmi.length)];//chose a word randomly from filmi arr

            }
            else if ($("select").val() == "towns") {

                var duma = gradove[Math.floor(Math.random() * gradove.length)];

            }
            else if ($("select").val() == "sT") {

                var duma = otbori[Math.floor(Math.random() * otbori.length)];

            }
            else if ($("select").val() == "animals") {

                var duma = jivotni[Math.floor(Math.random() * jivotni.length)];

            }
            
            return duma;

        }


        newGame();
        // we make sure the word is not repeated in some of the next rounds
        otbori[this].pop();
        filmi[this].pop();
        gradove[this].pop();
        jivotni[this].pop();

    });

});
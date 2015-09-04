levels = 1;
freelvs = 1;
wins = 0;
succeeds=false;
animal = ["elephant","penguin","chicken"];
country = ["bulgaria","italy","portugal"];
car = ["mercedes","volkswagen","peugeot"];


$("#play").click(function(){startGame();});

function resGame(){

    if(levels==4 && wins>1){
        document.write("Player 2 has WON " + wins + "levels. Player 2 WINS the game!");
    }
    else if(levels==4 && wins<2){
        document.write("Player 2 has WON only " + wins + "levels. Player 1 WINS the game!")
    }
    else {
        document.getElementById('mainContainer').innerHTML = gameElements;
        console.log(levels);
        if (levels == 2) {
            if (succeeds) {
                freelvs = 2;
            }
            else {
                freelvs = 1;
            }

        }
        if (levels == 3) {
            if (succeeds) {
                freelvs = 3;
            }
            else {
                freelvs = 2;
            }

        }

    }

}

function drawStickman(number) {
    var head = function () {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.arc(100, 70, 30, 0, Math.PI * 2, false);
        ctx.stroke();
    };
    var body = function () {
        ctx.beginPath();
        ctx.moveTo(100, 100);
        ctx.lineTo(100, 160);
        ctx.strokeStyle = "black";
        ctx.stroke();
    };
    var leftArm = function () {
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.moveTo(100, 120);
        ctx.lineTo(80, 130);
        ctx.stroke();
    };
    var rightArm = function () {
        ctx.beginPath();
        ctx.strokeStyle = "blue";
        ctx.moveTo(100, 120);
        ctx.lineTo(120, 130);
        ctx.stroke();
    };
    var leftLeg = function () {
        ctx.beginPath();
        ctx.strokeStyle = "purple";
        ctx.moveTo(100, 160);
        ctx.lineTo(80, 200);
        ctx.stroke();
    };
    var rightLeg = function () {
        ctx.beginPath();
        ctx.strokeStyle = "purple";
        ctx.moveTo(100, 160);
        ctx.lineTo(120, 200);
        ctx.stroke();
    };
    var array = [head, body, leftArm, rightArm, leftLeg, rightLeg];
    array[number]();

}

function drawWord() {
    container.innerHTML+= word[0];
    guessedLetters++;
    for (var i =1; i < word.length-1; i++) {

        if (word[0]==word[i]) {
            container.innerHTML+= word[0];
            guessedLetters++;
        }
        else if (word[word.length-1]== word[i]) {
            container.innerHTML+= word[word.length-1];
            guessedLetters++;
        }
        else {
            container.innerHTML += "_" ;
        }
    }
    container.innerHTML+= word[word.length-1];
    guessedLetters++;
}

function drawGreda(){
    ctx.beginPath();
    ctx.moveTo(175, 200);
    ctx.lineTo(175, 25);
    ctx.lineTo(80, 25);
    ctx.strokeStyle = "black";
    ctx.moveTo(100, 25);
    ctx.lineTo(100, 40);
    ctx.stroke();
}

function checkLetter(letter, id) {

    var holder = container.innerHTML.split('');
    var letters = word.split('');
    var match = false;
    var buttonChange = document.getElementById(id);
    for (var i = 0; i < holder.length; i++) {
        if (letter.toLowerCase() == letters[i]) {
            match = true;
            holder[i] = letter;
            guessedLetters++;
        }
        if (match == true) {
            buttonChange.style.backgroundColor = "green";
            buttonChange.setAttribute("onclick", "");
            container.innerHTML = holder.join('');
        }
    }
    if (match == false) {
        buttonChange.style.backgroundColor = "red";
        buttonChange.setAttribute("onclick", "");
        container.innerHTML = holder.join('');
        if (freelvs > 0) {
            freelvs--;
        }
        else {
            drawStickman(lives);
            lives++;
        }
    }
    gameOver();
}

function gameOver() {
    if (lives == 6) {
        endGame("Player 1");
        succeeds = false;
        levels++;
    }
    else if (guessedLetters == allLetters) {
        endGame("Player 2");
        wins++;
        levels++;
        succeeds = true;
    }
    resGame();
}

function initialVars() {
    alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K","L", "M",
                "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

    container = document.getElementById("word");
    lives = 0;
    allLetters = word.length;
    guessedLetters = 0;
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    gameElements ="<canvas id='canvas' width='300px' height='300px'></canvas><br>";
    gameElements+="<div id='word' style='font-size: 5em; letter-spacing: 10px;'></div><br>";
    gameElements+="<div id='buttons'></div>";
}

function startGame(){
    mainHide();
    initialVars();
    drawletters();
    drawWord();
    drawGreda();
}

function endGame(player){
    $("#result").text(player +" wins the level. ");
    $("#theGame").text("");
    $("#theGame").append(gameElements);
    $("#theGame").hide();
    $("#mainCont").show();
}

function mainHide() {
    $("#theGame").show();
    var wordWritten = $("#category").val().toLowerCase();
    wordFromCategory(wordWritten);

    $("#mainCont").hide();
}

function drawletters(){
    //drawing the letters with buttons, giving them id,value and onclick function

        for (var i = 0; i < alphabet.length; i++) {
            var button = $("<button></button>").text(alphabet[i]);
            button.attr("value", alphabet[i].toLowerCase());

            if (alphabet[i].toLowerCase() == word[0].toLowerCase()) {
                button.attr("style", "background-color:green");
            }
            else if (alphabet[i].toLowerCase() == word[word.length - 1].toLowerCase()) {
                button.attr("style", "background-color:green");
            } else {
                button.attr("onclick", "checkLetter(this.value,this.id)");
            }
            button.attr("id", alphabet[i]);
            $("#buttons").append(button);
        }

}

function wordFromCategory(cat){
    if(cat=="animal"){
        word =animal[Math.floor(Math.random() * animal.length)];
return word;
       // console.log(word);
    }
    else if(cat=="country"){
        word =country[Math.floor(Math.random() * country.length)];
        return word;
       // console.log(word);
    }
    else if(cat=="car"){
        word =car[Math.floor(Math.random() * car.length)];
        return word;
        //console.log(word);
    }
    else{
        return false;
    }

}


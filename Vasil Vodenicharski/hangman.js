var computers =
    ["javascript","actionscript","windows","keyboard","internet"];
var cars = ["mercedes","ferrari","astonmartin"];
var teams = ["juventus","milan","internacionale"];

var changeCat = document.getElementById("radio1");
var count=0;
var player1count=0;
var player2count=0;
var ctx;
var thingelem;
var alphabet = "abcdefghijklmnopqrstuvwxyz";
var alphabety = 300;
var alphabetx = 20;
var alphabetwidth = 25;
var secret;
var lettersguessed = 0;
var secretx = 160;
var secrety = 50;
var secretwidth = 50;
var gallowscolor = "red";
var facecolor = "black";
var bodycolor = "black";
var noosecolor = "black";
var bodycenterx = 70;
var steps = [
    drawgallows,
    drawhead,
    drawbody,
    drawrightarm,
    drawleftarm,
    drawrightleg,
    drawleftleg,
    drawnoose
];
var cur = 0;
function drawgallows() {
    ctx.lineWidth = 8;
    ctx.strokeStyle = gallowscolor;
    ctx.beginPath();
    ctx.moveTo(2, 180);
    ctx.lineTo(40, 180);
    ctx.moveTo(20, 180);
    ctx.lineTo(20, 40);
    ctx.moveTo(2, 40);
    ctx.lineTo(80, 40);
    ctx.stroke();
    ctx.closePath();

}
function drawhead() {
    ctx.lineWidth = 3;
    ctx.strokeStyle = facecolor;
    ctx.save();  //before scaling of circle to be oval
    ctx.scale(.6, 1);
    ctx.beginPath();
    ctx.arc(bodycenterx / .6, 80, 10, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
}

function drawbody() {
    ctx.strokeStyle = bodycolor;
    ctx.beginPath();
    ctx.moveTo(bodycenterx, 90);
    ctx.lineTo(bodycenterx, 125);
    ctx.stroke();
    ctx.closePath();

}
function drawrightarm() {
    ctx.beginPath();
    ctx.moveTo(bodycenterx, 100);
    ctx.lineTo(bodycenterx + 20, 110);
    ctx.stroke();
    ctx.closePath();

}
function drawleftarm() {
    ctx.beginPath();
    ctx.moveTo(bodycenterx, 100);
    ctx.lineTo(bodycenterx - 20, 110);
    ctx.stroke();
    ctx.closePath();

}
function drawrightleg() {
    ctx.beginPath();
    ctx.moveTo(bodycenterx, 125);
    ctx.lineTo(bodycenterx + 10, 155);
    ctx.stroke();
    ctx.closePath();


}

function drawleftleg() {
    ctx.beginPath();
    ctx.moveTo(bodycenterx, 125);
    ctx.lineTo(bodycenterx - 10, 155);
    ctx.stroke();
    ctx.closePath();

}
function drawnoose() {
    ctx.strokeStyle = noosecolor;
    ctx.beginPath();
    ctx.moveTo(bodycenterx - 10, 40);
    ctx.lineTo(bodycenterx - 5, 95);
    ctx.stroke();
    ctx.closePath();
    ctx.save();
    ctx.scale(1, .3);
    ctx.beginPath();
    ctx.arc(bodycenterx, 95 / .3, 8, 0, Math.PI * 2, false);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
    drawneck();
    drawhead();


}
function drawneck() {
    ctx.strokeStyle = bodycolor;
    ctx.beginPath();
    ctx.moveTo(bodycenterx, 90);
    ctx.lineTo(bodycenterx, 95);
    ctx.stroke();
    ctx.closePath();

}
function init() {
    ctx = document.getElementById('myCanvas').getContext('2d');
    setupgame();
    ctx.font = "bold 20pt Ariel";

}
function removeblanksfromword(word) {
    //alert("length of word" + word+" is "+word.length);
    var strippedword = word.replace(/^\s+|\s+$/g, '');
    //alert("length of stripped word is "+strippedword.length);
    return (strippedword);


}

function changeCategory(){

    if (changeCat == computers){
      return computers
  }
    else if (changeCat == cars){
      return cars
  }
  else if (changeCat == teams){
      return teams
  }
      }


function setupgame() {
    var i;
    var x;
    var y;
    var uniqueid;
    var an = alphabet.length;
    for (i = 0; i < an; i++) {

        uniqueid = "a" + String(i);
        d = document.createElement('alphabet');
        d.innerHTML = (
        "<div class='letters' id='" + uniqueid + "'>" + alphabet[i] + "</div>");
        document.body.appendChild(d);
        thingelem = document.getElementById(uniqueid);
        x = alphabetx + alphabetwidth * i;
        y = alphabety;
        thingelem.style.top = String(y) + "px";
        thingelem.style.left = String(x) + "px";
        thingelem.addEventListener('click', pickelement, false);


    }
    var ch = Math.floor(Math.random() * computers.length);
    secret = removeblanksfromword(computers[ch]);

    for (i = 0; i < secret.length; i++) {
        uniqueid = "s" + String(i);
        d = document.createElement('secret');


        if (i == 0 || i == secret.length-1)
            d.innerHTML = (
            "<div class='blanks' id='" + uniqueid + "'>  " + secret[i] + " </div>");
       else
            d.innerHTML = (
            "<div class='blanks' id='" + uniqueid + "'> __ </div>");


        document.body.appendChild(d);
        thingelem = document.getElementById(uniqueid);
        x = secretx + secretwidth * i;
        y = secrety;
        thingelem.style.top = String(y) + "px";
        thingelem.style.left = String(x) + "px";

    }
    steps[cur]();
    cur++;
    return false;


}

function pickelement(ev) {
    var not = true;
    var picked = this.textContent;
    var i;
    var j;
    var uniqueid;
    var thingelem;

    for (i = 0; i < secret.length; i++) {
        if (picked == secret[i]) {
            id = "s" + String(i);
            document.getElementById(id).textContent = picked;
            not = false;
            lettersguessed++;
            if (lettersguessed == secret.length-2) {
                count++;
                player2count++;
                ctx.fillStyle = gallowscolor;
                alert("PLAYER 2 WIN!" + "P 2 Score=" + player2count);

                location.replace("hangmanStart.html");
                for (j = 0; j < alphabet.length; j++) {
                    uniqueid = "a" + String(j);
                    thingelem = document.getElementById(uniqueid);
                    thingelem.removeEventListener('click', pickelement, false);
                }

            }

        }


    }

    if (not) {
        steps[cur]();
        cur++;
        if (cur >= steps.length) {

            for (i = 0; i < secret.length; i++) {
                id = "s" + String(i);
                document.getElementById(id).textContent = secret[i];
            }
            count++;
            player1count++;
            ctx.fillStyle = gallowscolor;
            alert("PLAYER 1 WIN!" + "P 1 Score=" + player1count);
            //ctx.fillText(out, 200, 80);
           // ctx.fillText("Press next level and try again.", 200, 120);
            location.replace("hangmanStart.html");
            for (j = 0; j < alphabet.length; j++) {
                uniqueid = "a" + String(j);
                thingelem = document.getElementById(uniqueid);
                thingelem.removeEventListener('click', pickelement, false);
            }

        }
        if(count == 3){
            if(player1count > player2count)
                document.write("GAME OVER" + "PLAYER 1 WIN");
            else{
                document.write("GAME OVER" + "PLAYER 2 WIN");
            }
        }

    }



    var id = this.id;
    document.getElementById(id).style.display = "none";
}



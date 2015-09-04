
function startGame (){
    localStorage.clear();
    location.replace("hangman.html");

}


var canvas = document.getElementById("drawing");
if (canvas.getContext("2d")) {

    context = canvas.getContext("2d");
    context.beginPath();
    //draw head
    context.arc(100,70,30,0,2*Math.PI,true);
    context.fillStyle= "bisque";
    context.fill();
    // draw smile
    context.beginPath();
    context.arc(100,70,20,0,Math.PI,false);
    context.strokeStyle = "red";
    context.stroke();
    // draw eyes
    context.beginPath();
    context.arc(85,60,5,0,2*Math.PI,false);
    context.arc(115,60,5,0,2*Math.PI,false);
    context.fillStyle= "black";
    context.fill();
    //draw body
    context.beginPath();
    context.moveTo(100,100);
    context.lineTo(100,160);
    context.strokeStyle = "blue";
    context.stroke();
    //draw hands
    context.beginPath();
    context.strokeStyle = "blue";
    context.moveTo(100,120);
    context.lineTo(80,130);
    context.stroke();
    context.moveTo(100,120);
    context.lineTo(120,130);
    context.stroke();
    //draw legs
    context.beginPath();
    context.moveTo(100,160);
    context.lineTo(80,200);
    context.stroke();
    context.moveTo(100,160);
    context.lineTo(120,200);
    context.stroke();
    //draw vertical line1
    context.beginPath();
    context.moveTo(30,20);
    context.lineTo(30,200);
    context.strokeStyle="black";
    context.stroke();
    //draw horizontal line
    context.beginPath();
    context.moveTo(30,20);
    context.lineTo(100,20);
    context.strokeStyle="black";
    context.stroke();

    context.font = "20px Arial";
    context.fillStyle="black";
    context.fillText("HANGMAN",150,200);
}
function rules() {
    window.open("rules.txt");
}

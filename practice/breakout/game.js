const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// CANVAS: canvas.width x canvas.height

const ballRadius = 10;
let x = 240;
let y = 300;
let dx = 5;
let dy = -5;
let ballSpeedIncreasePerHit = 1.05;

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleSpeed = 8;
let paddleCollisionGenerosity = 7;

let rightPressed = false;
let leftPressed = false;

let animateInterval = 0;

function drawPaddle() {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fill();
}

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawBall();
    drawPaddle();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) { dx = -dx; }

    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        let paddleLeftX = paddleX - paddleCollisionGenerosity;
        let paddleRightX = paddleX + paddleWidth + paddleCollisionGenerosity;

        if (paddleLeftX < x && x < paddleRightX) {
            dy = -dy * ballSpeedIncreasePerHit;
            dx = dx * ballSpeedIncreasePerHit;
        } else {
            alert("GAME OVER");
            document.location.reload();
            clearInterval(interval);
        }
    }
      
    x = x + dx;
    y = y + dy;

    if (rightPressed) {
        paddleX = Math.min(
            paddleX + paddleSpeed, 
            canvas.width - paddleWidth
        );
    } else if (leftPressed) {
        paddleX = Math.max(
            paddleX - paddleSpeed, 
            0
        );
    }
}

const runButton = document.getElementById("runButton");
runButton.addEventListener("click", () => {
    animateInterval = setInterval(animate, 1000/60);
    runButton.disabled = true;
});

function keyDownHandler(e) {
    if (e.key == "d" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "a" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}
  
function keyUpHandler(e) {
    if (e.key == "d" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "a" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);
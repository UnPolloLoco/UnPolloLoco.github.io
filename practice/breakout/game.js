const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// CANVAS: canvas.width x canvas.height

const ballRadius = 10;
const ballSpeedIncreasePerHit = 1.05;

const balls = [];

for (let i = 0; i < 100; i++) {
    const ball = {
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        dx: 5,
        dy: -5,
    }
    balls.push(ball);
}

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleSpeed = 8;
let paddleCollisionGenerosity = 7;

let rightPressed = false;
let leftPressed = false;

// let animateInterval = 0;

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;


function drawBricks(){
    ctx.fillStyle = 'blue';
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            console.log(brickOffsetLeft + (brickWidth + brickPadding) * c)
            ctx.fillRect(
                brickOffsetLeft + (brickWidth + brickPadding) * c,
                brickOffsetTop + (brickHeight + brickPadding) * r,
                brickWidth,
                brickHeight,
            );
        }
    }
}

function drawPaddle() {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.fillStyle = "blue";

    for (const ball of balls) {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
        ctx.fill();
    }
}

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawBall();
    drawPaddle();
    drawBricks();

    // BALLS

    for (const ball of balls) {
        if (ball.x + ball.dx > canvas.width - ballRadius || ball.x + ball.dx < ballRadius) { 
            ball.dx = -ball.dx; 
        }

        if (ball.y + ball.dy < ballRadius) {
            ball.dy = -ball.dy;
        } else if (ball.y + ball.dy > canvas.height - ballRadius) {
            let paddleLeftX = paddleX - paddleCollisionGenerosity;
            let paddleRightX = paddleX + paddleWidth + paddleCollisionGenerosity;

            if (true/*paddleLeftX < x && x < paddleRightX*/) {
                ball.dy = -ball.dy * ballSpeedIncreasePerHit;
                ball.dx = ball.dx * ballSpeedIncreasePerHit;
            } else {
                alert("GAME OVER");
                document.location.reload();
                // clearInterval(interval);
            }
        }
        
        ball.x += ball.dx;
        ball.y += ball.dy;
    }  

    // PADDLE MOVEMENT

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

    requestAnimationFrame(animate);
}

const runButton = document.getElementById("runButton");
runButton.addEventListener("click", () => {
    // animateInterval = setInterval(animate, 1000/60);
    animate();
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
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// CANVAS: 480 x 320

const ballRadius = 10;
let x = 240;
let dx = 2;
let y = 300;
let dy = -2;

function drawBall() {
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fill();
}

function animate() {
    ctx.clearRect(0,0,480,320);

    drawBall();

    x = x + dx;
    y = y + dy;

    if (x + dx > 480 - ballRadius || x + dx < ballRadius) { dx = -dx; }
    if (y + dy > 320 - ballRadius || y + dy < ballRadius) { dy = -dy; }

    requestAnimationFrame(animate);
}

const runButton = document.getElementById("runButton");
runButton.addEventListener("click", () => {
    animate();
    runButton.disabled = true;
});
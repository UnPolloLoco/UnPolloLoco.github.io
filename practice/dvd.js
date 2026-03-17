const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'red';

let x = 0;
let y = 0
let vx = 8;
let vy = 7;

function animate() {
    ctx.clearRect(0,0,600,600);

    ctx.fillRect(x, y, 100, 100);
    x = x + vx;
    y = y + vy;

    if (x > 500 || x < 0) {
        vx = vx * -1;
    }
    if (y > 500 || y < 0) {
        vy = vy * -1;
    }

    requestAnimationFrame(animate);
}

animate();
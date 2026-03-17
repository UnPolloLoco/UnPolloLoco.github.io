const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'red';

let x = 0;
let y = 0
let vx = 20;
let vy = 20;

function animate() {
    ctx.clearRect(0,0,600,600);

    ctx.fillRect(x, y, 100, 100);

    requestAnimationFrame(animate);
}

animate();

// Event Handler

function handleKeyDown(e) {
    if (e.key == 'ArrowDown') {
        y = y + vy;
    } else if (e.key == 'ArrowUp') {
        y = y - vy;
    } else if (e.key == 'ArrowLeft') {
        x = x - vx;
    } else if (e.key == 'ArrowRight') {
        x = x + vx;
    }
}

// Event Listener

document.addEventListener('keydown', handleKeyDown);
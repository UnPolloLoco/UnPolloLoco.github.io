const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'blue';

function animate() {
    ctx.clearRect(0,0,480,320);

    ctx.fillRect(10, 10, 100, 100);

    requestAnimationFrame(animate);
}

animate();
function drawBackground() {
    ctx.fillStyle = 'rgb(0,0,0)'
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#103355';
    ctx.beginPath();
    ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#105533';
    ctx.beginPath();
    ctx.arc(
        planet.x - planet.radius/4, 
        planet.y + planet.radius/4, 
        planet.radius * 0.6, 
        0, Math.PI * 2
    );
    ctx.fill();

    ctx.beginPath();
    ctx.arc(
        planet.x + planet.radius/3, 
        planet.y - planet.radius/3, 
        planet.radius * 0.4, 
        0, Math.PI * 2
    );
    ctx.fill();
  
}

function drawShip(x, y, angle, size) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(size, size);
  
  // Triangle body
  ctx.beginPath();
  ctx.moveTo(0, -15);
  ctx.lineTo(-10, 10);
  ctx.lineTo(10, 10);
  ctx.fillStyle = '#66ccff';
  ctx.fill();
  
  // Rocket Fire
  ctx.fillStyle = '#ff8844';
  ctx.beginPath();
  ctx.moveTo(-5, 10);
  ctx.lineTo(0, 18);
  ctx.lineTo(5, 10);
  ctx.fill();
  
  ctx.restore();
}

function drawJunk(x, y, rotation = 0, size = 1.0) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.scale(size, size);
  
  ctx.fillStyle = '#aa8866';
  ctx.beginPath();
  ctx.moveTo(0, -8);
  ctx.lineTo(-6, 6);
  ctx.lineTo(6, 6);
  ctx.fill();
  
  ctx.restore();
}
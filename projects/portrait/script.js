const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const brown = '#673300';
const lightbrown = '#c9a881';

// -------------- Background --------------
ctx.fillStyle = 'black';
ctx.fillRect(0,0, 800,800);


// -------------- Face --------------
ctx.fillStyle = '#f0cca2';

ctx.beginPath();
ctx.ellipse(
    300,300,     // pos
    180,200,     // x/y radius
    0,           // rotation
    0,2*Math.PI  // angle start/stop
);

ctx.fill();

// -------------- Eye outlines --------------

ctx.fillStyle = lightbrown;

ctx.beginPath();
ctx.arc(
    200,295,     // pos
    60,          // radius
    0,2*Math.PI  // angle start/stop
);
ctx.fill();

ctx.beginPath();
ctx.arc(
    400,295,     // pos
    60,          // radius
    0,2*Math.PI  // angle start/stop
);
ctx.fill();

// -------------- Eye Whites --------------
ctx.fillStyle = 'white';

ctx.beginPath();
ctx.arc(
    200,300,     // pos
    60,          // radius
    0,2*Math.PI  // angle start/stop
);
ctx.fill();

ctx.beginPath();
ctx.arc(
    400,300,     // pos
    60,          // radius
    0,2*Math.PI  // angle start/stop
);
ctx.fill();

// -------------- Eye Iris --------------
ctx.fillStyle = brown;

ctx.beginPath();
ctx.arc(
    185,300,     // pos
    40,          // radius
    0,2*Math.PI  // angle start/stop
);
ctx.fill();

ctx.beginPath();
ctx.arc(
    385,300,     // pos
    40,          // radius
    0,2*Math.PI  // angle start/stop
);
ctx.fill();

// -------------- Eye Pupil --------------
ctx.fillStyle = 'black';

ctx.beginPath();
ctx.arc(
    180,300,     // pos
    25,          // radius
    0,2*Math.PI  // angle start/stop
);
ctx.fill();

ctx.beginPath();
ctx.arc(
    380,300,     // pos
    25,          // radius
    0,2*Math.PI  // angle start/stop
);
ctx.fill();

// -------------- Eye Shine --------------
ctx.fillStyle = 'lightgray';

ctx.beginPath();
ctx.arc(
    170,290,     // pos
    6,          // radius
    0,2*Math.PI  // angle start/stop
);
ctx.fill();

ctx.beginPath();
ctx.arc(
    370,290,     // pos
    6,          // radius
    0,2*Math.PI  // angle start/stop
);
ctx.fill();

// -------------- Eyebrows?? --------------
ctx.strokeStyle = brown;
ctx.lineWidth = 10;

ctx.beginPath();
ctx.ellipse(
    200,300,     // pos
    60, 100,          // radius
    0,
    21/16 * Math.PI,  // angle start/stop
    27/16 * Math.PI
);
ctx.stroke();

ctx.beginPath();
ctx.arc(
    400,300,         // pos
    80,              // radius
    16/12 * Math.PI,  // angle start/stop
    20/12 * Math.PI
);
ctx.stroke();

// -------------- Mouth --------------

ctx.strokeStyle = lightbrown;

ctx.beginPath();
ctx.ellipse(
    300,390,     // pos
    100, 20,          // radius
    0,
    14/12 * Math.PI,
    22/12 * Math.PI  // angle start/stop
);
ctx.stroke();

// strike it

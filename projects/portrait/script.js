const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const skin = '#f0cca2';
const lightbrown = '#c9a881';
const brown = '#502300';
const darkbrown = '#431900';

// ------------------- Background --------------------
ctx.fillStyle = 'hsl(180, 50%, 75%)';
ctx.fillRect(0,0, 600,600);

ctx.fillStyle = 'hsl(180, 50%, 82%)';
ctx.fillRect(0,200, 600,600);

ctx.fillStyle = 'hsl(180, 50%, 86%)';
ctx.fillRect(0,400, 600,600);


// -------------------- Clothing --------------------
ctx.fillStyle = '#676767';
ctx.fillRect(165,510, 270,100);

ctx.beginPath();
ctx.arc(
    165,610,     // pos
    100,         // radius
    0,2*Math.PI  // angle start/stop
);
ctx.fill();

ctx.beginPath();
ctx.arc(
    445,610,     // pos
    100,         // radius
    0,2*Math.PI  // angle start/stop
);
ctx.fill();

// -------------------- Neck --------------------

ctx.fillStyle = lightbrown;
ctx.fillRect(240,450, 120, 100);

// -------------------- Hair (Back) --------------------

ctx.fillStyle = darkbrown;

ctx.beginPath();
ctx.ellipse(
    150,350,   // pos
    30, 70,    // radius
    0,
    -1.25 * Math.PI,
    0 * Math.PI  // angle start/stop
);
ctx.fill();

ctx.beginPath();
ctx.ellipse(
    600-150, 350,   // pos
    30, 70,    // radius
    0,
    -1 * Math.PI,
    0.25 * Math.PI  // angle start/stop
);
ctx.fill();

// ------------------- Ears --------------------

ctx.fillStyle = lightbrown;

ctx.beginPath();
ctx.ellipse(
    140,300,     // pos
    30,60,     // x/y radius
    0,           // rotation
    0,2*Math.PI  // angle start/stop
);
ctx.fill();

ctx.beginPath();
ctx.ellipse(
    600-140, 300,     // pos
    30,60,     // x/y radius
    0,           // rotation
    0,2*Math.PI  // angle start/stop
);
ctx.fill();

// -------------------- Hair (Over Ears) --------------------

ctx.fillStyle = darkbrown;

// Left
ctx.beginPath();
ctx.ellipse(
    130,270,   // pos
    30, 70,    // radius
    0,
    -1.2 * Math.PI,
    -0.1 * Math.PI  // angle start/stop
);
ctx.fill();

// Right
ctx.beginPath();
ctx.ellipse(
    600-130, 270,   // pos
    30, 80,    // radius
    0,
    -0.9 * Math.PI,
    0.2 * Math.PI  // angle start/stop
);
ctx.fill();


// -------------------- Face --------------------
ctx.fillStyle = skin;

ctx.beginPath();
ctx.ellipse(
    300,300,     // pos
    180,200,     // x/y radius
    0,           // rotation
    0,2*Math.PI  // angle start/stop
);

ctx.fill();

// -------------------- Eye outlines --------------------

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

// -------------------- Eye Whites --------------------
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

// -------------------- Eye Iris --------------------
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

// -------------------- Eye Pupil --------------------
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

// -------------------- Eye Shine --------------------
ctx.fillStyle = 'lightgray';

ctx.beginPath();
ctx.arc(
    170,290,     // pos
    6,           // radius
    0,2*Math.PI  // angle start/stop
);
ctx.fill();

ctx.beginPath();
ctx.arc(
    370,290,     // pos
    6,           // radius
    0,2*Math.PI  // angle start/stop
);
ctx.fill();

// -------------------- Eyebrows?? --------------------
ctx.strokeStyle = brown;
ctx.lineWidth = 10;

// Left
ctx.beginPath();
ctx.ellipse(
    200,305,     // pos
    60, 100,     // radius
    0,
    21/16 * Math.PI,  // angle start/stop
    27/16 * Math.PI
);
ctx.stroke();

// Right
ctx.beginPath();
ctx.arc(
    400,305,         // pos
    80,              // radius
    16/12 * Math.PI, // angle start/stop
    20/12 * Math.PI
);
ctx.stroke();

// -------------------- Mouth --------------------

ctx.strokeStyle = lightbrown;

ctx.beginPath();
// ctx.ellipse(
//     300,410,   // pos
//     40, 80,    // radius
//     0,
//     14/12 * Math.PI,
//     22/12 * Math.PI  // angle start/stop
// );
// ctx.ellipse(
//     300,370,     // pos
//     150, 80,          // radius
//     0,
//     -0.05 * Math.PI,   
//     1.05 * Math.PI  // angle start/stop
// );

ctx.moveTo(260, 400);
ctx.lineTo(300, 350);
ctx.lineTo(340, 400);

ctx.stroke();

// -------------------- Hair (Front) --------------------

ctx.fillStyle = darkbrown;

// Upper lump
ctx.beginPath();
ctx.ellipse(
    310,126,   // pos
    160, 95,    // radius
    0.03 * Math.PI,
    -1 * Math.PI,
    0.1 * Math.PI  // angle start/stop
);
ctx.fill();
    
ctx.fillStyle = brown;

// Main
ctx.beginPath();
ctx.ellipse(
    297,190,   // pos
    185, 150,    // radius
    0,
    -0.97 * Math.PI,
    0 * Math.PI  // angle start/stop
);
ctx.fill();

// Left
ctx.beginPath();
ctx.ellipse(
    149,170,   // pos
    75, 35,    // radius
    -0.36 * Math.PI,
    0 * Math.PI,
    2 * Math.PI  // angle start/stop
);
ctx.fill();

// Right
ctx.beginPath();
ctx.ellipse(
    390,167,   // pos
    97, 35,    // radius
    0.1 * Math.PI,
    0 * Math.PI,
    2 * Math.PI  // angle start/stop
);
ctx.fill();

// Central
ctx.beginPath();
ctx.ellipse(
    260,180,   // pos
    100, 10,    // radius
    0.01 * Math.PI,
    0 * Math.PI,
    2 * Math.PI  // angle start/stop
);
ctx.fill();
// ------------------------------------------------- Canvas ONE -------------------------------------------------

let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext("2d");

for (let y = 0; y <= 200; y += 100) {
    for (let x = 0; x <= 700; x += 100) {
        ctx.fillRect(x,y, 60, 20);
    }
}

// ------------------------------------------------- Canvas TWO -------------------------------------------------

canvas = document.getElementById("canvas2");
ctx = canvas.getContext("2d");

for (let y = 0; y <= 700; y += 100) {
    for (let x = 0; x < y; x += 100) {
        ctx.fillRect(x,y, 60, 20);
    }
}

// ------------------------------------------------ Canvas THREE ------------------------------------------------

canvas = document.getElementById("canvas3");
ctx = canvas.getContext("2d");

for (let y = 0; y <= 700; y += 100) {
    for (let x = 0; x <= 700; x += 100) {
        if (x != y) {
            ctx.fillRect(x,y, 60, 20);
        }
    }
}

// ------------------------------------------------ Canvas FOUR -------------------------------------------------

canvas = document.getElementById("canvas4");
ctx = canvas.getContext("2d");

for (let y = 0; y <= 700; y += 200) {
    for (let x = 0; x <= 700; x += 200) {
        ctx.fillRect(x,y, 100, 100);
        ctx.fillRect(x+100, y+100, 100, 100);
    }
}
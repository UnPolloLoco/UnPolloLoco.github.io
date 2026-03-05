"use strict";

function addToBody(text) {
    document.body.innerHTML += '<p>' + text + '</p>';
}

/*
let yourName = prompt('What is your name?!');
addToBody('Hello, ' + yourName + '!!');
*/

let temperature = prompt("What's the temperature?");
temperature = Number(temperature);

addToBody("It's " + temperature + 'ºF right now.');

if (temperature <= 32) {
    addToBody('Freezing temperatures!? Bring a jacket!');
} else if (temperature >= 80) {
    addToBody('TOO HOT. DO NOT STRAY OUTSIDE OF AN AIR CONDITIONED AREA FOR MORE THAN TEN MINUTES. IF IT IS ABSOLUTELY IMPOSSIBLE TO AVOID LEAVING YOUR COOLED AREA, AVOID DIRECT SUNLIGHT.');
} else {
    addToBody('Exquisite weather, go for a walk!');
}

addToBody('Have a nice day!! :D')
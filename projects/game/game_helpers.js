const darkGreen = '#0a0';

// This function prints text out to the terminal
function print(text) {
    const output = document.getElementById('output');
    const line = document.createElement('div');
    line.innerHTML = "<p>" + text + "</p>";
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
}

// RETURN a colorful span
function color(text, colorName) {
    return '<span style="color:' + colorName + ';">' + text + '</span>';
}

// Write out current location
function printLocation(name) {
    console.log(hasCurseOfTheOrb, escapeFailed, escapeSuccess, name)
    // Check if overcome by the CURSE
    if (hasCurseOfTheOrb && !escapeFailed && !escapeSuccess) {
        // Normal checking
        if (name == 'Campsite') {
            escapeSuccess = true;
            hasCurseOfTheOrb = false;
        } else if (remainingTurnsToEscape <= 0) {
            escapeFailed = true;
            goFailScreen(); // todo
        }
    }

    if (hasCurseOfTheOrb) {
        // --- CURSED? ---
        remainingTurnsToEscape = remainingTurnsToEscape - 1;

        print(
            color('Location: ', darkGreen) 
            + color(name, 'lime')
            + '\n'
            + color('          '+remainingTurnsToEscape+' Moves Remaining', 'magenta') 
        );
    } else {
        // --- Not cursed (normal) --- 
        print(
            color('Location: ', darkGreen) 
            + color(name, 'lime')
        );
    }
}

// Bad input complaint
let complaintElementExists = false;

function printComplaint(input) {
    if (input != '') {
        let warning = `\nThe gremlins in your computer don't understand what "${input}" means.\nStuck? Try typing "1", for example (without quotes).`;

        if (!complaintElementExists) {
            // Create warning
            print(`<span id="input-complaint"></span>`);
            complaintElementExists = true;
        }

        document.getElementById('input-complaint').innerText = warning;
    }
}

// Ask where you want to go
function askToMoveWithOptions(options) {
    print(
        color(`Enter the <em>number</em> of an action to preform it:\n`, darkGreen) 
        + options
    );
}

// Location option numbererer
function locationOption(number, name) {
    let coloredNumber = color(`${number}.`, 'lime');
    let coloredName = color(`${name}`, darkGreen);

    return `\t${coloredNumber} ${coloredName}\n`;
}

// Item get announcement
function printItemGet(name) {
    print(color(name + ' acquired!', 'yellow'))
}

// Enter to continue prompt
function printEnterToContinue() {
    print(color(
        "Click " + color("ENTER", 'lime') + " to continue!!",
        darkGreen
    ));
}

//this formats text inside a pre tag.
//it just makes sure that HTML doesn't mess with spacing
//tip - ASCII art will need to escape any backslashes!
//      so to print \, you'll need to say \\
function printAscii(art) {
    const output = document.getElementById('output');
    const pre = document.createElement('pre');
    pre.className = 'ascii-art';
    pre.textContent = art;
    output.appendChild(pre);
    output.scrollTop = output.scrollHeight;
}

//clears the output screen.
//this isn't really necessary, but I found that the output
//looked cluttered if I didn't clear it every time the user
//enters a new command
function clear() {
    document.getElementById('output').innerHTML = '';
    complaintElementExists = false;
}

// This lets the user type input. It acts a little weird.
// Don't worry too much yet about how it works. Just know
// that when you press the enter key, it grabs what you typed
// and passes it to a function called `handleInput`
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && gameActive) {
        const input = this.value.trim();
        this.value = '';
        // print('> ' + input);
        handleInput(input);
    }
});

//This function will be overridden by the current game state
function handleInput(input) {
    console.log("No handler for input: " + input);
}

//This is the function you should call in your game code. Its
//input is a function that takes a string and decides what to do with it
function waitForInput(handlerFunction){
    handleInput = handlerFunction;
}

function waitThenCall(target){
    setTimeout(target,2000);
}

function stayHere(){
    print("I have no idea what that means.");
}
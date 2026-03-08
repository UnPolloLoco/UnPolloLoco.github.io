let gameActive = true; //this variable is required. 
                       //to stop the game, set it to false.


// --------------------- Global Variables ---------------------

let hasMap = false;
let hasSmallKey = false;
let hasMediumKey = false;
let hasLargeKey = false;
let hasLantern = false;
let hasDiscoveredSecretPass = false;
let hasCurseOfTheOrb = false;
// let remainingTurnsToEscape = 3149578;

// --------------------- Location A ---------------------
function locationA() {
    clear();
    printLocation('Location A');

    print('something interesting happens...');

    askToMoveWithOptions(
        locationOption(1, 'locationB') + 
        locationOption(2, 'fake location')
    );
    
    function processInput(input){
        if (input == 1) { locationB(); } 
        else { printComplaint(input); }
    }
    waitForInput(processInput);
}

// --------------------- Location B---------------------
function locationB() {
    clear();
    print("You are in location B!");
    print("Where do you want to go next? Say one of these choices:" +
        "\n\tlocationA");
    
    function processInput(input){
        if (input.toLowerCase() === "locationa") {
            locationA();
        } else {
            stayHere();
            waitThenCall(locationB);
        }
    }
    waitForInput(processInput);
}

// --------------------- Start Screen ---------------------
function start() {
    printAscii(`\
                       ~~~  The Hunt For  ~~~


 ********  **     **  ********         *******   ********   ******** 
    **     **     **  **              **     **  **     **  **     **
    $$     $$     $$  $$              $$     $$  $$     $$  $$     $$
    $$     $$$$$$$$$  $$$$$$          $$     $$  $$$$$$$$   $$$$$$$$ 
    $$     $$     $$  $$              $$     $$  $$   $$    $$     $$
    @@     @@     @@  @@              @@     @@  @@    @@   @@     @@
    @@     @@     @@  @@@@@@@@         @@@@@@@   @@     @@  @@@@@@@@ 
    `);
    // "banner3" font by Merlin Greywolf merlin@brahms.udel.edu August 9, 1994

    print('\n\n\n')
    print(color(
        "Click " + color("ENTER", 'lime') + " to continue!!",
        darkGreen
    ));

    function processInput(input){
        start2();
    }
    waitForInput(processInput);
}

function start2() {
    clear()

    print(
        color('OBJECTIVE: ', 'orange') +
        color('Find and steal THE ORB.', 'yellow')
    );
    print('\n\n');

    print("After years of dedicated study, you have finally tracked down the location of " + color("THE ORB", 'lime') + ", a legendary artifact of spherical proportions that's rumored to grant its bearer a boundless foresight.")
    print(color("THE ORB", 'lime') + " resides in a temple, hidden within the very forest that you've set up camp in. You spent the last week paddling up and down the forest's rivers in order to pinpoint the temples exact location——and that you did. Just last night, you finally saw it with your own two eyes!")
    print("Today, you'll " + color('paddle back to the temple', 'cyan') + " using the map you made, and upon arrival, " + color("preform the great heist", 'cyan') + " at last.")

    // There's one thing you've been trying to push to the back of your head: THE CURSE OF THE ORB

    print('\n\n\n')
    print(color(
        "Click " + color("ENTER", 'lime') + " to start!!",
        darkGreen
    ));

    function processInput(input){
        locationA();
    }
    waitForInput(processInput);
}
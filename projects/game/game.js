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

    print("After years of dedicated study, your band of treasure hunters has finally tracked down " + color("THE ORB", 'lime') + ", a legendary artifact of spherical proportions that's rumored to grant its bearer a boundless foresight.")
    print(color("THE ORB", 'lime') + " resides in a temple, hidden within the very forest that you've set up camp in. Your resident map expert has located the temple to be " + color('downriver from your campsite', 'cyan') + ", and today, that's where you're headed.")
    print("Unfortunately, nobody else wants to take the final step with you. What could possibly hold them back after all this preparation!? Well, they fear the " + color("CURSE OF THE ORB", darkGreen) + ", which threatens the complete and total destruction of anyone who dares siphon the power of " + color("THE ORB", 'lime') + ' for themself.')
    print("So... you'll have to do it alone. Good luck!")

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
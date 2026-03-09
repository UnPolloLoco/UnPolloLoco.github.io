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

// --------------------- Make the River Map Usable ---------------------

let riverMapButWeird =  `\
+----------------------------------------------------------------------------------+
|                                                                                  |
|                                            H--.__x                                 |
|                                                 H^^-.x     I__.._x                   |
|                                                     H\\_xI.^      \\.__x               |
|                 D_.---.__x                             G/x            I^--.__ Templex  |
|                         D\\x                          G./x                            |
|                         D/xE___.....__x           G__.-^x                              |      
|                    L_.--^x           E^--.._xG_..--x                                   |
|                  L./x                      F\\.x              J_..----..x               |
|                L./x                          F\\x           J_/x                        |
|  ACamp ___..---=xB_x                            F^.____xJ_..-^x                          |
|                 B^\\__x                              K\\.__x                           |
|                     B^---x                                                         |
|                                                                                  |
+----------------------------------------------------------------------------------+`;

// riverMapButWeird = riverMapButWeird.replaceAll('')

// --------------------- Campsite ---------------------
function goCampsite() {
    clear();
    printLocation('Campsite');

    print('Today is the day!');
    if (hasMap) {
        // Has map
        print("You should depart for the temple. It's not like there's anything else to do in this sad little clearing.");
    } else {
        // No map
        print("You should collect the map that you left in your tent, then depart for the temple. It's not like there's anything else to do in this sad little clearing.");
    }

    askToMoveWithOptions(
        locationOption(1, 'Enter tent') + 
        locationOption(2, 'Board boat')
    );
    
    function processInput(input){
        if (input == 1) { goTent(); } 
        else if (input == 2) { goBoat(); } 
        else { printComplaint(input); }
    }
    waitForInput(processInput);
}

// --------------------- Tent ---------------------
function goTent() {
    clear();
    printLocation('Your Tent');

    if (hasMap) {
        // You already have the map
        print('"Wait," you mumble, "why am I back here?"')
    } else {
        // No map yet
        print("You look around your drab tent with excitement, knowing it's likely the last day you'll have to sleep here. You pick your map up off the ground.");
        printItemGet('Map');

        hasMap = true;
    }

    askToMoveWithOptions(
        locationOption(1, 'Leave Tent')
    );
    
    function processInput(input){
        if (input == 1) { goCampsite(); } 
        else { printComplaint(input); }
    }
    waitForInput(processInput);
}

// --------------------- Boat ---------------------
function goBoat() {
    clear();
    printLocation('The Boat');

    if (hasMap) {
        // You already have the map
        print('You jump in and immediately begin paddling away. ')

        print(color(
            "Click " + color("ENTER", 'lime') + " to continue!!",
            darkGreen
        ));
    } else {
        // No map yet
        print("You KNOW you don't know where you're going. You should get that map.");

        askToMoveWithOptions(
            locationOption(1, 'Leave Boat')
        );
    }
    
    function processInput(input){
        if (hasMap) {
            // Already have map
            goRiver();
        } else {
            // No map
            if (input == 1) { goCampsite(); } 
            else { printComplaint(input); }
        }
    }
    waitForInput(processInput);
}

// --------------------- River ---------------------
function goRiver() {
    clear();
    printLocation('River');

    print('...');

    askToMoveWithOptions(
        locationOption(1, 'Enter tent') + 
        locationOption(2, 'Board boat')
    );
    
    function processInput(input){
        if (input == 1) { goTent(); } 
        else if (input == 2) { goBoat(); } 
        else { printComplaint(input); }
    }
    waitForInput(processInput);
}

// --------------------- Start Screens ---------------------
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
        goCampsite();
    }
    waitForInput(processInput);
}
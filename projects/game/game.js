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
let isEscaping = false;
// let remainingTurnsToEscape = 3149578;

// --------------------- Make the River Map Usable ---------------------

let riverMap =  `\
+----------------------------------------------------------------------------------+
|    |                                                                             |
|  ——O——                                     H--.__x                                 |
|    |                                            H^^-.x     I__.._x                   |
|                                                     H\\_xI.^      \\.__x               |
|                 D_.---.__x                             G/x            I^--.__x XTemplex  |
|                         D\\x                          G./x                            |
|                         D/xE___.....__x           G__.-^x                              |      
|                    L_.--^x           E^--.._xG_..--x                                   |
|                  L./x                      F\\.x              J_..----..x               |
|                L./x                          F\\x           J_/x                        |
|  XCampx A___..---=xB_x                            F^.____xJ_..-^x                          |
|                 B^\\__x                              K\\.__x                           |
|                     B^---x                                                         |
|                                                                                  |
+----------------------------------------------------------------------------------+`;

riverMap = riverMap.replaceAll('A', '<span class="river river-part-a">');
riverMap = riverMap.replaceAll('B', '<span class="river river-part-b">');
    // skip Cs
riverMap = riverMap.replaceAll('D', '<span class="river river-part-d">');
riverMap = riverMap.replaceAll('E', '<span class="river river-part-e">');
riverMap = riverMap.replaceAll('F', '<span class="river river-part-f">');
riverMap = riverMap.replaceAll('G', '<span class="river river-part-g">');
riverMap = riverMap.replaceAll('H', '<span class="river river-part-h">');
riverMap = riverMap.replaceAll('I', '<span class="river river-part-i">');
riverMap = riverMap.replaceAll('J', '<span class="river river-part-j">');
riverMap = riverMap.replaceAll('K', '<span class="river river-part-k">');
riverMap = riverMap.replaceAll('L', '<span class="river river-part-l">');

riverMap = riverMap.replaceAll('X', '<span class="river-label">');
riverMap = riverMap.replaceAll('x', '</span>');

// Controlling the color of each segment of the map

function highlightRiverPart(partName) {
    document.querySelectorAll('.river-part-' + partName).forEach((element) => {     // Loop through every span with this class
        element.classList.add("river-highlight");                                   // ADD highlight class
    })
}
function dimRiverPart(partName) {
    document.querySelectorAll('.river-part-' + partName).forEach((element) => {     // Loop through every span with this class
        element.classList.remove("river-highlight");                                // REMOVE highlight class
    })
}

// Map print function (I probably didn't need this...)

function printRiverMap() { print(riverMap); }

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
        print('You jump in and immediately begin paddling away.')

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
            goRiver('a');
        } else {
            // No map
            if (input == 1) { goCampsite(); } 
            else { printComplaint(input); }
        }
    }
    waitForInput(processInput);
}

// --------------------- River ---------------------

function goRiver(segment) {
    clear();
    printLocation('River');

    print('Paddling along...\nYou soon reach a fork in the river. Which way do you turn? Consult your map.')

    printRiverMap();
    
    // Change location events based on which segment of the river you're on
    
    let leftSegment;
    let rightSegment;
    let previousSegment;

    let isDeadEnd = false;
    let isWrongWay = false;
    let successfullyFinishedRiver = false;
    
    if (segment == 'a') {
        // ---- Segment A ----
        leftSegment = 'l';
        rightSegment = 'b';
        highlightRiverPart('a');

    } else if (segment == 'b') {
        // ---- Segment B ----
        isDeadEnd = true;
        isWrongWay = true;
        previousSegment = 'a';
        highlightRiverPart('a');
        highlightRiverPart('b');
        
    } else if (segment == 'd') {
        // ---- Segment D ----
        isDeadEnd = true;
        isWrongWay = true;
        previousSegment = 'l';
        highlightRiverPart('a');
        highlightRiverPart('l');
        highlightRiverPart('d');
        
    } else if (segment == 'e') {
        // ---- Segment E ----
        leftSegment = 'g';
        rightSegment = 'f';
        highlightRiverPart('a');
        highlightRiverPart('l');
        highlightRiverPart('e');

    } else if (segment == 'f') {
        // ---- Segment F ----
        leftSegment = 'j';
        rightSegment = 'k';
        isWrongWay = true;
        previousSegment = 'e';
        highlightRiverPart('a');
        highlightRiverPart('l');
        highlightRiverPart('e');
        highlightRiverPart('f');

    } else if (segment == 'g') {
        // ---- Segment G ----
        leftSegment = 'h';
        rightSegment = 'i';
        highlightRiverPart('a');
        highlightRiverPart('l');
        highlightRiverPart('e');
        highlightRiverPart('g');

    } else if (segment == 'h') {
        // ---- Segment H ----
        isDeadEnd = true;
        isWrongWay = true;
        previousSegment = 'g';
        highlightRiverPart('a');
        highlightRiverPart('l');
        highlightRiverPart('e');
        highlightRiverPart('g');
        highlightRiverPart('h');

    } else if (segment == 'i') {
        // ---- Segment I ----
        successfullyFinishedRiver = true;
        highlightRiverPart('a');
        highlightRiverPart('l');
        highlightRiverPart('e');
        highlightRiverPart('g');
        highlightRiverPart('i');

    } else if (segment == 'j') {
        // ---- Segment J ----
        isDeadEnd = true;
        isWrongWay = true;
        previousSegment = 'f';
        highlightRiverPart('a');
        highlightRiverPart('l');
        highlightRiverPart('e');
        highlightRiverPart('f');
        highlightRiverPart('j');

    } else if (segment == 'k') {
        // ---- Segment K ----
        isDeadEnd = true;
        isWrongWay = true;
        previousSegment = 'f';
        highlightRiverPart('a');
        highlightRiverPart('l');
        highlightRiverPart('e');
        highlightRiverPart('f');
        highlightRiverPart('k');

    } else if (segment == 'l') {
        // ---- Segment L ----
        leftSegment = 'd';
        rightSegment = 'e';
        highlightRiverPart('a');
        highlightRiverPart('l');
    }

    if (isWrongWay) {
        // Wrong way
        print('"Hmmmmm," you ask yourself. "' + color('Did I go the right way?','magenta') + '"');
    } else {
        // Not wrong way
        print("<em>Hint: The yellow line shows where you've travelled so far.</em>");
    }

    // Options

    if (isDeadEnd) {
        // --- DEAD END? ---
        askToMoveWithOptions(
            locationOption(1, 'Go back') 
        );
        function processInput(input){
            if (input == 1) { goRiver(previousSegment); } 
            else { printComplaint(input); }
        }

    } else if (isWrongWay) {
        // --- WRONG WAY but NOT DEAD END? ---
        askToMoveWithOptions(
            locationOption(1, 'Go left') + 
            locationOption(2, 'Go right') +
            locationOption(3, 'Go back')
        );
        function processInput(input){
            if (input == 1) { goRiver(leftSegment); } 
            else if (input == 2) { goRiver(rightSegment); } 
            else if (input == 3) { goRiver(previousSegment); } 
            else { printComplaint(input); }
        }

    } else {
        // --- ALL WENT WELL ---
        askToMoveWithOptions(
            locationOption(1, 'Go left') + 
            locationOption(2, 'Go right')
        );
        function processInput(input){
            if (input == 1) { goRiver(leftSegment); } 
            else if (input == 2) { goRiver(rightSegment); } 
            else { printComplaint(input); }
        }
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
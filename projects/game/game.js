let gameActive = true; //this variable is required. 
                       //to stop the game, set it to false.


// --------------------- Global Variables ---------------------

let hasMap = false;
let hasSmallKey = false;
let hasMediumKey = false;
let hasLargeKey = false;
let totalKeyCount = 0;
let hasFlashlight = false;
let hasDiscoveredSecretPass = false;
let hasOpenedMassiveDoor = false;

let hasCurseOfTheOrb = false;
let remainingTurnsToEscape = 9999999;
let maxTurnsToEscape = 15;
let escapeFailed = false;
let escapeSuccess = false;
let hasSeenFailScreen = false;

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

    if (!escapeSuccess) {
        // ----- NORMAL CAMPSITE TEXT -----

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
            locationOption(2, 'Board boat') +
            locationOption(3, 'SKIP AHEAD!!') +
            locationOption(4, 'SKIP VERY AHEAD!!')
        );
        
        function processInput(input){
            if (input == 1) { goTent(); } 
            else if (input == 2) { goBoat(); } 
            else if (input == 3) { goTempleGrounds(); } 
            else if (input == 4) { goSanctum(); hasFlashlight=true;hasSmallKey=true;hasMediumKey=true;hasLargeKey=true;totalKeyCount=3;hasDiscoveredSecretPass=true;hasMap=true;hasOpenedMassiveDoor=true; } 
            else { printComplaint(input); }
        }
        waitForInput(processInput);


    } else {
        // ----- YOU WON THE GAME!!!!!! -----

        print('win'); // todo

        printEnterToContinue();
        function processInput(input){ goWinScreen(); }
        waitForInput(processInput);
    }
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

        printEnterToContinue();
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
            goRiverIntermediate('a');
        } else {
            // No map
            if (input == 1) { goCampsite(); } 
            else { printComplaint(input); }
        }
    }
    waitForInput(processInput);
}

// --------------------- River ---------------------

function goRiverIntermediate(segment) {
    clear();
    remainingTurnsToEscape = remainingTurnsToEscape + 1; // offset double loss
    printLocation('River');
    print('Paddling along...');

    setTimeout(() => { goRiver(segment); }, 800); // 0.8 seconds
}

function goRiver(segment) {
    clear();
    printLocation('River');

    if (segment == 'i' && !hasCurseOfTheOrb) {
        // TRIP FINISHED - INCOMING
        print("You've made it to the end of your map! You stop your boat and hop off onto the small beach.")
    } else if (segment == 'a' && hasCurseOfTheOrb) {
        // TRIP FINISHED - OUTGOING
        print("Soon enough, your small tent comes into view.")
    } else {
        // Normal message
        print('You soon reach a fork in the river. Which way do you turn? Consult your map.')
    }

    printRiverMap();
    
    // Change location events based on which segment of the river you're on
    
    let leftSegment;
    let rightSegment;
    let previousSegment;

    let isDeadEnd = false;
    let isWrongWay = false;
    let successfullyFinishedRiver = false;

    if (!hasCurseOfTheOrb) {
        // ----- ORIGINAL ROUTE -----
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

    } else {
        // ----- CURSED RETURN ROUTE -----
        if (segment == 'a') {
            // ---- Segment A ---- 
            successfullyFinishedRiver = true;
            highlightRiverPart('i');
            highlightRiverPart('g');
            highlightRiverPart('e');
            highlightRiverPart('l');
            highlightRiverPart('a');
    
        } else if (segment == 'b') {
            // ---- Segment B ---- 
            isDeadEnd = true;
            isWrongWay = true;
            previousSegment = 'l';
            highlightRiverPart('i');
            highlightRiverPart('g');
            highlightRiverPart('e');
            highlightRiverPart('l');
            highlightRiverPart('b');
            
        } else if (segment == 'd') {
            // ---- Segment D ---- 
            isDeadEnd = true;
            isWrongWay = true;
            previousSegment = 'e';
            highlightRiverPart('i');
            highlightRiverPart('g');
            highlightRiverPart('e');
            highlightRiverPart('d');
            
        } else if (segment == 'e') {
            // ---- Segment E ---- 
            leftSegment = 'l';
            rightSegment = 'd';
            highlightRiverPart('i');
            highlightRiverPart('g');
            highlightRiverPart('e');
    
        } else if (segment == 'f') {
            // ---- Segment F ---- 
            leftSegment = 'j';
            rightSegment = 'k';
            isWrongWay = true;
            previousSegment = 'g';
            highlightRiverPart('i');
            highlightRiverPart('g');
            highlightRiverPart('f');
    
        } else if (segment == 'g') {
            // ---- Segment G ---- 
            leftSegment = 'f';
            rightSegment = 'e';
            highlightRiverPart('i');
            highlightRiverPart('g');
    
        } else if (segment == 'h') {
            // ---- Segment H ---- 
            isDeadEnd = true;
            isWrongWay = true;
            previousSegment = 'i';
            highlightRiverPart('i');
            highlightRiverPart('h');
    
        } else if (segment == 'i') {
            // ---- Segment I ---- 
            leftSegment = 'g';
            rightSegment = 'h';
            highlightRiverPart('i');
    
        } else if (segment == 'j') {
            // ---- Segment J ----
            isDeadEnd = true;
            isWrongWay = true;
            previousSegment = 'f';
            highlightRiverPart('i');
            highlightRiverPart('g');
            highlightRiverPart('f');
            highlightRiverPart('j');
    
        } else if (segment == 'k') {
            // ---- Segment K ----
            isDeadEnd = true;
            isWrongWay = true;
            previousSegment = 'f';
            highlightRiverPart('i');
            highlightRiverPart('g');
            highlightRiverPart('f');
            highlightRiverPart('k');
    
        } else if (segment == 'l') {
            // ---- Segment L ---- 
            leftSegment = 'b';
            rightSegment = 'a';
            highlightRiverPart('i');
            highlightRiverPart('g');
            highlightRiverPart('e');
            highlightRiverPart('l');
        }

    }


    // Final message

    if (isWrongWay) {
        // Wrong way
        print('"Wait..." you ask yourself. "' + color('Did I go the right way..?','magenta') + '"');

    } else if (segment == 'i' && !hasCurseOfTheOrb) {
        // End of river (not cursed)
        print(color('THE ORB', 'lime') + " is close. You can feel it.")

    } else if (segment == 'a' && hasCurseOfTheOrb) {
        // End of river (CURSED)
        print('You ' + color("made it back to camp","cyan") + ', and all in one piece at that!!!');
        
    } else {
        // Everything else
        print("<em>Hint: The yellow line shows where you've travelled so far.</em>");
    }

    // Options

    if (isDeadEnd) {
        // --- DEAD END? ---
        askToMoveWithOptions(
            locationOption(1, 'Go back') 
        );
        function processInput(input){
            if (input == 1) { goRiverIntermediate(previousSegment); } 
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
            if (input == 1) { goRiverIntermediate(leftSegment); } 
            else if (input == 2) { goRiverIntermediate(rightSegment); } 
            else if (input == 3) { goRiverIntermediate(previousSegment); } 
            else { printComplaint(input); }
        }

    } else if (!hasCurseOfTheOrb && segment == 'i') {
        // --- MADE IT TO THE TEMPLE!!!!!!!! ---
        printEnterToContinue();

        function processInput(input){
            goRiverbank();
        }
        waitForInput(processInput);

    } else if (hasCurseOfTheOrb && segment == 'a') {
        // --- ESCAPED FROM THE TEMPLE!!!!!!!! ---
        printEnterToContinue();

        function processInput(input){
            goCampsite();
        }
        waitForInput(processInput);

    } else {
        // --- ALL WENT WELL ---
        askToMoveWithOptions(
            locationOption(1, 'Go left') + 
            locationOption(2, 'Go right')
        );
        function processInput(input){
            if (input == 1) { goRiverIntermediate(leftSegment); } 
            else if (input == 2) { goRiverIntermediate(rightSegment); } 
            else { printComplaint(input); }
        }
    }
    
    waitForInput(processInput);
}

// --------------------- Riverbank ---------------------

function goRiverbank() {
    clear();
    printLocation('Riverbank');
    
    print("Through the trees, you can see it——this is the first time you've seen the temple in daylight, and it's even more impressive than you remember.");
    
    askToMoveWithOptions(
        locationOption(1, 'Continue to temple grounds') + 
        locationOption(2, 'Board boat')
    );
    
    function processInput(input){
        if (input == 1) { goTempleGrounds(); }
        else if (input == 2) { goBoatReturn(); }
        else { printComplaint(input); }
    }
    waitForInput(processInput);
}

// --------------------- Boat (return) ---------------------

function goBoatReturn() {
    clear();
    printLocation('The Boat');

    if (hasCurseOfTheOrb) {
        // Escaping
        print("You dash through the last line of foliage, and arrive at your patiently waiting boat.");
        print("You jump in, and almost immediately begin paddling away.")
    } else {
        // Cannot leave
        print("You can't turn back now! The temple is RIGHT THERE! Not to mention, you know, " + color('THE ORB', 'lime') + ' is also RIGHT THERE TOO!?');
    }

    printEnterToContinue();

    if (hasCurseOfTheOrb) {
        // Can leave
        function processInput(input){ goRiverIntermediate('i'); }
        waitForInput(processInput);
    } else {
        // Cannot leave
        function processInput(input){ goRiverbank(); }
        waitForInput(processInput);
    }
}

// --------------------- Temple Grounds ---------------------

function goTempleGrounds() {
    clear();
    printLocation('Temple Grounds');
    
    if (hasCurseOfTheOrb) {
        // Escaping
        print("You breathe a sigh of relief——you made it out of the temple!! Your troubles don't end here though, as the " + color('plume','magenta') + " is still hunting you down.\nAdmiring the ancient structure doesn't seem so appealing anymore...");
    } else {
        // Arriving
        print("You find yourself in what was probably once a quaint garden. The area is very overgrown, but you can still see a nice pathway and a bench. Then, of course, just ahead of you lies the towering walls of the temple.");
    }

    if (hasDiscoveredSecretPass) {
        if (hasCurseOfTheOrb) {
            // Found secret pass, entry door is blocked (ESCAPING)
            
            askToMoveWithOptions(
                locationOption(1, 'Enter temple through secret passage') + 
                locationOption(2, 'Sit on bench') + 
                locationOption(3, 'Escape to boat')
            );
            
            function processInput(input){
                if (input == 1) { goRoomFR(); }
                else if (input == 2) { goTempleBench(); }
                else if (input == 3) { goBoatReturn(); }
                else { printComplaint(input); }
            }
            waitForInput(processInput);

        } else {
            // Found secret pass, entry door is open

            askToMoveWithOptions(
                locationOption(1, 'Enter temple') + 
                locationOption(2, 'Enter temple through secret passage') + 
                locationOption(3, 'Sit on bench') + 
                locationOption(4, 'Return to riverbank')
            );
            
            function processInput(input){
                if (input == 1) { goGreatHall(); }
                else if (input == 2) { goRoomFR(); }
                else if (input == 3) { goTempleBench(); }
                else if (input == 4) { goRiverbank(); }
                else { printComplaint(input); }
            }
            waitForInput(processInput);
        }
    } else {
        // No secret pass yet (default)

        askToMoveWithOptions(
            locationOption(1, 'Enter temple') + 
            locationOption(2, 'Sit on bench') + 
            locationOption(3, 'Return to riverbank')
        );
        
        function processInput(input){
            if (input == 1) { goGreatHall(); }
            else if (input == 2) { goTempleBench(); }
            else if (input == 3) { goRiverbank(); }
            else { printComplaint(input); }
        }
        waitForInput(processInput);
    }
}

// --------------------- Bench outside Temple ---------------------

function goTempleBench() {
    clear();
    printLocation('Temple Grounds (Bench)');
    
    print("You head over to the bench (well, you <em>think</em> it's a bench) and take a seat. It's a nice place, out of the sun and with something of a view——in fact, you're pretty sure you can see a bird or two in the trees.");

    if (hasLargeKey == false) {
        // No key yet
        print("While you're looking around, your eye is suddenly caught on something shiny hidden within the tall grass. You get up to go investigate and... it's a key? A really, really big one, at that. Fascinating.");
        printItemGet('Large Key')
        hasLargeKey = true;
        totalKeyCount = totalKeyCount + 1;
    }

    if (hasCurseOfTheOrb) {
        print("...you REALLY shouldn't be lingering around, though.")
    }

    askToMoveWithOptions(
        locationOption(1, 'Leave bench') +
        locationOption(2, 'Sit for a little while longer')
    );
    
    function processInput(input){
        if (input == 1) { goTempleGrounds(); }
        else if (input == 2) { goTempleBenchIntermediate(); }
        else { printComplaint(input); }
    }
    waitForInput(processInput);
}

function goTempleBenchIntermediate() {
    clear();
    printLocation('Temple Grounds (Bench)');
    print('This bench is rather comfortable, actually...');

    setTimeout(() => { goTempleBench(); }, 2000); // 2 seconds
}

// --------------------- Great Hall ---------------------

function goGreatHall() {
    clear();
    printLocation('Temple (Great Hall)');

    if (hasCurseOfTheOrb) {
        // CURSED
        print('A deafening rumble fills the hall as a huge slab of rock descends from the ceiling and ' + color('blocks the main entryway', 'cyan') + ", right before your eyes. " + color('THE CURSE OF THE ORB', 'magenta') + " is responsible for this, you conclude. You're going to need another way out as soon as possible.");
    } else {


        // Not cursed
        if (hasFlashlight) {
            // Has flashlight
            print("A large, arched room stands before you. Armed with your flashlight, you can finally see its full splendor.")
        } else {
            // No flashlight
            print("A large, arched room stands before you. The only source of light is the entryway behind you, but the Sun is low enough to illuminate the room's main features.")
        }
    
        print("You can see a fountain in the center of the hall. Then, in each corner, there's what looks to be entrances to secondary rooms. Finally——and most importantly, you think——at the opposite end of the hall, you can see the outline of a " + color('massive door', darkGreen) + " that nearly extends to the top of the hall's vaulted ceiling. You are certain that " + color('THE ORB','lime') + "'s sacred resting place is on the other side.")
    }
    

    // Actions

    let sanctumPrompt = 'Approach the massive door';
    if (hasOpenedMassiveDoor) { sanctumPrompt = "Enter the Orb Sanctum"; }

    let exitPrompt = 'Exit temple';
    if (hasCurseOfTheOrb) { exitPrompt = "Exit temple (BLOCKED)"; }

    askToMoveWithOptions(
        locationOption(1, sanctumPrompt) + 
        locationOption(2, 'Approach the fountain') + 
        '\n'+
        locationOption(3, 'Enter front left room') + 
        locationOption(4, 'Enter front right room') + 
        locationOption(5, 'Enter back left room') + 
        locationOption(6, 'Enter back right room') + 
        '\n'+
        locationOption(7, exitPrompt)
    );
    
    function processInput(input){
        if (input == 1) { 
            if (hasCurseOfTheOrb) { goSanctumFail(); } // cursed
            else if (hasOpenedMassiveDoor) { goSanctum(); } // sanctum door open, not cursed
            else { goMassiveDoor(); } // default
        }
        else if (input == 2) { goFountain(); }
        else if (input == 3) { goRoomFL(); }
        else if (input == 4) { goRoomFR(); }
        else if (input == 5) { goRoomBL(); }
        else if (input == 6) { goRoomBR(); }
        else if (input == 7) { 
            if (hasCurseOfTheOrb) { goEntryDoorFail(); } // entry door blocked
            else { goTempleGrounds(); } // default
        }
        else { printComplaint(input); }
    }
    waitForInput(processInput);
}

// --------------------- Entry Door Blocked ---------------------

function goEntryDoorFail() {
    clear();
    printLocation('Temple (Great Hall)');

    print("Blocked means blocked! You cannot phase through solid matter! Find another exit!");

    printEnterToContinue();
    function processInput(input){ goGreatHall(); }
    waitForInput(processInput);
}

// --------------------- Massive Door ---------------------

function goMassiveDoor() {
    clear();
    printLocation('Temple (The Massive Door)');

    print(color('THE ORB','lime') + " is behind this very door——you're sure of it.")

    if (totalKeyCount == 3) {
        // About to unlock door
        print(
            "Nestled in the contours of the door's ornate design, you see three keyholes: one large, one medium, and one small." 
            + '\n' + color("You now have the keys to " + color('all 3','yellow') + " of the locks!!", 'orange')
        );
    } else {
        // Normal door message (not unlocked this turn)
        print(
            "Nestled in the contours of the door's ornate design, you see three keyholes: one large, one medium, and one small." 
            + '\n' + color("You have the keys to " + color(totalKeyCount,'yellow') + "/3 locks.", 'orange')
        );
        print("Since you miss 100% of the shots you don't take, you try to push open the door anyway... but the door doesn't budge. I guess you really do need all those keys.")
    }

    printEnterToContinue();
    
    function processInput(input){
        if (totalKeyCount == 3) { goMassiveDoor2(); } 
        else { goGreatHall(); }
    }
    waitForInput(processInput);
}

function goMassiveDoor2() {
    clear();
    printLocation('Temple (The Massive Door)');

    print("You insert the keys, push on the door, and sure enough, " + color('it opens','magenta') + "...");
    hasOpenedMassiveDoor = true;

    printEnterToContinue();
    
    function processInput(input){ goSanctum(); }
    waitForInput(processInput);
}


// --------------------- Fountain ---------------------

function goFountain() {
    clear();
    printLocation('Temple (Fountain)');
    
    print("You admire the fountain, and you try to picture what it's like when it actually has water in it.");

    if (hasMediumKey == false) {
        // No key yet
        print("Wait... what's that inside? A glint has caught your eye; it turns out to be a key.");
        printItemGet('Medium Key')
        hasMediumKey = true;
        totalKeyCount = totalKeyCount + 1;
    }

    printEnterToContinue();
    function processInput(input){ goGreatHall(); }
    waitForInput(processInput);
}

// --------------------- Room FL (dark, small key) ---------------------

function goRoomFL() {
    clear();
    printLocation('Temple (Front Left Room)');

    if (hasFlashlight == false) {
        // Room is dark
        print("It's " + color('too dark', 'magenta') + " to see anything in this room. Try your luck elsewhere.");
    } else {
        if (hasSmallKey) {
            // Already has key
            print("There's nothing else for you in this room.")
        } else {
            // No key yet
            print("This appears to be a storage room. Empty shelves line the walls——well, almost empty. In one crusty corner, you find a comically small key.");
            printItemGet('Small Key')
            hasSmallKey = true;
            totalKeyCount = totalKeyCount + 1;
        }
    }

    printEnterToContinue();
    function processInput(input){ goGreatHall(); }
    waitForInput(processInput);
}

// --------------------- Room FR (dark, secret pass) ---------------------

function goRoomFR() {
    clear();
    printLocation('Temple (Front Right Room)');

    if (hasFlashlight == false) {
        // Room is dark
        print("It's " + color('too dark', 'magenta') + " to see anything in this room. Try your luck elsewhere.");

        printEnterToContinue();
        function processInput(input){ goGreatHall(); }
        waitForInput(processInput);

    } else {
        // Room visible
        if (hasDiscoveredSecretPass) {
            // Already discovered secret pass
            if (hasCurseOfTheOrb) {
                // CURSED
                print("This is the room with the " + color('secret exit','cyan') + "! Now that you think about it, you're really lucky this exists.");
            } else {
                // Not cursed
                print("This is the room with the hidden doorway. It really doesn't have any other defining characteristics, though not much else could outshine a real-life secret door anyway.")
            }
        } else {
            // Just discovered secret pass
            print("Just an ordinary room... or is it?");
            print("One wall has a rectangular person-sized shape in it. You give the area a little push, because why not, and it moves! Sunlight comes streaming in——you just found a " + color('secret exit','cyan') + ".");
            hasDiscoveredSecretPass = true;
        }
        
        askToMoveWithOptions(
            locationOption(1, 'Use secret exit') + 
            locationOption(2, 'Return to great hall')
        );
        function processInput(input){
            if (input == 1) { goTempleGrounds(); }
            else if (input == 2) { goGreatHall(); }
            else { printComplaint(input); }
        }
        waitForInput(processInput);
    }
}

// --------------------- Room BL (empty!) ---------------------

function goRoomBL() {
    clear();
    printLocation('Temple (Back Left Room)');

    print("There's just enough light coming into this room for you to be able to decide that there is quite literally nothing of interest here. Except a cobweb, I suppose. Spiders are probably interesting.")

    printEnterToContinue();
    function processInput(input){ goGreatHall(); }
    waitForInput(processInput);
}

// --------------------- Room BR (flashlight, guy) ---------------------

function goRoomBR() {
    clear();
    printLocation('Temple (Back Right Room)');

    if (hasFlashlight) {
        // Already has flashlight
        print("There's nothing else for you here. You avoid looking at your late fellow explorer, but you cannot forget " + color('THE CURSE OF THE ORB', 'magenta') + ".");

        printEnterToContinue();
        function processInput(input){ goGreatHall(); }
        waitForInput(processInput);

    } else {
        // No flashlight
        print('Despite the darkness which shrouds this room, something on the floor manages to give of a faint glimmer. Upon closer inspection, it appears that the light you saw was a reflection from the glass of a... ' + color('flashlight', 'cyan') + "!?");
        printItemGet('Flashlight')
        print("Someone else was here. You pick up the flashlight and instinctively flick the switch, knowing nothing will happen. Well, it turns out YOU WERE WRONG, because a blazing beam of light just lit up the whole room, nearly giving you a heart attack in the process... but that's not the end of your frights today.");
        hasFlashlight = true;

        printEnterToContinue();
        function processInput(input){ goRoomBR2(); }
        waitForInput(processInput);
    }
}

// --------------------- Room BR Part 2 (curse lore) ---------------------

function goRoomBR2() {
    clear();
    printLocation('Temple (Back Right Room)');

    print("Once your eyes adjust, you quickly find the 'someone' who was here before you. Let's just say they don't need their flashlight anymore.");
    print("This interaction reminds you of an important little footnote you've been trying to push to the back of your mind: " + color('THE CURSE OF THE ORB', 'magenta') + ". According to " + color('THE CURSE OF THE ORB', 'magenta') + ", anyone who dares thieve the orb (i.e. YOU) will face complete and total destruction.");
    print("...But hey, if this guy made it as far as this room, surely you'll have " + color('the chance to escape', 'lime') + " too?");

    printEnterToContinue();
    function processInput(input){ goGreatHall(); }
    waitForInput(processInput);
}

// --------------------- Sanctum ---------------------

function goSanctum() {
    clear();
    printLocation('Temple (Sanctum)');

    if (hasCurseOfTheOrb) {
        // CURSED
        print(color('THE CURSE OF THE ORB', 'magenta') + " is upon you!\nWhichever hostile being you just summoned is in hot pursuit. In order to survive, you must " + color('flee all the way back to your campsite', darkGreen) + " in "  + color(maxTurnsToEscape + " turns","lime") + " or less.");
        print('What are you still standing around for?? Get moving!!');

        askToMoveWithOptions(
            locationOption(1, 'Escape to Great Hall')
        );
        
        function processInput(input){
            if (input == 1) { goGreatHall(); } 
            else { printComplaint(input); }
        }
        waitForInput(processInput);


    } else {
        // Normal

        print("You enter " + color('The Sanctum','cyan') + ", a large, skylit room in the temple's heart. Ahead, in the center of this grand chamber, perched upon its altar, is none other than... " + color('THE ORB', 'lime') + " itself!! You can't help but tear up a little.");
        print("This majestic sphere has been the subject of your focus for so long, and to finally see it in person feels nothing short of surreal. " + color('THE ORB', 'lime') + " is beautifully, perfectly round, possessing an impeccable symmetry. It has a dazzle to it you've never quite seen anywhere before. It's mesmerizing. It's entrancing. It's calling to you. It's calling to you.");
        print("It's calling to you.")

        askToMoveWithOptions(
            locationOption(1, 'Ponder THE ORB') + 
            locationOption(2, 'Approach THE ORB')
        );
        
        function processInput(input){
            if (input == 1) { goPonderTheOrb(); } 
            else if (input == 2) { goOrb(); } 
            else { printComplaint(input); }
        }
        waitForInput(processInput);
    }
}

function goSanctumFail() {
    clear();
    printLocation('Temple (Sanctum)');

    print("You fool! You foolish fool! Why would you turn back into the " + color('plume','magenta') + "!? RUN AWAY!!");

    printEnterToContinue();
    function processInput(input){ goGreatHall(); }
    waitForInput(processInput);
}

// --------------------- Ponder THE ORB ---------------------

function goPonderTheOrb() {
    clear();
    printLocation('Temple (Sanctum)');

    print("You take a moment to ponder " + color('THE ORB', 'lime') + "... You're briefly lost in its swirling teal luster...");

    printEnterToContinue();
    function processInput(input){ goSanctum(); }
    waitForInput(processInput);
}

// --------------------- Approach THE ORB ---------------------

function goOrb() {
    clear();
    printLocation('Temple (THE ORB)');

    printAsciiColor(`                 
            |    
           .|o8""""8oq.
        -—=< >=—-    \`YM. 
         d' Y         :MM 
         M. |       ..dMM 
         M:.      ...MNMP 
   .—————\`Mb._...;gjjNjP'—————. 
  /        \`"MN#$%#MP"'        \\
 |.____________________________.|
  ;____________________________;
   |                          |      
   |                          |      
    `, 'cyan')
    // Orb based off of "Georgia11" font's letter O

    print("You approach the altar.\n" + color('THE ORB', 'lime') + "'s great power is but an arm's length away!"); // todo

    askToMoveWithOptions(
        locationOption(1, 'STEAL THE ORB!') + 
        locationOption(2, 'Abstain')
    );
    
    function processInput(input){
        if (input == 1) { goStealOrb(); } 
        else if (input == 2) { goSanctum(); } 
        else { printComplaint(input); }
    }
    waitForInput(processInput);
}

// --------------------- Steal THE ORB ---------------------

function goStealOrb() {
    clear();
    printLocation('Temple (THE ORB)');

    print("You've made your choice. In a feverish haze, " + color("you swipe " + color('THE ORB', 'lime') + " right off its pedestal.", darkGreen)); 
    print(color('THE CURSE OF THE ORB', 'magenta') + " flashes through your mind once again.\nWhat will happen to you, now that you've preformed so terrible a deed? " + color("Well, you won't have to wait long to find out...", 'magenta'));

    printEnterToContinue();
    function processInput(input){ goStealOrb2(); }
    waitForInput(processInput);
}

function goStealOrb2() {
    clear();
    printLocation('Temple (THE ORB)');

    print("A loud CRACK rings out, and mere inches from your face a " + color('dark blue plume','magenta') + " of smoke forcefully errupts from " + color('THE ORB', 'lime') + "'s altar. You jump back, startled, with " + color('THE ORB', 'lime') + " still clutched tightly in hand.");
    print("As the " + color('plume','magenta') + " continues its expansion, two small lights appear within it. Not only do these lights have an eerie semblence to eyes... they also appear to be staring at YOU. Suddenly, the " + color('plume','magenta') + " starts moving in towards you, and <em>fast</em>. Without a moment of hesitation, you spin around and start sprinting away.")

    print(
        color('\n\nNEW OBJECTIVE: ', 'orange') +
        color('ESCAPE the temple.', 'yellow')
        );
        
    hasCurseOfTheOrb = true;
    remainingTurnsToEscape = maxTurnsToEscape + 1;

    printEnterToContinue();
    function processInput(input){ goSanctum(); }
    waitForInput(processInput);
}

// --------------------- Start Screens ---------------------
function start() {
    printAsciiColor(`\
                       ~~~   The Hunt For   ~~~

 @@@@@@@@. @@.    @@. @@@@@@@@.        @@@@@@@.  @@@@@@@@.  @@@@@@@@.
    @@.    @@.    @@. @@.             @@.    @@. @@.    @@. @@.    @@.
    @@.    @@.    @@. @@.             @@.    @@. @@.    @@. @@.    @@.
    @@.    @@@@@@@@@. @@@@@@.         @@.    @@. @@@@@@@@.  @@@@@@@@.
    @@.    @@.    @@. @@.             @@.    @@. @@.  @@.   @@.    @@.
    @@.    @@.    @@. @@.             @@.    @@. @@.   @@.  @@.    @@.
    @@.    @@.    @@. @@@@@@@@.        @@@@@@@.  @@.    @@. @@@@@@@@.
    `, 'white');
    // "banner3" font by Merlin Greywolf merlin@brahms.udel.edu August 9, 1994

    print('\n\n\n')
    printEnterToContinue();

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

// --------------------- WIN Screen ---------------------
function goWinScreen() {
    clear();

    printAsciiColor(`\
                                                          .
__      __                                                |    
\\ \\    / /  _____                                       -< >- 
 \\ \\  / /  |_   _|   _____                                |    
  \\ \\/ /     | |    / ____|  _______                      .
   \\  /      | |   | |      |__   __|   ____              
    \\/      _| |_  | |         | |     / __ \\   _____           
           |_____| | |____     | |    | |  | | |  __ \\  __     __  
                    \\_____|    | |    | |  | | | |__) | \\ \\   / /
      .                        |_|    | |__| | |  _  /   \\ \\_/ /
      |                                \\____/  | | \\ \\    \\   /
    -< >-                                      |_|  \\_\\    | |
      |                                                    |_|   
      .
    `, 'yellow');
    // "Big" font, unknown creator

    print('After years of your hard work and dedication, the quest for ' + color('THE ORB','lime') + " has come to a satisfying close.");
    print('THE END :))')

    gameActive = false;
}

// --------------------- FAIL Screen ---------------------
function goFailScreenInitial() {
    clear();
    printLocation('???');
    print('fail'); // todo

    printEnterToContinue();
    function processInput(input){ goFailScreen(); }
    waitForInput(processInput);
}

function goFailScreen() {
    clear();

    printAsciiColor(`\
 ______  _______ _______ _______ _______ _______  
|      \\|    ___|    ___|    ___|   _   |_     _| 
|   --  |    ___|    ___|    ___|       | |   |__ 
|______/|_______|___|   |_______|___|___| |___|__|
                                      ^|   ^^|V^
                                       ^     ^|
                                              .      `,'red')
    // "Chunky" font, unknown creator

    print(color('<em>"Perhaps the real orb was the\nfriends we made along the way...?"</em>', '#F77'));
    print(color("\t— <em>Chorus of Cope</em>", '#F77'))

    gameActive = false;
}
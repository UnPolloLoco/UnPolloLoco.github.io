let gameActive = true; //this variable is required. 
                       //to stop the game, set it to false.

//Declare your other global variables here


//If you need, add any "helper" functions here


//Make one function for each location
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

//finally, make sure you customize this to tell it what should happen at the
//very start. For this simple example, any input will bring you
//to locationA
function start() {
    printAscii(`\
                    ~~~  The Hunt For  ~~~


 ******** **     ** ********        *******  ********  ******** 
    **    **     ** **             **     ** **     ** **     **
    ##    ##     ## ##             ##     ## ##     ## ##     ##
    ##    ######### ######         ##     ## ########  ######## 
    ##    ##     ## ##             ##     ## ##   ##   ##     ##
    @@    @@     @@ @@             @@     @@ @@    @@  @@     @@
    @@    @@     @@ @@@@@@@@        @@@@@@@  @@     @@ @@@@@@@@ 
    `);
    // "banner3" font by Merlin Greywolf merlin@brahms.udel.edu August 9, 1994

    print('\n\n\n')
    print("Click " + color("ENTER", 'lime') + " to start!!");

    function processInput(input){
        locationA();
    }
    waitForInput(processInput);
}
/* wheatonDice is an opensource project to study the legendary dice curse of Wil Wheaton
 * and get to the bottom of bad juju. At the moment, it's just a dice roller, but later 
 * functions will include a rolls database that can track any sinking feeling that the kind of 
 * cheetos you're eating is influencing your rolls. Also v.1.0 is aiming at 5th edition D&D rules
 * usage. Later versions will be more system agnostic. This is intended for mobile release, but 
 * for now, this is just the engine. Minus the actual engine. Broad strokes to get the system 
 * working. Much to be built! -Ian
 */

//public variables
var displaySides = 0,
    displayNumDc = 0,
    displayRolls = [],
    displayTotal = 0;

/*the physics engine (to be built: a different abstract function than builtin Math.random().
It will access the device's accelerometer and add physics + chaos to generate the roll.
it'll be totally sweet!*/
function physics(diceNumber, diceSides) {

    var rolls = [];

    displaySides = diceSides;
    displayNumDc = diceNumber;

    //warning! no edge case protection! You gotta use it just right! Todo: handle edge cases

    //rolls each die separately then pushes to "rolls" array.
    for (var i = 0; i < diceNumber; i++) {	
	    rolls.push(Math.ceil( Math.random() * diceSides ));     
    }

    displayRolls = rolls;

    //folds the array into a neat total
    var rollTotal = rolls.reduce(function(a ,b) {
	return a + b;
    });

    displayTotal = rollTotal;
    return rollOut(displayNumDc, displaySides, displayRolls, displayTotal);
}

//Separate output function, so that code is easy to delete.
//make it so every lowest possible roll that's rolled displays "Wheaton!" 
    //instead of the number
//comment out any portion if you don't want Wil distracting you so much.
//uncomment Percy if you're an optimist.
function rollOut(diceNumber, diceSides, rolls, rollTotal) {
    if (rollTotal === diceNumber) {
	rollTotal = "Wheaton!";
    } else if (rollTotal < (0.33 * (diceSides * diceNumber))){
	rollTotal += " lesser Wheaton.";
    } /*else if (rollTotal === (diceSides * diceNumber)) {
	rollTotal = "Percy!";
    } else if (rollTotal > (0.66 * (diceSides * diceNumber))) {
	rollTotal += " lesser Percy.";
    }*/
	
    //returns a neat string that shows what you rolled, how each roll went, and the total.
    //This will probably be numberfied and separated out when the actual UI gets built
    if (diceNumber === 1) {
	return ("1 d" + diceSides + ": " + rollTotal);
    } else { 
	return (diceNumber + " d" + diceSides + ": " + rolls.join(", ") + " Total: " + rollTotal);}
}

//input functions.
//uses public variables to access physics() function.
function roll(diceNumber, diceSides) {
    return physics(diceNumber, diceSides);
}

//Special kinds of D&D rolls, Advantage, Disadvantage, Inspiration and mixed rolls
function rollAdvantage () {
    roll(2, 20);
    displayTotal = Math.max(displayRolls[0], displayRolls[1]);
    return (displayRolls.join(" and ") + ". Result: " + displayTotal);
}

function rollDisadvantage () {
    roll(2, 20);
    displayTotal = Math.min(displayRolls[0], displayRolls[1]);
    return (displayRolls.join(" and ") + ". Result: " + displayTotal);
}

//Accesses the last most recent roll, check if it is a d20 roll, then add itself to that roll. 
//Handles Advantage, & Disadvantage rolls as well.
function rollInspiration () {
    var lastRoll = 0;

    if (displaySides === 20) {
	lastRoll = displayTotal;
	roll(1, 10);
	return ("+" + displayTotal + " to " + lastRoll + ": " + (lastRoll + displayTotal));
    } else {
	return ("You can only add an inspiration die to a d20 roll.");
    }
}

//input for manual rolls (like if you're using real dice). changes public variables directly.
function rollManual(diceNumber, diceSides, rolls) {
    displayNumDc = diceNumber;
    displaySides = diceSides;
    //todo: create an if statement that checks that rolls is an Array.
    displayRolls = rolls;

    displayTotal = rolls.reduce(function(a ,b) {
	return a + b;
    });

    return rollOut(displayNumDc, displaySides, displayRolls, displayTotal);
}

//manual testing, no edge cases yet.
console.log(roll(1,20));
console.log(rollInspiration());
console.log(roll(2,12));
console.log(rollInspiration());
console.log(roll(10,6));
console.log(rollAdvantage());
console.log(rollInspiration());
console.log(rollDisadvantage());
console.log(rollInspiration());
console.log(rollManual(10, 6, [4, 4, 4, 2, 5, 2, 3, 2, 1, 6]));
console.log(rollManual(2, 12, [5, 2]));
console.log(rollInspiration());
console.log(rollManual(1, 20, [20]));
console.log(rollInspiration());

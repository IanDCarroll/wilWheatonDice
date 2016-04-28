/* wheatonDice is an opensource project to study the legendary dice curse of Wil Wheaton
 * and get to the bottom of bad juju. At the moment, it's just a dice roller, but later 
 * functions will include a rolls database that can track any sinking feeling that the kind of 
 * cheetos you're eating is influencing your rolls. Also v.1.0 is aiming at 5th edition D&D rules
 * usage. Later versions will be more system agnostic. This is intended for mobile release, but 
 * for now, this is just the engine. Minus the actual engine. Broad strokes to get the system 
 * working. Much to be built! -Ian
 */

//todo: fix "Wheaton!" so that they all do it. 
//(and so inspiratin doesn't concat wheaton to total)
//make rollTime a public variable, or handle it in a better way.
//actually have a saved rollDB.
//allow the user to opt out of DBizing for test rolls.
//add 1-10 importance DB element.
//add standard juju options.
//add home-spun juju options.
//port to Java, Python, Ruby.
//somehow access accelorometer.
//build propper physics engine.
//have something that mines data for analysis.
//somehow build GUI for rolls and DB analysis.
//when all that's done, start building integrated RPG framework for more tools.

//public variables
var displayNumDc = 0,
    displaySides = 0,
    displayRolls = [],
    displayTotal = 0;

//saved rolls go here so they can be accessed and analyzed (unitl a proper DB is made)
//currnet version forgets after the battery of console.log()s are made. Need a proper DB, 
//but this is proof of concept. todo: db that can store previous rolls.
var rollDB = [];

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
}

//passes roll results to rollDB.
function rollDBizer() {
    var rollTime = new Date(),
	rollEntry = [],

    //rollTime set to Now in ms. Date function, roll stats organized to rollEntry
    rollEntry = [rollTime.getTime(), displayNumDc, displaySides, displayRolls, displayTotal];

    rollDB.push(rollEntry);
}

//Separate output function, so that code is easy to delete.
//make it so every lowest possible roll that's rolled displays "Wheaton!" 
    //instead of the number
//comment out any portion if you don't want Wil distracting you so much.
//uncomment Percy if you're an optimist.
function rollOut() {
    if (displayTotal === displayNumDc) {
	displayTotal = "Wheaton!";
    } else if (displayTotal < (0.33 * (displaySides * displayNumDc))){
	displayTotal += " lesser Wheaton.";
    } /*else if (displayTotal === (displaySides * displayNumDc)) {
	displayTotal = "Percy!";
    } else if (displayTotal > (0.66 * (displaySides * displayNumDc))) {
	displayTotal += " lesser Percy.";
    }*/
	
    //returns a neat string that shows what you rolled, how each roll went, and the total.
    //This will probably be numberfied and separated out when the actual UI gets built
    if (displayNumDc === 1) {
	return ("1 d" + displaySides + ": " + displayTotal);
    } else { 
	return (displayNumDc + " d" + displaySides + ": " + displayRolls.join(", ") + " Total: " + displayTotal);}
}

//input functions.
//uses public variables to access physics() function.
function roll(diceNumber, diceSides) {
    physics(diceNumber, diceSides);
    rollDBizer();
    return rollOut();
}

/*Mixed dice rolls. There are 6 Standard dice in D&D.
d4, d6, d8, d10, d12, and d20. It would be quite unusual for all these 
types of dice to be rolled at the same time, but just in case, 
rollMix will be able to handle up to 6 different kinds of dice rolls. */
function rollMix(dNum1, dSid1, dNum2, dSid2, dNum3, dSid3, 
		 dNum4, dSid4, dNum5, dSid5, dNum6, dSid6) {
    var diceMix = [],
	mixTotal = 0;
	diceRold = [];

    physics(dNum1, dSid1);
    rollDBizer();
    diceRold.push(dNum1 + " d" + dSid1);
    for (var i = 0; i < displayRolls.length; i++) {
	diceMix.push(displayRolls[i]);
    }

    if (dNum2) {
	physics(dNum2, dSid2);
	rollDBizer();
	diceRold.push(dNum2 + " d" + dSid2);
	for (var i = 0; i < displayRolls.length; i++) {
		diceMix.push(displayRolls[i]);
	}
    }
    if (dNum3) {
	physics(dNum3, dSid3);
	rollDBizer();
	diceRold.push(dNum3 + " d" + dSid3);
	for (var i = 0; i < displayRolls.length; i++) {
		diceMix.push(displayRolls[i]);
	}
    }
    if (dNum4) {
	physics(dNum4, dSid4);
	rollDBizer();
	diceRold.push(dNum4 + " d" + dSid4);
	for (var i = 0; i < displayRolls.length; i++) {
		diceMix.push(displayRolls[i]);
	}
    }
    if (dNum5) {
	physics(dNum5, dSid5);
	rollDBizer();
	diceRold.push(dNum5 + " d" + dSid5);
	for (var i = 0; i < displayRolls.length; i++) {
		diceMix.push(displayRolls[i]);
	}
    }
    if (dNum6) {
	physics(dNum6, dSid6);
	rollDBizer();
	diceRold.push(dNum6 + " d" + dSid6);
	for (var i = 0; i < displayRolls.length; i++) {
		diceMix.push(displayRolls[i]);
	}
    }

    mixTotal = diceMix.reduce(function(a ,b) {
	return a + b;
    });

    var displayString = (diceRold.join(", ") + ": " 
	+ diceMix.join(", ") + " Total: " + mixTotal);

    return displayString;
}

//Special kinds of D&D rolls, Advantage, Disadvantage, Percent, Inspiration and mixed rolls.
function rollAdvantage() {
    physics(2, 20);
    displayNumDc = "A";
    displayTotal = Math.max(displayRolls[0], displayRolls[1]);
    rollDBizer();
    return (displayRolls.join(" & ") + ". Result: " + displayTotal);
}

function rollDisadvantage() {
    var rollTime = new Date();
    physics(2, 20);
    displayNumDc = "D";
    displayTotal = Math.min(displayRolls[0], displayRolls[1]);
    rollDBizer();
    return (displayRolls.join(" & ") + ". Result: " + displayTotal);
}

//todo : make sure rollDB gets the proper displayTotal
//entry[1] needs to change to "%". entry[4] needs to change to the true in-game result.
function rollPercent() {
    var rollTime = new Date();
    physics(2, 10);
    displayNumDc = "%";
    displayTotal = ((displayRolls[0] % 10) * 10) + (displayRolls[1] % 10);
    if (displayTotal === 0) displayTotal = 100;
    rollDBizer();
    return (displayRolls.join(" & ") + " %Score: " + displayTotal); 
}

//Accesses the last most recent roll, check if it is a d20 roll, 
//then add itself to that roll. 
//Handles Advantage, & Disadvantage rolls as well.
function rollInspiration() {
    var lastRoll = 0;
    if (displaySides === 20) {
	lastRoll = displayTotal;
	physics(1, 10);
	rollDBizer();
	return ("+" + displayTotal + " to " + lastRoll + ": " 
		+ (lastRoll + displayTotal));
    } else {
	return ("You can only add an inspiration die to a d20 roll.");
    }
}

//input for manual rolls (like if you're using real dice). changes public variables directly.
function rollManual(diceNumber, diceSides, rolls) {
    displayNumDc = diceNumber;
    displaySides = diceSides;
    //rolls needs to be an array.
    displayRolls = rolls;
    displayTotal = rolls.reduce(function(a ,b) {
	return a + b;
    });
    rollDBizer();
    return rollOut();
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
console.log(rollMix(2, 12));
console.log(rollMix(2, 12, 3, 10));
console.log(rollPercent());
console.log(rollPercent());
console.log(rollPercent());
console.log(rollPercent());
console.log(rollPercent());
console.log(rollDB);

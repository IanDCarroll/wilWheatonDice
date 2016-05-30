/* di.whtnDice is an opensource project to study the legendary dice curse of Wil Wheaton
 * and get to the bottom of bad juju. At the moment, it's just a dice roller, but later 
 * functions will include a rolls database that can track any sinking feeling that the kind of 
 * cheetos you're eating is influencing your rolls. Also v.1.0 is aiming at 5th edition D&D rules
 * usage. Later versions will be more system agnostic. This is intended for mobile release, but 
 * for now, this is just the engine. Minus the actual engine. Broad strokes to get the system 
 * working. Much to be built! -Ian
 */

//the dice object
var di = {  nmbr:undefined,
    	    sids:undefined,
    	    rols:undefined,
    	    totl:undefined,
    	    whtn:undefined,
    	    insn:'Sanity Error!' };

//saved rolls go here so they can be accessed and analyzed (unitl a proper DB is made)
//currnet version forgets after the battery of console.log()s are made. Need a proper DB, 
//but this is proof of concept. todo: db that can store previous rolls.
var rollDB = [];

//checks to make sure user input values make sense.
//auto corrects in certain cases.
function rollSanity() {
    //isInt borrowed from http://stackoverflow.com/questions/14636536
    function isInt(value) {
	var x;
	return isNaN(value)?!1:(x=parseFloat(value),(0|x)===x);
    }

    if (di.nmbr === undefined) {
	di.insn = 'The outcome of your undefined number of dice\n'+
		'with between zero and infinity number of sides each\n'+
		'rolls unobserved in a mixed state of quantum flux\n'+
		'forever both Percy and Wheaton, like that poor cat.\n'+ 
		'Thus it remains with the Tao that cannot be told.\n\n'+
		'Please define the number of dice and their sides\n'+
		'if you prefer your rolls collapsed, measurable and pure.';
    } else if (di.nmbr === 0) {
	di.insn = '    If zero dice are thrown in simulation,\n'+
		'Even if someone is there to observe the outcome -\n'+
		'    Do they still roll poorly for Wil Wheaton?';
    } else if (di.sids === undefined) {
	di.sids = di.nmbr;
	di.nmbr = 1;
	di.insn = undefined;
    } else if (di.sids === 0) {
	di.insn = 'Zero sides?! Is it even there?!';
    } else if (di.sids === 1) {
	di.insn = 'Ok, Escher-trippiness of a one-sided dice aside,\n'+
		'Exactly how did you not know the outcome of this roll?';
    } else if (!(isInt(di.nmbr)) || !(isInt(di.sids))) {
	di.insn = 'Please make sure you entered integers\n'+
	      'for the number of dice and how many sides they have'
    } else { 
	di.insn = undefined; 
    }
}

/*the physics engine (to be built: a different abstract function than builtin Math.random().
It will access the device's accelerometer and add physics + chaos to generate the roll.
it'll be totally sweet!*/
function physics() {

    var rolls = [];

    //rolls each die separately then pushes to "rolls" array.
    for (var i = 0; i < di.nmbr; i++) {	
	    rolls.push(Math.ceil( Math.random() * di.sids ));     
    }

    di.rols = rolls;

    //folds the array into a neat total
    var totally = rolls.reduce(function(a ,b) {
	return a + b;
    });

    di.totl = totally;
}

//timeStamp() acts as a serial number for the roll in rollDB.
function timeStamp() {
    var rollTime = new Date();
    return rollTime.getTime();
}

//passes roll results to rollDB.
function rollDBizer() {
    var rollEntry = [],

    rollEntry = [timeStamp(), di.nmbr, di.sids, di.rols, di.totl];

    rollDB.push(rollEntry);
}

//Separate di.whtnizer, so that code is easy to delete.
//make it so every lowest possible roll that's rolled displays "Wheaton!" 
    //instead of the number
function wheatonize() {
    if (di.totl === di.nmbr) {
	di.whtn = "Wheaton!";
    } else if (di.totl < (0.33 * (di.nmbr * di.sids))){
	di.whtn = "lesser Wheaton.";
    } else if (di.totl === (di.nmbr * di.sids)) {
	di.whtn = "Percy!";
    } else if (di.totl > (0.66 * (di.nmbr * di.sids))) {
	di.whtn = "lesser Percy.";
    } else {
	di.whtn = "";
    }
}
	
//returns a neat string that shows what you rolled, how each roll went, and the total.
//This will probably be numberfied and separated out when the actual UI gets built
function rollOut() {
    if (di.nmbr === 1) {
	return ("1 d" + di.sids + ": " + di.totl + " " + di.whtn);
    } else { 
	return (di.nmbr + " d" + di.sids + ": " + di.rols.join(", ") + 
		" Total: " + di.totl + " " + di.whtn);}
}

//the main simple dice roll manager
function dice(dNum, dSid) {
    di.nmbr = dNum;
    di.sids = dSid;

    rollSanity();
    if (di.insn) { return di.insn;
    } else {

	physics();
	rollDBizer();
	wheatonize();
	return rollOut();

    }
}

/*Mixed dice rolls. There are 6 Standard dice in D&D.
d4, d6, d8, d10, d12, and d20. It would be quite unusual for all these 
types of dice to be rolled at the same time, but just in case, 
rollMix will be able to handle up to 6 different kinds of dice rolls. */
function rollMix(dNum1, dSid1, dNum2, dSid2, dNum3, dSid3, 
		 dNum4, dSid4, dNum5, dSid5, dNum6, dSid6) {
    var allRolls = [],
	allDice = [],
	allTotal = 0,
	allWhton = "",
	displayString;

    function countWils() {
	var lowest = dNum1 + dNum2 + dNum3 + dNum4 + dNum5 + dNum6,
	    highest = dNum1 * dSid1;

	if (dNum2 && dSid2) { highest += dNum2 * dSid2 }
	if (dNum3 && dSid3) { highest += dNum3 * dSid3 }
	if (dNum4 && dSid4) { highest += dNum4 * dSid4 }
	if (dNum5 && dSid5) { highest += dNum5 * dSid5 }
	if (dNum6 && dSid6) { highest += dNum6 * dSid6 }

	if (allTotal === lowest) {
	    allWhton = "Wheaton!";
	}
	else if (allTotal < 0.33 * highest) {
	    allWhton = "Lesser Wheaton.";
	}
	else if (allTotal === highest) {
	    allWhton = "Percy!"; 
	}
	else if (allTotal > 0.66 * highest) {
	    allWhton = "Lesser Percy."; 
	}
    }

    function theRoll(dNum, dSid) {
	di.nmbr = dNum;
	di.sids = dSid;
	rollSanity()
	if (di.insn) { 
	    return di.insn;
	} else {
	    physics();
	    rollDBizer();
   	    allDice.push(dNum + " d" + dSid);
	    for (var i = 0; i < di.rols.length; i++) {
		allRolls.push(di.rols[i]);
	    }
	}
    }

    theRoll(dNum1, dSid1);

    if (dNum2) { theRoll(dNum2, dSid2); }
    if (dNum3) { theRoll(dNum3, dSid3); }
    if (dNum4) { theRoll(dNum4, dSid4); }
    if (dNum5) { theRoll(dNum5, dSid5); }
    if (dNum6) { theRoll(dNum6, dSid6); }

    allTotal = allRolls.reduce(function(a ,b) {
	return a + b;
    });

    countWils();

    displayString = (allDice.join(", ") + ": " + allRolls.join(", ") + 
		     " Total: " + allTotal + " " + allWhton);


    return displayString;
}

//Special kinds of D&D rolls, Advantage, Disadvantage, Percent, Inspiration and mixed rolls.
function rollAdvantage() {
    di.nmbr = 2;
    di.sids = 20;
    physics();
    di.nmbr = 1;
    di.totl = Math.max(di.rols[0], di.rols[1]);
    wheatonize();
    di.nmbr = "A";
    rollDBizer();
    return (di.rols.join(" & ") + ". Result: " + di.totl + " " + di.whtn);
}

function rollDisadvantage() {
    di.nmbr = 2;
    disides = 20;
    physics();
    di.nmbr = 1;
    di.totl = Math.min(di.rols[0], di.rols[1]);
    wheatonize();
    di.nmbr = "D";
    rollDBizer();
    return (di.rols.join(" & ") + ". Result: " + di.totl + " " + di.whtn);
}

function rollPercent() {
    var rollTime = new Date();
    di.nmbr = 2;
    di.sids = 10;
    physics();
    di.nmbr = 1;
    di.sids = 100;
    di.totl = ((di.rols[0] % 10) * 10) + (di.rols[1] % 10);
    if (di.totl === 0) di.totl = 100;
    wheatonize();
    di.nmbr = "%";
    rollDBizer();
    return (di.rols.join(" & ") + " %Score: " + di.totl + " " + di.whtn); 
}

//Accesses the last most recent roll, check if it is a d20 roll,
    //May need to access rollDB instead of di.totl when DB goes up. 
//then add itself to that roll. 
//Handles Advantage, & Disadvantage rolls as well.
function rollInspiration() {
    var lastRoll = 0;
    if (di.sids === 20) {
	lastRoll = di.totl;
	di.nmbr = 1;
	di.sids = 10;
	physics();
	rollDBizer();
	return ("+" + di.totl + " to " + lastRoll + ": " + (lastRoll + di.totl));
    } else {
	return ("You can only add an inspiration die to a d20 roll.");
    }
}

//input for manual rolls (like if you're using real dice). changes public variables directly.
function rollManual(dNum, dSid, rolls) {
    di.nmbr = dNum;
    di.sids = dSid;
    //rolls needs to be an array.
    di.rols = rolls;
    di.totl = rolls.reduce(function(a ,b) { return a + b; });
    rollDBizer();
    wheatonize();
    return rollOut();
}

function roll(rollType, dNum, dSid, arg3, arg4, arg5, arg6, 
			arg7, arg8, arg9, argA, argB, argC) {
    if (rollType === 'dice') {
	return dice(dNum, dSid);	
    } else if (rollType === 'mix') {
	return rollMix(dNum, dSid, arg3, arg4, arg5, arg6, 
		       arg7, arg8, arg9, argA, argB, argC);
    } else if (rollType === 'advantage') {
	return rollAdvantage();
    } else if (rollType === 'disadvantage') {
	return rollDisadvantage();
    } else if (rollType === 'percent') {
	return rollPercent();
    } else if (rollType === 'inspiration') {
	return rollInspiration();
    } else if (rollType === 'maunual') {
	return rollManual(dNum, dSid, arg3);
    }
}
//manual testing.
console.log(dice(20));
console.log(dice(1,20));
console.log(rollInspiration());
console.log(dice(2,12));
console.log(rollInspiration());
console.log(dice(10,6));
console.log(rollAdvantage());
console.log(rollInspiration());
console.log(rollDisadvantage());
console.log(rollInspiration());
console.log(rollManual(10, 6, [4, 4, 4, 2, 5, 2, 3, 2, 1, 6]));
console.log(rollManual(2, 12, [5, 2]));
console.log(rollInspiration());
console.log(rollManual(1, 20, [20]));
console.log(rollInspiration());
console.log(rollMix(2, 12, 3, 10));
console.log(rollPercent());
console.log(rollDB);

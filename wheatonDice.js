/* wheatonDice is an opensource project to study the legendary dice curse of Wil Wheaton
and get to the bottom of bad juju. At the moment, it's just a dice roller, but later functions 
will include a rolls database that can track any sinking feeling that the kind of cheetos 
you're eating is influencing your rolls. Also v.1.0 is aiming at 5th edition D&D rules usage. 
Later versions will be more system agnostic. This is intended for mobile release, but for now, 
this is just the engine. Minus the actual engine. Much to be built! -Ian*/

/*the roller (to be built: a different abstract function than builtin Math.random().
It will access the device's accelerometer and add physics + chaos to generate the roll.
it'll be totally sweet!*/
function roll(diceNumber, diceSides) {
    //maintained for number crunchy DB usage
    var rolls = []
    //for the Wheatons.
    var rollsWil = []

    //warning! no edge case protection! You gotta use it just right! Todo: handle edge cases

    //rolls each die separately then pushes to "rolls" array.
    for (var i = 0; i < diceNumber; i++) {	
	    rolls.push(Math.ceil( Math.random() * diceSides ));     
    }

    //folds the array into a neat total
    var rollTotal = rolls.reduce(function(a ,b) {
	return a + b;
    });

    //make it so every lowest possible roll that's rolled displays "Wheaton!" 
	//instead of the number
    //comment out any portion if you don't want Wil distracting you so much.
    //uncomment Percy if you're an optimist.
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
    return (diceNumber + " d" + diceSides + ": " + rolls.join(", ") + " Total: " + rollTotal);
}

//manual testing, no edge cases yet.
console.log(roll(1,20));
console.log(roll(2,12));
console.log(roll(10,6));

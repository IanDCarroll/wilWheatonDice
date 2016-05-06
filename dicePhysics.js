/* Dice Physics
 * this is open source, please refer to the licences for details.
 * 
 * Dice Physics is designed to replace Math.random() with the physics 
 * of actual dicerolls.
 * Dice rolls are not purely random, they are complex Neutonian 
 * near-chaotic systems.
 *
 * The calculations here should emulate real physics in three instances:
 * 1. The shaking of the die in the hand.
 * 2. The trajectory and spin of the die as it leaves the hand.
 * 3. The bounce as it hits the table and comes to a rest.
 *
 * It will need to accept as input:
 * 1. The initial facing of the die before it is thrown.
 * 2. The shake data from the accelorameter to determine the spin.
 * 3. The release data from the accelorameter to determine trajectory
 *    and more importantly, The vector of contact with the virtual table.
 *
 * It will return the die's upward face as the result of the roll.
 * 
 * Settable constants such as height from, 
 * and friction coeficient of the virtual table will also play roles.
 * 
 * If done right, this may have aplications beyond playing games.
 */

//todo: research physics formulae, 
//and how other games derrive their realistic-looking physics

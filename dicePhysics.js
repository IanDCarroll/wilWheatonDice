/* Dice Physics
 * this is open source, please refer to the licence for details.
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
 * additional variables:
 * 1. A simple 1D Inertial Navigation System to get the vertical distance 
 *    of the throw from the table.
 * 2. The weight of the die.
 * 3. The friction coeficient based on material of the die and table.
 *    (This may lend itself to table tops and dice modules simulating 
 *     varrying materials, like wood, or marble, or velvet)
 *
 * It will return the die's upward face as the result of the roll.
 * 
 * This may have aplications beyond playing games.
 */

// Accelerometers ouput a values array with 3 elements.
// each element is a floating value representing m/s squared.
// when lying on its back: values[0] == 0, values[1] == 0, values[2] == 9.8 
// one chalenge will be to make the program be able to distinguish 
// the signal from the noise.
// assume all other values == 0
// if values[0] == 9.8, the device is resting on its left side.
// if values[0] == -9.8, the device is resting on its right side. and so on.
// if values[1] == 9.8, the device is standing upright.
// if values[1] == -9.8 the device is upside down.
// if values[2] == 9.8 the device's display is facing up.
// if values[2] == -9.8 the device's display is facing down.

//todo: find some approriate algorythms to do two things:
// 1. Translate values[0,1,2] into vectors.
// 2. Translate values[0,1,2] into a 1D inertial navigation system 
//    to get the height the die is from the table when it is released.

//todo: research how other games build their physics

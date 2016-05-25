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
 * 2. The shake data from the accelerometer and gyro to determine the spin.
 * 3. The release data from the accelerometer/gyro to determine trajectory
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






// Android Accelerometers ouput a values array with 3 elements.
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

// Apple accelerometers ouput in G's. 1G == 9.8 m/s squared.
// Microsoft's output in feet per second squared. I know.
// todo: research more into apple and MS accelerometers. 
// Do they output an array too?
// Make sure the final app is omnivorous of all data in G's 
// and m/s squared
// though it may be prudent to have 3 versions for speed considerations.

// todo: research gyroscopes. That's what gather's data on device rotation, 
// which will be necessary to return the angle of the rollbox to the table.

// todo: find some approriate algorythms to do two things:
// 1. Translate values[0,1,2] into vectors.
// 2. Translate values[0,1,2] into a 1D inertial navigation system 
//    to get the height the die is from the table when it is released.

// todo: research how other games build their physics






/* Architecture (working draft):
 * The engine will need different objects to represent the various forces 
 * acting on the die.
 * Objects:
 * 	Physical Objects:
 * 1.) Die:
 *	Properties:
 *		imutable
 *		a. Shape - How the faces are arranged as a polyhedron.
 *		b. Side1 - The polygon that represents 1 on the shape.
 *		c. Edge1 - The edge of the polygon beneath "1".
 *		d. Map - The coordinates of the other face numbers 
 *			 with regard to Side1 Edge1
 *
 * 		c. Mass - Will be used for calc force and vector
 *		d. Material - Will be used for calc friction coeficient.
 *		e. Elasticity - Will be used to calculate bounce.
 *
 *		mutable
 *		f. Position - Where side1, edge1 is with respect to shape.
 *		g. Facing - Calls position. Queries Map.
 *			    Returns the number of the face that is up.
 * 2.) Surface:
 *	properties:
 *		a. Shape - the constraints the die has.
 *		b. Material - will be used to calc friction coeficient.
 *		c. Elasticity - calc bounce.
 * 2a.) RollBox:
 *	properties:
 *		a. Inherits Surface +
 *		b. Tilt - Accesses Gyroscope for tilt data.
 *		c. Shake - Accesses Accelorometer for force data.
 * 2b.) TableTop:
 *	properties:
 *		a. Inherits Surface +
 *		b. Distance - Uses Inertial Navigation to determine 
 *		   distance of device from the closest point of the surface.
 *		c. SetDistance0 - Calibrates sensors for Inertial Nav.
 * 3.) Medium:
 *	properties:
 *		a. Resistance - most likely air resistance. 
 *		   Should be negligible in most cases.
 * As a note, all of these can be swapped out with different shapes, 
 * materials, etc. for interesting/weird variations.
 *	Force Objects:
 * 4.) Gravity:
 *	properties:
 *		a. Constant - Most likely just uses Earth gravity, 
 *		   but could use others in weird cases.
 * 5.) Vector:
 *	Properties:
 *		a. Compiles Surface, Dice, & MediumDensity data
 *		   and returns the vector the dice travels.
 * 6.) Friction:
 *	Properties:
 *		a. accepts material information 
 *		   and returns friction coeficient.
 * 7.) Spin:
 *	Properties:
 *		a. Compliles vector information with friction coeficients 
 *		   to return the spin of the die 
 *		   *and* real time changing the value of die.position.
 *		   if entropy defeats vector, spin stops.
 *			may need to have two separate functions for this.
 * 8.) Bounce:
 * 	properties:
 *		a. Gathers forces of die and colision object 
 *		   to determine new force acted on die. 
 *		   returns force for recalculating vector and spin.
 * 9.) Entropy:
 * 	properties:
 *		a. gathers Friction and subtracts force from vector.
 * SetGet Objects:
 * 10.) Converter:
 *	properties:
 *		a. converts native device units to app standard.
 * 11.) Setup:
 *	properties:
 *		a. selects specific physical objects
 *		b. sets initial position of Die and TableTop.
 * 13.) Event:
 *	properties:
 *		a. on sensor motion, call force objects.
 * 14.) Result:
 *	properties:
 *		a. takes the position of the die and 
 *		   returns the value of the uptuned face
 *		   when die collides with table && 
 *		   vector and spin return to 0.
 * 15.) Roll:
 *	properties:
 *		a. calls Setup, calls Event, 
 *		   Returns Result.
 */

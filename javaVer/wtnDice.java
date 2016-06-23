public class wtnDice {

    public static void main(String [] args) {
	int sides = 20;
	int roll = (int)Math.ceil(Math.random() * sides);
	System.out.println(roll);
    }
}

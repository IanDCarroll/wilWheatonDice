#The see of a character sheet generator that uses wtnDice

import wtnDice

#Todo: Create a Sheet object that is pushed to and pulled from

def rawStat():
    abilities = []
    for i in range(0,6):
        abilities.append(wtnDice.rollHigh(4,6,3,{},[]))
    return abilities

def main():
    print rawStat()

if __name__ == '__main__':
    main()

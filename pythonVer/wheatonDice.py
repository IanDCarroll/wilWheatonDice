#python port of wheatonDice

#import neccesary libraries
from datetime import datetime
#placeholder for physics module
from random import random

#public variable]

#diInsan = 'Sanity Error!'

#placeholder for Database pusher

#Internal functions
#def rollSanity():

def physics(diStuff):
    rolls = []
    counter = 0
    while counter < diStuff['diNumbr']:
	#placeholder for physics function
	rolls.append((int((random()) * (diStuff['diSides'])))+1)
	counter += 1

    diStuff['diRolls'] = rolls

    #sum the rolls list
    diStuff['diTotal'] = sum(rolls)
    diStuff['diTime'] = datetime.now()

def rollDBizer(diStuff, rollDB):
    rollEntry = [diStuff['diTime'],diStuff['diNumbr'],diStuff['diSides'],
	diStuff['diRolls'],diStuff['diTotal']]
    rollDB.append(rollEntry)

def wheatonize(diStuff):
    if diStuff['diTotal'] == diStuff['diNumbr']:
	diStuff['wheaton'] = ' Wheaton!'
    elif diStuff['diTotal'] == diStuff['diNumbr'] * diStuff['diSides']:
	diStuff['wheaton'] = ' Percy!'
    elif diStuff['diTotal'] < (diStuff['diNumbr'] * diStuff['diSides'])/3:
	diStuff['wheaton'] = ' lesser wheaton.'
    elif diStuff['diTotal'] > ((diStuff['diNumbr'] * diStuff['diSides'])/3)*2:
	diStuff['wheaton'] = ' lesser Percy.'
    else: 
	diStuff['wheaton'] = ''

def rollOut(diStuff):
    return "%s d%s: %s Total: %s%s" % (diStuff['diNumbr'], diStuff['diSides'],
	diStuff['diRolls'], diStuff['diTotal'], diStuff['wheaton'])

#calling functions
#problem: only the return statement is executing.
#All Other outside-the-scope-of-the-function calls are not executing.
#Does it have to do with a lack of closures?
#Or am I missing a syntax subtlety somewhere here?
# ***!!!*** we need to set all variables to global under every function!
def roll(dNum, dSid, diStuff, rollDB): 
    diStuff['diNumbr'] = dNum
    diStuff['diSides'] = dSid

    physics(diStuff)
    rollDBizer(diStuff, rollDB)
    wheatonize(diStuff)
    return rollOut(diStuff)

#def rollMix():

#def rollAdvantage():

#def rollDisadvantage():

#def rollPercent():

#def rollInspiration():

#def rollManual():

def main():
    diStuff = {'diTime':'','diNumbr':0,'diSides':0,
		'diRolls':[],'diTotal':0,'wheaton':''}
    rollDB = []

    print roll(1,20,diStuff,rollDB)


if __name__ == '__main__':
    main()

#python port of wheatonDice

#import neccesary libraries
from datetime import datetime
#placeholder for physics module
from random import random

#public variables
dieTime = ''
diNumbr = 0
diSides = 0
diRolls = []
diTotal = 0
wheaton = ''
#diInsan = 'Sanity Error!'

#placeholder for Database pusher
rollDB = []

#Internal functions
#def rollSanity():

def physics():
    rolls = []
    counter = 0
    while counter < diNumbr:
	#placeholder for physics function
	rolls.append((int((random()) * (diSides)))+1)
	counter += 1

    diRolls = rolls

    #sum the rolls list
    diTotal = sum(rolls)
    dieTime = datetime.now()

def rollDBizer():
    rollEntry = [dieTime,diNumbr,diSides,diRolls,diTotal]
    rollDB.append(rollEntry)

def wheatonize():
    if diTotal == diNumbr:
	wheaton = ' Wheaton!'
    elif diTotal == diNumbr * diSides:
	wheaton = ' Percy!'
    elif diTotal < (diNumbr * diSides)/3:
	wheaton = ' lesser wheaton.'
    elif diTotal > ((diNumbr * diSides)/3)*2:
	wheaton = ' lesser Percy.'
    else: 
	wheaton = ''

def rollOut():
    return "%s d%s: %s Total: %s%s" % (diNumbr, diSides, diRolls, diTotal, wheaton)

#calling functions
#problem: only the return statement is executing.
#All Other outside-the-scope-of-the-function calls are not executing.
#Does it have to do with a lack of closures?
#Or am I missing a syntax subtlety somewhere here?
# ***!!!*** we need to set all variables to global under every function!
def roll(dNum, dSid):
    global diNumbr 
    diNumbr = dNum
    global diSides 
    diSides = dSid

    physics()
    rollDBizer()
    wheatonize()
    return rollOut()

#def rollMix():

#def rollAdvantage():

#def rollDisadvantage():

#def rollPercent():

#def rollInspiration():

#def rollManual():

print roll(1,20)

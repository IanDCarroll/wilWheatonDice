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
#placeholder for Database pusher
rollDB = []

#internal functions
def physics(dNum, dSid)
    rolls = []
    diSides = dSid
    diNumbr = dNum

    for (i = 0; i < dNum; i++)
	#placeholder for physics function
	rolls.append((int((random()) * (dSid)))+1)

    diRolls = rolls

    #sum the rolls list
    diTotal = sum(rolls)
    dieTime = datetime.now()

def rollDBizer()

def wheatonize()

def rollOut()
    print "%s d%s: %s Total: %s %s" % (diNumbr, diSides, diRolls, diTotal, wheaton)

#calling functions
def roll(dNum, dSid)
    physics(dNum, dSid)
    rollDBizer()
    wheatonize()
    print rollOut()

def rollMix

def rollAdvantage()

def rollDisadvantage()

def rollPercent()

def rollInspiration()

def rollManual()

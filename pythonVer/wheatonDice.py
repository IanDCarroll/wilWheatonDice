#python port of whtnDice:

#import neccesary libraries
from datetime import datetime
#placeholder for physics module
from random import random

def physics(di):
    rolls = []
    counter = 0
    while counter < di['nmbr']:
	#random.randint? Same thing.
	#Sam @ https://github.com/swacad really helped on this
	#and on ironing out the code so it actually runs.
	#import numpy as nm
	#import os
	#np.random.seed(int(os.urandom(4).encode('hex'),16))
	rolls.append((int((random()) * (di['sids'])))+1)
	counter += 1

    di['rols'] = rolls
    di['totl'] = sum(rolls)
    di['time'] = datetime.now().isoformat(' ')

def rollDBizer(di, rolDB):
    rolNtry = [di['time'],di['nmbr'],di['sids'],di['rols'],di['totl']]
    rolDB.append(rolNtry)

def whtnize(di):
    if di['totl'] == di['nmbr']:
	di['whtn'] = ' Wheaton!'
    elif di['totl'] == di['nmbr'] * di['sids']:
	di['whtn'] = ' Percy!'
    elif di['totl'] < (di['nmbr'] * di['sids'])/3:
	di['whtn'] = ' lesser wheaton.'
    elif di['totl'] > ((di['nmbr'] * di['sids'])/3)*2:
	di['whtn'] = ' lesser Percy.'
    else: 
	di['whtn'] = ''

def rollOut(di):
    return "%s d%s: %s Total: %s%s" % (di['nmbr'], di['sids'],
	di['rols'], di['totl'], di['whtn'])

#calling functions
def roll(dNum,dSid,di,rolDB): 
    di['nmbr'] = dNum
    di['sids'] = dSid

    physics(di)
    rollDBizer(di, rolDB)
    whtnize(di)
    return rollOut(di)

#def rollMix():

#def rollAdvantage():

#def rollDisadvantage():

#def rollPercent():

#def rollInspiration():

#def rollManual():

def main():
    di = {'time':'','nmbr':0,'sids':0,'rols':[],'totl':0,'whtn':''}
    rolDB = []

    print roll(1,20,di,rolDB)

if __name__ == '__main__':
    main()

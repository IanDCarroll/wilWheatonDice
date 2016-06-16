#python port of wtnDice:

from datetime import datetime
#placeholder for physics module
import numpy as np
import os

def physics(di):
    rolls = []
    counter = 0
    while counter < di['nmbr']:
	#Sam @ https://github.com/swacad really helped on this
	#and on ironing out the code so it actually runs.
	#this is a cryptogrphically secure seed, 
	#so it's not predictible even by a really awesome computer!
	np.random.seed(int(os.urandom(4).encode('hex'),16))
	rolls.append((int((np.random.random()) * (di['sids'])))+1)
	counter += 1

    di['rols'] = rolls
    di['totl'] = sum(rolls)
    di['time'] = datetime.now().isoformat(' ')

def rolDBize(di, rolDB):
    rolNtry = [di['time'],di['nmbr'],di['sids'],di['rols'],di['totl']]
    rolDB.append(rolNtry)

#calling functions
def roll(dNum,dSid,di,rolDB): 
    di['nmbr'] = dNum
    di['sids'] = dSid

    physics(di)
    rolDBize(di, rolDB)
    return di['totl']

#def rollMix():

def rollHigh(dNum,dSid,take,di,rolDB):
    di['nmbr'] = dNum
    di['sids'] = dSid
    physics(di)

    di['nmbr'] = 1
    di['totl'] = 0
    sort = sorted(di['rols'], key=None, reverse=True)
    for i in range(0,take):
	di['totl'] += sort[i]

    di['nmbr'] = 'H'
    rolDBize(di, rolDB)

    return di['totl']

def rollLow(dNum,dSid,take,di,rolDB):
    di['nmbr'] = dNum
    di['sids'] = dSid
    physics(di)

    di['nmbr'] = 1
    di['totl'] = 0
    sort = sorted(di['rols'])
    for i in range(0,take):
	di['totl'] += sort[i]

    di['nmbr'] = 'L'
    rolDBize(di, rolDB)

    return di['totl']

def rollDigit(dNum,dSid,di,rolDB):
    di['nmbr'] = dNum
    di['sids'] = dSid
    physics(di)

    di['rols'].reverse()
    di['totl'] = 0
    count = 0
    for roll in di['rols']:
	if count == 0:
	    di['totl'] += (roll % di['sids'])
	    count += 1 
	else:
	    di['totl'] += (roll % di['sids']) * (di['sids'] ** count)
	    count += 1
    di['sids'] = di['sids'] ** di['nmbr']
    if di['totl'] == 0: di['totl'] = di['sids']

    di['rols'].reverse()
    di['nmbr'] = 'D'

    return di['totl']

def rollExtra(dNum,dSid,di,rolDB):
    lastRoll = di['totl']
    di['nmbr'] = dNum
    di['sids'] = dSid
    physics(di)
    di['totl'] += lastRoll
    di['nmbr'] = 'X'
    rolDBize(di,rolDB)
    return di['totl']    

def rollManual(dSid,rolList,di,rolDB):
    di['nmbr'] = 'M'
    di['sids'] = dSid
    di['rols'] = rolList
    di['totl'] = sum(rolList)
    rolDBize(di,rolDB)
    return di['totl']


def main():
    di = {'time':'','nmbr':0,'sids':0,'rols':[],'totl':0,'whtn':''}
    rolDB = []

    #Is there some way to limit the args to two? 4 is weird.
    print roll(1,20,di,rolDB)
    print rollHigh(2,20,1,di,rolDB)
    #print rollHigh(4,6,3,di,rolDB)
    print rollLow(2,20,1,di,rolDB)
    #print rollLow(4,6,3,di,rolDB)
    print rollExtra(1,10,di,rolDB)
    print rollDigit(2,10,di,rolDB)
    #print rollDigit(4,10,di,rolDB)
    #print rollDigit(5,2,di,rolDB)
    #print rollDigit(2,4,di,rolDB)
    #print rollDigit(2,8,di,rolDB)
    #print rollDigit(2,12,di,rolDB)
    #print rollDigit(2,20,di,rolDB)
    print rollManual(20,[20],di,rolDB)
    #print rollManual(12,[12,12,12],di,rolDB)
    print rolDB

if __name__ == '__main__':
    main()

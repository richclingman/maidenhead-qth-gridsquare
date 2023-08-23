#!/c/Python311/python

# ^^^ You may need to change to your Python interpreter
# From https://www.jidanni.org/geo/maidenhead/programs/rkanters.zip
# Referred by https://www.jidanni.org/geo/maidenhead/
# Rich Clingman 2023-08-23 converted to Python 3
# Using as reference source to get long GS10 for tests
# TO RUN w/ GS10 result:
# ./ll2mh.py 10
# LONGITUDE LATITUDE [ENTER]
# [ENTER]

# ll2mh -- long/lat to Maidenhead grid calculator not limited to 6 characters
# Copyright       : http://www.fsf.org/copyleft/gpl.html
# Author          : Dan Jacobson -- http://jidanni.org/geo/maidenhead/
# Created On      : Sat Mar 15 03:54:08 2003

# rkanters 2004.2.20 version ll2mh

import re,sys,string
if len(sys.argv)==2: # slob city
    stringlength=int(sys.argv[1])
    if stringlength<2 or stringlength%2!=0:
        sys.stderr.write('string length requested must be even integer > 0\n')
        sys.exit(87)
else:
    stringlength=6
maxn=stringlength/2
A=ord('A')
while 1:
    line=sys.stdin.readline()
    if not line: break
    ll=re.findall(r'([-0-9.]+)\s+([-0-9.]+)',line)
    if ll:
        for x,y in ll:
            lon=float(x)
            lat=float(y)
    else:
        sys.stderr.write(sys.argv[0]+': cannot even get the basic items\n')
        sys.exit(44)
    if -180<=lon<180:pass
    else:
        sys.stderr.write('longitude must be -180<=lon<180\n')
        sys.exit(32)
    if -90<=lat<90:pass
    else:
        sys.stderr.write('latitude must be -90<=lat<90\n')
        sys.exit(33) #can't handle north pole, sorry, [A-R]
    lon=(lon+180.0)/20 # scale down and set up for first digit
    lat=(lat+90.0)/10
    astring=""
    i=0
    while i<maxn:
        i+=1
        loni=int(lon)
        lati=int(lat)
        if i%2:
            astring+=chr(A+loni)+chr(A+lati)
            lon=(lon-loni)*10
            lat=(lat-lati)*10
        else:
            astring+=str(loni)+str(lati)
            lon=(lon-loni)*24
            lat=(lat-lati)*24
    print(astring)
#We return the grid square, to the precision given, that contains the given point.


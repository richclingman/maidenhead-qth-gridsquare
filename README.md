# maidenhead-qth-gridsquare

## Arbitrary-Length GridSquare Generator

It's known by several names:

* Maidenhead locator
* QTH locator
* Grid Square or GridSquare

Amateur radio uses it in contests and emergency communications to more easily
transmit a location without using a long sequence of numbers.

My objective (in connection with [Ribbit Radio](https://ribbitradio.org/))
was to generate a GS10 (10-character GridSquare) for use in the app.
I used a lot of resources to understand how GridSquare is generated. **Mind Blown!**
I began writing tests and coding (TDD, of course), building each group sequentially.

Then, I was referred to
[https://www.jidanni.org/geo/maidenhead/](https://www.jidanni.org/geo/maidenhead/)
which has some 2004 Python code for generating any length GridSquare using a simple loop structure.
That site links to Kanter's refined ```ll2mh.py``` script in a zip file
[https://www.jidanni.org/geo/maidenhead/programs/rkanters.zip](https://www.jidanni.org/geo/maidenhead/programs/rkanters.zip)
which I converted to Python 3 to test out and to understand the workings.
I used that script (along with other online resources) to verify
a set of GS2, GS4, GS6, GS8, and GS10 codes for tests in this module.
A Python 3 version of Kanter's ```ll2mh.py``` is included in this repository for reference.

## latLonToQth()

```typescript
// This module is not (yet) TS, so these definitions may not be syntactically accurate

interface GsResponse {
    qth: string; // generated qth GridSquare code
    spread: string; // qth spread in groups of 2 characters for easier reading
    error: string; // empty string is no error
}

// returns a (gsLevel * 2) length string
function latLonToQth(
    latitude: float,
    longitude: float,
    gsLevel: float,
): GsResponse
```

The function can run for any length GridSquare; however, to prevent endless and useless looping,
the max gsLevel is 18.
According to [https://www.jidanni.org/geo/maidenhead/](https://www.jidanni.org/geo/maidenhead/),
the 18-character GS18 provides a ```0.3mm``` accuracy.

## Install

```shell
npm install maidenhead-qth-gridsquare
```

## Usage

```javascript
import {latLonToQth} from 'maidenhead-qth-gridsquare'

// defaults to standard GS6 (6-character GridSquare)
qth = latLonToQth(latitude, longitude)

// 
qth = latLonToQth(latitude, longitude, 2) // GS2 - 2-character GridSquare
qth = latLonToQth(latitude, longitude, 4) // GS4 - 4-character GridSquare
qth = latLonToQth(latitude, longitude, 6) // GS6 - 6-character GridSquare
qth = latLonToQth(latitude, longitude, 8) // GS8 - 8-character GridSquare
qth = latLonToQth(latitude, longitude, 10) // GS10 - 10-character GridSquare

// gsLevel can be any positive even integer up to 18
qth = latLonToQth(latitude, longitude, 18) // GS18 provides 0.3mm accuracy
```

## Resources

* [https://en.wikipedia.org/wiki/Maidenhead_Locator_System](https://en.wikipedia.org/wiki/Maidenhead_Locator_System)
* [https://www.arrl.org/grid-squares](https://www.arrl.org/grid-squares)
* [https://www.dxzone.com/grid-square-locator-system-explained/](https://www.dxzone.com/grid-square-locator-system-explained/)
* [https://www.jidanni.org/geo/maidenhead/](https://www.jidanni.org/geo/maidenhead/)
* [https://www.amsat.org/amsat-new/tools/grids.php](https://www.amsat.org/amsat-new/tools/grids.php) - I found this
  site susceptible to misleading results
* [https://www.giangrandi.org/electronics/radio/qthloccalc.shtml](https://www.giangrandi.org/electronics/radio/qthloccalc.shtml)
* [http://www.vcars.org/tools-calculators/grid-square-calculator/](http://www.vcars.org/tools-calculators/grid-square-calculator/)
* [https://www.jidanni.org/geo/maidenhead/](https://www.jidanni.org/geo/maidenhead/)
* [https://dxcluster.ha8tks.hu/hamgeocoding/](https://dxcluster.ha8tks.hu/hamgeocoding/) - used to find codes for Around
  the World tests

### DMS to Degrees

While writing tests, I often needed to convert between Degrees-Minutes-Seconds and float Degrees.

* [https://www.rapidtables.com/convert/number/degrees-minutes-seconds-to-degrees.html](https://www.rapidtables.com/convert/number/degrees-minutes-seconds-to-degrees.html)

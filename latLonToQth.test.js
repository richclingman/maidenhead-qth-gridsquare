import {expect, it, describe} from '@jest/globals';

import latLonToQth from './latLonToQth.js'

console.log('package:', latLonToQth)

// https://www.amsat.org/amsat-new/tools/grids.php <<< BAD RESULTS!!! (Recommended by ARRL)
// https://www.giangrandi.org/electronics/radio/qthloccalc.shtml

describe('latLonToQth', () => {
    describe('on grid lines', () => {
        it.each([
            [20, 40, 'LL00aa'],
            [-90, -180, 'AA00aa'],
            [0, 0, 'JJ00aa'],
            [90, 180, 'SS00aa'],
            [-90, 180, 'SA00aa'],
            [90, -180, 'AS00aa'],
        ])('should map (%d, %d) to %s', (lat, lon, qth) => {
            const resp = latLonToQth(lat, lon)
            expect(resp).toBe(qth)
        })
    })
})

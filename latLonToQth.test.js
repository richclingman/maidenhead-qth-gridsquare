import {expect, it, describe} from '@jest/globals';

import latLonToQth from './latLonToQth.js'

console.log('package:', latLonToQth)

// https://www.amsat.org/amsat-new/tools/grids.php <<< BAD RESULTS!!! (Recommended by ARRL)
// https://www.giangrandi.org/electronics/radio/qthloccalc.shtml
// http://www.vcars.org/tools-calculators/grid-square-calculator/

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

    describe('on square lines', () => {
        it.each([
            [24, 46, 'LL34aa'],
            [-87, -174, 'AA33aa'],
            [5, 18, 'JJ95aa'],
            [63, 174, 'RP73aa'],
            [-45, 28, 'KE45aa'],
            [71, -46, 'GQ71aa'],
        ])('should map (%d, %d) to %s', (lat, lon, qth) => {
            const resp = latLonToQth(lat, lon)
            expect(resp).toBe(qth)
        })
    })
})

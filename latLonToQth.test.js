import {expect, it, describe} from '@jest/globals';

import latLonToQth from './latLonToQth.js'

// console.log('package:', latLonToQth)

// https://www.amsat.org/amsat-new/tools/grids.php <<< BAD RESULTS!!! (Recommended by ARRL)
// https://www.giangrandi.org/electronics/radio/qthloccalc.shtml
// http://www.vcars.org/tools-calculators/grid-square-calculator/

// https://www.jidanni.org/geo/maidenhead/ - beyond GS6
// https://dxcluster.ha8tks.hu/hamgeocoding/ - map with GS10

describe('latLonToQth', () => {
    function getSpread(qth) {
        let spread = ''
        let len = qth.length
        for (let i = 0; i < len; i += 2) {
            spread += `${qth[i]}${qth[i + 1]} `
        }
        return spread.trim()
    }

    describe('error checking', () => {
        it.each([
            ['bad gsLevel', 0, 0, 1],
            ['bad gsLevel', 0, 0, -3],
            ['bad lat', -90.7, 0, 2],
            ['bad lat', 90.3, 0, 8],
            ['bad lon', 0, -180.1, 28],
            ['bad lon', 0, 180.1, 2],
        ])('should error for %s (%d, %d, %d)',
            (name, lat, lon, gsLevel) => {
                const resp = latLonToQth(lat, lon, gsLevel)
                expect(resp.error).toBeTruthy()
            })
    })

    describe('on grid lines', () => {
        it.each([
            [20, 40, 'LL00AA'],
            [-90.0, -180.0, 'AA00AA'],
            [0, 0, 'JJ00AA'],
            [90, 180, 'SS00AA'],
            [-90, 180, 'SA00AA'],
            [90, -180, 'AS00AA'],
        ])('should encode (%d, %d) to %s', (lat, lon, qth) => {
            const resp = latLonToQth(lat, lon)
            expect(resp.error).toBeFalsy()
            expect(resp.qth).toBe(qth)
            expect(resp.spread).toBe(getSpread(qth))
        })

        it.each([
            [20, 40, 2, 'LL'],
            [20, 40, 4, 'LL00'],
            [20, 40, 6, 'LL00AA'],
            [20, 40, 8, 'LL00AA00'],
            [20, 40, 10, 'LL00AA00AA'],
            [20, 40, 12, 'LL00AA00AA00'],
        ])('should encode (%d, %d, %d) to %s',
            (lat, lon, gsLevel, qth) => {
            const resp = latLonToQth(lat, lon, gsLevel)
            expect(resp.error).toBeFalsy()
            expect(resp.qth).toBe(qth)
            expect(resp.spread).toBe(getSpread(qth))
        })
    })

    describe('on square lines', () => {
        it.each([
            [24, 46, 'LL34AA'],
            [-87, -174, 'AA33AA'],
            [5, 18, 'JJ95AA'],
            [63, 174, 'RP73AA'], // this required adding .toFixed(6) due to float math
            [-45, 28, 'KE45AA'],
            [71, -46, 'GQ71AA'],
        ])('should map (%d, %d) to %s', (lat, lon, qth) => {
            const resp = latLonToQth(lat, lon)
            expect(resp.error).toBeFalsy()
            expect(resp.qth).toBe(qth)
            expect(resp.spread).toBe(getSpread(qth))
        })
    })

    // using rkanters' ll2mh to get long codes

    describe('at GS10', () => {
        it.each([
            ['Disk Golf', 37.028397, -93.197867, 'EM37JA66GT'],
            ['Church', 37.074914, -93.227606, 'EM37JB27QX'],
            ['Tennis', 51.434344, -0.209208, 'IO91VK44VF'],
        ])('should map "%s" (%d, %d) to %s',
            (hame, lat, lon, qth) => {
            const resp = latLonToQth(lat, lon, 10)
            expect(resp.qth).toBe(qth)
            expect(resp.spread).toBe(getSpread(qth))
        })
    })
})

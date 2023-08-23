import latLonToQth from './latLonToQth.js'

console.log('package:', latLonToQth)

// https://www.amsat.org/amsat-new/tools/grids.php <<< BAD RESULTS!!! (Recommended by ARRL)
// https://www.giangrandi.org/electronics/radio/qthloccalc.shtml

describe('latLonToQth', () => {
    describe('on the grid lines', () => {
        it('should work for positive, positive', function () {
            const resp = latLonToQth(20, 40)
            console.log('resp', resp)
            expect(resp).toBe('LL00aa')
        })

    })

    // describe('whole degrees', () => {
    //     it('should work for positive, positive', function () {
    //         const resp = latLonToQth(14, 47)
    //         console.log('resp', resp)
    //         expect(resp).toBe('GK64ma')
    //     })
    // })
})

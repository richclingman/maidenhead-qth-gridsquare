import latLonToQth from './latLonToQth.js'

console.log('package:', latLonToQth)

describe('latLonToQth', () => {
    it('should work', function () {
        const resp = latLonToQth(1, 2)
        console.log('resp', resp)
        expect(resp).toBe('aa')
    });
})

import qthToLatLon from './qthToLatLon.js'

console.log('package:', qthToLatLon)

describe('qthToLatLon', () => {
    it('should work', function () {
        const {latitude, longitude} = qthToLatLon('abcde')
        console.log('latitude', latitude, 'longitude', longitude)
        expect(latitude).toBe(3)
        expect(longitude).toBe(4)
    });
})

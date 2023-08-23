import latLonToQth from './latLonToQth.js'
import qthToLatLon from './qthToLatLon.js'

console.log('package:', latLonToQth)
console.log('package:', qthToLatLon)


// NOTE: nuxt/vite import failed when using export.latLonToQth = ... export.qthToLatLon = ...
export {
    latLonToQth,
    qthToLatLon,
}

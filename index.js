exports.latLonToQth = function(lat, lon) {
    const qth = "AB12"
    console.log("LAT:", lat, "LON:", lon, "QTH:", qth);
}

exports.qthToLatLon = function(qth) {
    const lat = 1.1
    const lon = 3.3
    console.log("QTH:", qth, "LAT:", lat, "LON:", lon);
    return {latitude: lat, longitude: lon}
}

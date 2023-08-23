function latLonToQth(lat, lon) {
    // latitude from south pole / 10
    const fullLat = lat + 90
    const lat1 = Math.floor(fullLat / 10)
    const latField = String.fromCharCode(65 + lat1)


    // longitude from anti-meridian / 20
    const fullLon = lon + 180
    const lon1 = Math.floor(fullLon / 20)
    const lonField = String.fromCharCode(65 + lon1)

    const qth = `${lonField}${latField}00aa`
    console.log("lltq LAT:", lat, "LON:", lon, "QTH:", qth);
    return qth
}


export default latLonToQth

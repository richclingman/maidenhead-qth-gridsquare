function latLonToQth(lat, lon) {

    // TODO: Test for limits

    // LATITUDE from south pole / 10
    const fullLat = lat + 90
    const lat1 = Math.floor(fullLat / 10)
    const latChar1 = String.fromCharCode(65 + lat1)

    // remainder / 1 degrees
    const latRem1 = fullLat - lat1 * 10
    const lat2 = Math.floor(latRem1)

    // ******************
    // LONGITUDE from anti-meridian / 20
    const fullLon = lon + 180
    const lon1 = Math.floor(fullLon / 20)
    const lonChar1 = String.fromCharCode(65 + lon1)

    // remainder / 2 degrees
    const lonrem1 = fullLon - lon1 * 20
    const lon2 = Math.floor(lonrem1 / 2)

    const qth = `${lonChar1}${latChar1}${lon2}${lat2}aa`
    console.log("lltq LAT:", lat, "LON:", lon, "QTH:", qth);
    return qth
}


export default latLonToQth

function latLonToQth(lat, lon) {

    // TODO: Test for limits

    // LATITUDE from south pole / 10
    const fullLat = lat + 90
    const lat1 = Math.floor(fullLat / 10)
    const latChar1 = String.fromCharCode(65 + lat1)

    // remainder / 1 degrees
    const latRem1 = fullLat - lat1 * 10
    const lat2 = Math.floor(latRem1)

    // remainder / 2.5' (0.04167°)
    const latRemMinutes = (latRem1 - lat2) * 60
    const lat3 = Math.floor(latRemMinutes / 2.5)
    const latChar3 = String.fromCharCode(97 + lat3)

    // ******************
    // LONGITUDE from anti-meridian / 20
    const fullLon = lon + 180
    const lon1 = Math.floor(fullLon / 20)
    const lonChar1 = String.fromCharCode(65 + lon1)

    // remainder / 2 degrees
    const lonRem1 = fullLon - lon1 * 20
    const lon2 = Math.floor(lonRem1 / 2)

    // remainder / 5' (0.08333°)
    const lonRemMinutes = (lonRem1 - lon2 * 2) * 60
    const lon3 = Math.floor(lonRemMinutes / 5)
    const lonChar3 = String.fromCharCode(97 + lon3)


    const qth = `${lonChar1}${latChar1}${lon2}${lat2}${lonChar3}${latChar3}`
    console.log("lltq LAT:", lat, "LON:", lon, "QTH:", qth);
    return qth
}


export default latLonToQth

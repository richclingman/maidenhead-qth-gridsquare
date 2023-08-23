function latLonToQth(latitude, longitude, gsLevel = 6) {
    let qth = ''
    let spread = ''
    let error = ''

    if (gsLevel < 2 || gsLevel > 18 || gsLevel % 2 !== 0) {
        error += 'gsLevel must be a positive even integer between 2 and 18. '
    }

    if (latitude < -90.0 || latitude > 90.0) {
        error += 'latitude must be a float between -90.0 and +90.0. '
    }

    if (longitude < -180.0 || longitude > 180.0) {
        error += 'longitude must be a float between -180.0 and +180.0. '
    }

    if (error !== '') {
        return {qth, spread, error}
    }

    // scale for gridding
    latitude = (latitude + 90) / 10
    longitude = (longitude + 180) / 20

    const charA = 65

    let loops = gsLevel / 2 + 1
    for (let i = 1; i < loops; ++i) {
        let latInt = Math.floor(latitude)
        let lonInt = Math.floor(longitude)

        if (i % 2) {
            const latChar = String.fromCharCode(charA + latInt)
            const lonChar = String.fromCharCode(charA + lonInt)
            qth += `${lonChar}${latChar}`
            spread += `${lonChar}${latChar} `

            // set up for the next level 10x10 grid
            latitude = ((latitude - latInt) * 10).toFixed(6)
            longitude = ((longitude - lonInt) * 10).toFixed(6)
        } else {
            qth += `${lonInt}${latInt}`
            spread += `${lonInt}${latInt} `

            // set up for the next level 24x24 grid
            latitude = ((latitude - latInt) * 24).toFixed(6)
            longitude = ((longitude - lonInt) * 24).toFixed(6)
        }


    }

    spread = spread.trim()

    return {qth, spread, error}
}


export default latLonToQth

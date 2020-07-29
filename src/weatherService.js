const API_KEY = "0a1668a3f53c6142da4324a977fd5d6f"

function buildQuery(params) {
    const url = new URL("http://api.openweathermap.org/data/2.5/weather")
    Object.keys(params).forEach(key => {url.searchParams.append(key, params[key])})
    return url
}
async function getWeather(city) {
    let json
    const params = {
        "q": city,
        "units": "imperial",
        "appid": API_KEY,
    };
    const url = buildQuery(params);
    try {
        const response = await fetch(url);
        json = await response.json()
    } catch (err) {
        console.log(err);
    }
    return json
}

// function imperialToMetric(F) {
//     return (F - 32) * (5/9)
// }
export default getWeather
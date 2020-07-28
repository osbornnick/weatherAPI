const API_KEY = "0a1668a3f53c6142da4324a977fd5d6f"

function buildQuery(params) {
    const url = new URL("http://api.openweathermap.org/data/2.5/weather")
    Object.keys(params).forEach(key => {url.searchParams.append(key, params[key])})
    return url
}
function getWeather(city) {
    const params = {
        "q": city,
        "appid": API_KEY,
    };
    const url = buildQuery(params);
    console.log(url)
}

export default getWeather
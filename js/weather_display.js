

// set time frames
const daily = "_daily";
const hourly = "_hourly";


// set cities
const waterford = "waterford";







document.addEventListener("DOMContentLoaded", () => {
    /*
        Set the content for the Index page
        Index page to have constant cities
        Set each city
    */

    // declare fields
    const weatherCode = document.getElementById("weatherCode");
    const dailyHighTemp = document.getElementById("dailyHighTemp");
    const dailyLowTemp = document.getElementById("dailyLowTemp");
    const dailyRainChance = document.getElementById("dailyRainChance");
    const dailyWindSpeedMax = document.getElementById("dailyWindSpeedMax")
    const dailySunrise = document.getElementById("dailySunrise");
    const dailySunset = document.getElementById("dailySunset");


    // look up weather code
    const weatherCodeFromData = weatherData.waterford_daily.daily.weather_code[0];
    const weatherDescription = weatherCodes[weatherCodeFromData];

    weatherCode.innerHTML = weatherDescription;

    // set dailyHighTemp
    dailyHighTemp.innerHTML = Math.round(weatherData.waterford_daily.daily.temperature_2m_max[0]);

    // set dailyLowTemp
    dailyLowTemp.innerHTML = Math.round(weatherData.waterford_daily.daily.temperature_2m_min[0]);

    // set dailyHumidity
    dailyRainChance.innerHTML = weatherData.waterford_daily.daily.precipitation_probability_max[0] + "%";

    // set dailyWindSpeedMax
    dailyWindSpeedMax.innerHTML = weatherData.waterford_daily.daily.wind_speed_10m_max[0] + "km/h";

    // set dailySunrise
    dailySunrise.innerHTML = weatherData.waterford_daily.daily.sunrise[0].slice(6);

    // set dailySunset
    dailySunset.innerHTML = weatherData.waterford_daily.daily.sunset[0].slice(6);

    let test = document.getElementById("waterford").getElementById(weatherCode)
    console.log(test)
});

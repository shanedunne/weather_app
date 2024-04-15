// set time frames
const daily = "_daily";
const hourly = "_hourly";

/*
    An array containing an object for each of the cities the site has access to data including:
    - The city as referenced in the data set
    - A string to be used as a title
    - Index to the cities daily data
    - Index to the cities hourly data
*/
const cities = [
  { city: "amsterdam", title: "Amsterdam", _daily: 0, _hourly: 1 },
  { city: "berlin", title: "Berlin", _daily: 2, _hourly: 3 },
  { city: "copenhagen", title: "Copenhagen", _daily: 4, _hourly: 5 },
  { city: "cork", title: "Cork", _daily: 6, _hourly: 7 },
  { city: "new_york", title: "New York", _daily: 8, _hourly: 9 },
  { city: "paris", title: "Paris", _daily: 10, _hourly: 11 },
  { city: "san_francisco", title: "San Francisco", _daily: 12, _hourly: 13 },
  { city: "tromso", title: "Tromso", _daily: 14, _hourly: 15 },
  { city: "waterford", title: "Waterford", _daily: 16, _hourly: 17 },
];




document.addEventListener("DOMContentLoaded", () => {

    for(let i = 0; i < cities.length; i++){

    

        // identify the card for the city being populated
        const cityCard = document.getElementById(cities[i].city);
        /*
            Set the content for the Index page
            Index page to have constant cities
            Set each city
        */
    
        // declare fields
        const cityName = cityCard.querySelector(".city-name");
        const weatherCode = cityCard.querySelector(".weather-code");
        const dailyHighTemp = cityCard.querySelector(".daily-high-temp");
        const dailyLowTemp = cityCard.querySelector(".daily-low-temp");
        const dailyRainChance = cityCard.querySelector(".daily-rain-chance");
        const dailyWindSpeedMax = cityCard.querySelector(".daily-wind-speed-max");
        const dailySunrise = cityCard.querySelector(".daily-sunrise");
        const dailySunset = cityCard.querySelector(".daily-sunset");
    
        console.log(cities[i].city)
        // set city name
        cityName.innerHTML = cities[i].title;
    
        // look up weather code
        const weatherCodeFromData = weatherData[`${cities[i].city + daily}`].daily.weather_code[0];
        const weatherDescription = weatherCodes[weatherCodeFromData];
        
    
        weatherCode.innerHTML = weatherDescription;
    
        // set dailyHighTemp
        dailyHighTemp.innerHTML = Math.round(weatherData[`${cities[i].city + daily}`].daily.temperature_2m_max[0]);
    
        // set dailyLowTemp
        dailyLowTemp.innerHTML = Math.round(weatherData[`${cities[i].city + daily}`].daily.temperature_2m_min[0]);
    
        // set dailRainChance
        dailyRainChance.innerHTML = weatherData[`${cities[i].city + daily}`].daily.precipitation_probability_max[0] + "%";
    
        // set dailyWindSpeedMax
        dailyWindSpeedMax.innerHTML = weatherData[`${cities[i].city + daily}`].daily.wind_speed_10m_max[0] + "km/h";
    
        // set dailySunrise
        dailySunrise.innerHTML = weatherData[`${cities[i].city + daily}`].daily.sunrise[0].slice(-5);
    
        // set dailySunset
        dailySunset.innerHTML = weatherData[`${cities[i].city + daily}`].daily.sunset[0].slice(-5);
    
    }
});


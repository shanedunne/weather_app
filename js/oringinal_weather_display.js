function appendCity(cityFromId) {
    // create URL inside the function to ensure it starts at the base url every time
    const myURL = new URL("http://localhost:8080/");
    // add city to param
    myURL.searchParams.append("city", cityFromId);
  
    console.log("click worked");
  
    // navigate to the new URL
    window.location.replace(myURL);
  }
  
  // set time frames
  const daily = "_daily";
  const hourly = "_hourly";
  
  // set days of the week
  // https://www.w3schools.com/jsref/jsref_getday.asp
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date();
  let day = daysOfWeek[d.getDay()];
  
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
    console.log("today is: " + day);
  
    // Populate weather cards
    for (let i = 0; i < cities.length; i++) {
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
  
      console.log(cities[i].city);
      // set city name
      cityName.innerHTML = cities[i].title;
  
      // look up weather code
      const weatherCodeFromData =
        weatherData[`${cities[i].city + daily}`].daily.weather_code[0];
      const weatherDescription = weatherCodes[weatherCodeFromData];
  
      weatherCode.innerHTML = weatherDescription;
  
      // set dailyHighTemp
      dailyHighTemp.innerHTML = Math.round(
        weatherData[`${cities[i].city + daily}`].daily.temperature_2m_max[0]
      );
  
      // set dailyLowTemp
      dailyLowTemp.innerHTML = Math.round(
        weatherData[`${cities[i].city + daily}`].daily.temperature_2m_min[0]
      );
  
      // set dailRainChance
      dailyRainChance.innerHTML =
        weatherData[`${cities[i].city + daily}`].daily
          .precipitation_probability_max[0] + "%";
  
      // set dailyWindSpeedMax
      dailyWindSpeedMax.innerHTML =
        weatherData[`${cities[i].city + daily}`].daily.wind_speed_10m_max[0] +
        "km/h";
  
      // set dailySunrise
      dailySunrise.innerHTML =
        weatherData[`${cities[i].city + daily}`].daily.sunrise[0].slice(-5);
  
      // set dailySunset
      dailySunset.innerHTML =
        weatherData[`${cities[i].city + daily}`].daily.sunset[0].slice(-5);
    }
  
    <div id="waterford" class="column is-3">
          <section class="card">
              <header class="card-header">
                  <p class="card-header-title is-size-4 is-centered city-name"></p>
              </header>
              <article class="card-content px-1">
                  <div class="has-text-centered">
                      <p class="is-size-6 mb-2 is-centered weather-code">Mostly Dry with sunndy spells</p>
                  </div>
  
                  <p class="is-size-7">Temp: <span class="is-pulled-right">H <span class="daily-high-temp"></span>°C / L
                          <span class="daily-low-temp"></span>°C</span></p>
                  <p class="is-size-7">Chance of Rain: <span class="is-pulled-right daily-rain-chance"></span>
                  </p>
                  <p class="is-size-7">Wind: <span class="daily-wind-speed-max is-pulled-right"></span></p>
                  <p class="is-size-7">Sunrise: <span class="daily-sunrise is-pulled-right"></span></p>
                  <p class="is-size-7">Sunset: <span class="daily-sunset is-pulled-right"></span></p>
              </article>
              <footer class="card-footer">
              </footer>
          </section>
      </div>
  
    // if we are on the city page
    if (window.location.href.indexOf("city") > -1) {
      alert("your url contains the name franky");
    }
  });
  
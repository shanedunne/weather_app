const createCityOtherDayCards = (city, dayName, dayDataIndex) => {
    return `
  </div>
    <div id="${city.city}_${dayDataIndex}" class="column is-2" onclick="getHourlyData(this.id)">
    <section class="card">
        <header class="card-header">
            <p class="card-header-title is-size-4 is-centered city-name">${dayName}</p>
        </header>
        <article class="card-content px-1">
            <div class="has-text-centered">
                <p class="is-size-6 mb-2 is-centered weather-code">${weatherCodes[weatherData[`${city.city + daily}`].daily.weather_code[dayDataIndex]]}</p>
            </div>

            <p class="is-size-7">Temp: <span class="is-pulled-right">H <span class="daily-high-temp">${Math.round(
                weatherData[`${city.city + daily}`].daily.temperature_2m_max[dayDataIndex]
              )}</span>°C / L
                    <span class="daily-low-temp">${Math.round(
                      weatherData[`${city.city + daily}`].daily.temperature_2m_min[dayDataIndex]
                    )}</span>°C</span></p>
            <p class="is-size-7">Chance of Rain: <span class="is-pulled-right daily-rain-chance">${weatherData[`${city.city + daily}`].daily
            .precipitation_probability_max[dayDataIndex] + "%"}</span>
            </p>
            <p class="is-size-7">Wind: <span class="daily-wind-speed-max is-pulled-right">${weatherData[`${city.city + daily}`].daily.wind_speed_10m_max[dayDataIndex] +
            "km/h"}</span></p>
            <p class="is-size-7">Sunrise: <span class="daily-sunrise is-pulled-right">${weatherData[`${city.city + daily}`].daily.sunrise[dayDataIndex].slice(-5)}</span></p>
            <p class="is-size-7">Sunset: <span class="daily-sunset is-pulled-right">${weatherData[`${city.city + daily}`].daily.sunset[dayDataIndex].slice(-5)}</span></p>
        </article>
        <footer class="card-footer">
        </footer>
    </section>
</div>
    `
}
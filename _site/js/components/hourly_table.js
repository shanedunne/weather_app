function createHourlyTable(city, day) {
  // information on where to slice depending on the day
  const sliceLocation = [
    { day: "today", start: 0, end: 24 },
    { day: "today+1", start: 24, end: 48 },
    { day: "today+2", start: 48, end: 72 },
    { day: "today+3", start: 72, end: 96 },
    { day: "today+4", start: 96, end: 120 },
    { day: "today+5", start: 120, end: 144 },
    { day: "today+6", start: 144, end: 168 },
  ];

  // array to contain rows created
  const rows = [];
  // get data for timeRow for specified day
  const timeRowData = weatherData[`${city.city}_hourly`].hourly.time.slice(
    sliceLocation[day].start,
    sliceLocation[day].end
  );

  // create row for time data
  let timeRow = `<tr><th class="tg-0lax">Time</th>${timeRowData
    .map((time) => `<td class="tg-0lax time">${time.slice(-5)}</td>`)
    .join("")}</tr>`;

  // add timeRow to the rows array
  rows.push(timeRow);

  // get data for tempRow for specified day
  const tempRowData = weatherData[
    `${city.city}_hourly`
  ].hourly.temperature_2m.slice(
    sliceLocation[day].start,
    sliceLocation[day].end
  );
  // create row for temperature data
  let tempRow = `<tr><th class="tg-0lax">Temp:</th>${tempRowData
    .map((temp) => `<td class="tg-0lax">${Math.round(temp)}°C</td>`)
    .join("")}</tr>`;

  // add tempRow to the rows array
  rows.push(tempRow);

  // get data for feelsLikeRow for specified day
  const feelsLikeRowData = weatherData[
    `${city.city}_hourly`
  ].hourly.apparent_temperature.slice(
    sliceLocation[day].start,
    sliceLocation[day].end
  );

  // create row for feels like temperature data
  let feelsLikeRow = `<tr><th class="tg-0lax">Feels like:</th>${feelsLikeRowData
    .map((feelsLike) => `<td class="tg-0lax">${Math.round(feelsLike)}°C</td>`)
    .join("")}</tr>`;

  // add feelsLikeRow to the rows array
  rows.push(feelsLikeRow);

  // get data for rainRow for specified day
  const rainRowData = weatherData[
    `${city.city}_hourly`
  ].hourly.precipitation.slice(
    sliceLocation[day].start,
    sliceLocation[day].end
  );

  // create row for rain data
  let rainRow = `<tr><th class="tg-0lax">Rain:</th>${rainRowData
    .map((rain) => `<td class="tg-0lax">${rain}mm</td>`)
    .join("")}</tr>`;

  // add rainRow to the rows array
  rows.push(rainRow);

  // get data for rainChanceRow for specified day
  const rainChanceRowData = weatherData[
    `${city.city}_hourly`
  ].hourly.precipitation_probability.slice(
    sliceLocation[day].start,
    sliceLocation[day].end
  );

  // create row for chance of rain data
  let rainChanceRow = `<tr><th class="tg-0lax">Chance of Rain:</th>${rainChanceRowData
    .map((chance) => `<td class="tg-0lax">${chance}%</td>`)
    .join("")}</tr>`;

  // add rainChanceRow to the rows array
  rows.push(rainChanceRow);

  // get data for humidityRow for specified day
  const humidityRowData = weatherData[
    `${city.city}_hourly`
  ].hourly.relative_humidity_2m.slice(
    sliceLocation[day].start,
    sliceLocation[day].end
  );

  // create row for humidity data
  let humidityRow = `<tr><th class="tg-0lax">Humidity:</th>${humidityRowData
    .map((humidity) => `<td class="tg-0lax">${humidity}%</td>`)
    .join("")}</tr>`;

  // add humidityRow to the rows array
  rows.push(humidityRow);

  // get data for windSpeedRow for specified day
  const windSpeedRowData = weatherData[
    `${city.city}_hourly`
  ].hourly.wind_speed_10m.slice(
    sliceLocation[day].start,
    sliceLocation[day].end
  );

  // create row for wind speed data
  let windSpeedRow = `<tr><th class="tg-0lax">Wind Speed:</th>${windSpeedRowData
    .map((windSpeed) => `<td class="tg-0lax">${Math.round(windSpeed)}km/h</td>`)
    .join("")}</tr>`;

  // add windSpeedRow to the rows array
  rows.push(windSpeedRow);

  // returns rows
  return rows.join("");
}

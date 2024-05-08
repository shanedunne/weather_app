function createHourlyTable(city, day, preferences) {
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

  // HIGHLIGHT COLUMN OF CURRENT HOUR
  // get the current hour
  const currentHour = new Date().getHours();

  // get the index of the current hour in the timeRowData and use it to find the correct columns
  const currentHourIndex = timeRowData.findIndex((time) => parseInt(time.slice(-5, -3)) === currentHour);

  /* A function to check if the index of the data being mapped matches the index of the current hour
   also ensures day === 0, meaning the current hour will only be highlighted on todays hourly table.
   Sets a class of highlighted-hour to columns replresenting this hour
   */

  highlightCurrentHourData = (index) => index === currentHourIndex && day === 0 ? "highlighted-hour" : "";
  
  

  // create row for time data
  let timeRow = `<tr><th class="tg-0lax">Time</th>${timeRowData
    .map((time, index) => `<td class="tg-0lax time ${highlightCurrentHourData(index)}">${time.slice(-5)}</td>`)
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
    .map((temp, index) => `<td class="tg-0lax ${highlightCurrentHourData(index)}">${Math.round(temp)}°C</td>`)
    .join("")}</tr>`;

  // add tempRow to the rows array
  if(preferences.includes("temperature")) {
    rows.push(tempRow);
  }
  

  // get data for feelsLikeRow for specified day
  const feelsLikeRowData = weatherData[
    `${city.city}_hourly`
  ].hourly.apparent_temperature.slice(
    sliceLocation[day].start,
    sliceLocation[day].end
  );

  // create row for feels like temperature data
  let feelsLikeRow = `<tr><th class="tg-0lax">Feels like:</th>${feelsLikeRowData
    .map((feelsLike, index) => `<td class="tg-0lax ${highlightCurrentHourData(index)}">${Math.round(feelsLike)}°C</td>`)
    .join("")}</tr>`;

  // add feelsLikeRow to the rows array
  if(preferences.includes("feels_like")){
    rows.push(feelsLikeRow);
  }
  

  // get data for rainRow for specified day
  const rainRowData = weatherData[
    `${city.city}_hourly`
  ].hourly.precipitation.slice(
    sliceLocation[day].start,
    sliceLocation[day].end
  );

  // create row for rain data
  let rainRow = `<tr><th class="tg-0lax">Rain:</th>${rainRowData
    .map((rain, index) => `<td class="tg-0lax ${highlightCurrentHourData(index)}">${rain}mm</td>`)
    .join("")}</tr>`;

  // add rainRow to the rows array
  if(preferences.includes("rain")) {
    rows.push(rainRow);
  }

  // get data for rainChanceRow for specified day
  const rainChanceRowData = weatherData[
    `${city.city}_hourly`
  ].hourly.precipitation_probability.slice(
    sliceLocation[day].start,
    sliceLocation[day].end
  );

  // create row for chance of rain data
  let rainChanceRow = `<tr><th class="tg-0lax">Chance of Rain:</th>${rainChanceRowData
    .map((chance, index) => `<td class="tg-0lax ${highlightCurrentHourData(index)}">${chance}%</td>`)
    .join("")}</tr>`;

  // add rainChanceRow to the rows array
  if(preferences.includes("chance_of_rain")){
    rows.push(rainChanceRow);
  }

  // get data for humidityRow for specified day
  const humidityRowData = weatherData[
    `${city.city}_hourly`
  ].hourly.relative_humidity_2m.slice(
    sliceLocation[day].start,
    sliceLocation[day].end
  );

  // create row for humidity data
  let humidityRow = `<tr><th class="tg-0lax">Humidity:</th>${humidityRowData
    .map((humidity, index) => `<td class="tg-0lax ${highlightCurrentHourData(index)}">${humidity}%</td>`)
    .join("")}</tr>`;

  // add humidityRow to the rows array
  if(preferences.includes("humidity")){
    rows.push(humidityRow);
  }

  // get data for windSpeedRow for specified day
  const windSpeedRowData = weatherData[
    `${city.city}_hourly`
  ].hourly.wind_speed_10m.slice(
    sliceLocation[day].start,
    sliceLocation[day].end
  );

  // create row for wind speed data
  let windSpeedRow = `<tr><th class="tg-0lax">Wind Speed:</th>${windSpeedRowData
    .map((windSpeed, index) => `<td class="tg-0lax ${highlightCurrentHourData(index)}">${Math.round(windSpeed)}km/h</td>`)
    .join("")}</tr>`;

  // add windSpeedRow to the rows array
  if(preferences.includes("wind_speed")){
    rows.push(windSpeedRow);
  }

  // returns rows
  return rows.join("");
}

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
// let day = daysOfWeek[d.getDay()];

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

  // temporary measure to only run certain funcions on certain pages
  const path = window.location.pathname;

  // set the base index of days as today/0
  let day = 0;

  // stores the city page user is on, if they are one one
  const currentCity = cities.find((city) =>
    path.includes(`/city_${city.city}/`)
  );

  if (path === "/") {
    // call function to populate cities on home page
    const indexPage = document.querySelector("#index");

    // today is index 0
    
    cities.forEach(
      (city, index) => (indexPage.innerHTML += createCityDailyCards(city, day))
    );
  } else if (path === `/city_${currentCity.city}/`) {
    const cityPage = document.querySelector("#cityPage");
    cityPage.innerHTML += createTodaysCityDailyCards(currentCity, day)
  }
});

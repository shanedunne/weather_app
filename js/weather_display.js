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
let today = d.getDay();

//PREFERENCES
// array to handle checked cities
let favouriteCities = ["berlin", "cork"];

document.addEventListener("DOMContentLoaded", () => {
  // temporary measure to only run certain funcions on certain pages
  const path = window.location.pathname;

  // set the base index of days as today/0
  let day = 0;

  // stores the city page user is on, if they are one one
  const currentCity = allCities.find((city) =>
    path.includes(`/city_${city.city}/`)
  );

  // handle index page
  if (path === "/") {
    // identify element on index page to insert content
    const indexPage = document.querySelector("#index");

    // create a card for each city on the index page and insert to html
    allCities.forEach(
      (city, index) => (indexPage.innerHTML += createCityDailyCards(city, day))
    );
  } else if (path === "/favourite_cities/") {
    console.log(favouriteCities)

    // identify element on favourite cities page to insert content
    const favouriteCitiesContainer = document.querySelector("#favoutiteCities");

    // if no favourite cities have been selected i.e. favourite cities array is empty, render element declaring this
      if (favouriteCities.length === 0) {
        let element = 
        `
        <div class="column is-12 has-text-centered">
        <p class="is-size-3">
            You have not selected your favourite cities
        </p>
        <p class="is-size-4">
          You can choose your favourite cities on the <a href="">preferences</a> page
      </p>
    </div>
        `
        favouriteCitiesContainer.innerHTML += element;
      } else {

        // if some favourite cities selected, iterate through array
        favouriteCities.forEach(
          (favouriteCity, index) => {

            // get favourite city object from all_cities
            let favouriteCityObject = allCities.find(city => city.city === favouriteCity);
            
            // add city to html by creating card
            favouriteCitiesContainer.innerHTML += createCityDailyCards(favouriteCityObject, day)}
        );
      }
  }  else if (path === `/city_${currentCity.city}/`) {
    // handle city focus page

    // TODAYS WEATHER SUMMARY
    // identify element on city focus page for todays weather summary
    const cityPageToday = document.querySelector("#cityPageToday");

    // create a card for the cities weather summary of today and insert to html
    console.log("current city: " + currentCity)
    cityPageToday.innerHTML += createTodaysCityDailyCards(currentCity, day);

    // TODAYS HOURLY WEATHER
    // identify element on city focus page for todays hourly weather summary
    const hourlyWeatherTable = document.querySelector("#hourlyTable");

    // call function to create rows for the hourly table and insert into the html
    hourlyWeatherTable.innerHTML = createHourlyTable(currentCity, day);

    // REST OF WEEK
    // identify element on city focus page for showing the rest of the weeks weather
    const cityPageFollowingDays = document.querySelector(
      "#cityPageFollowingDays"
    );

    // iterate through the weatherData to produce weather cards for the rest of the week
    // let i = 1 as we are looking for tomorrows weather onwards
    for (let i = 1; i < 7; i++) {
      let dayIndex = (today + i) % 7;
      let dayName = daysOfWeek[dayIndex];
      cityPageFollowingDays.innerHTML += createCityOtherDayCards(
        currentCity,
        dayName,
        i
      );
    }
  } 
});


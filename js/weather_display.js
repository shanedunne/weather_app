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

document.addEventListener("DOMContentLoaded", () => {
  // temporary measure to only run certain funcions on certain pages
  const path = window.location.pathname.toLowerCase();

  const urlParams = new URLSearchParams(window.location.search);
  const currentCityParam = urlParams.get("city");
  const currentCity = allCities.find((city) => city.city === currentCityParam);
  console.log("current city: " + currentCity)

  // local storage
  // favourite cities set up
  let favouriteCities = JSON.parse(localStorage.getItem('favouriteCities')) || [];

  let storedCities = localStorage.getItem("favouriteCities");
  let storedCitiesParsed = storedCities ? JSON.parse(storedCities) : [];

  // preferences setup - set all checked as standard unless saved to localstorage differently
  let preferenceData = JSON.parse(localStorage.getItem("preferenceData")) || [
    "temperature",
    "feels_like",
    "rain",
    "chance_of_rain",
    "humidity",
    "wind_speed",
  ];

  if (!localStorage.getItem("preferenceData")) {
    localStorage.setItem("preferenceData", JSON.stringify(preferenceData));
  }

  let storedPreferences = localStorage.getItem("preferenceData");
  let storedPreferencesParsed = JSON.parse(storedPreferences);

  // set the base index of days as today/0
  let day = 0;

  // handle index page
  if (path === "/") {
    // identify element on index page to insert content
    const indexPage = document.querySelector("#index");

    // create a card for each city on the index page and insert to html
    allCities.forEach(
      (city, index) => (indexPage.innerHTML += createCityDailyCards(city, day))
    );
  } else if (path === "/preferences/") {

    // get all hourly preferences checkboxes
    const hourlyPreferencesCheckbox = document.querySelectorAll("#hourlyPreferencesCheckbox");

    // get all favourite ciy checkboxes
    const favouriteCityCheckbox = document.querySelectorAll(
      "#favoutiteCitiesCheckbox"
    );

    // HOURLY PREFERENCES CHECKBOX
    // sets all checkboxes that exist in localStorage to checked
    hourlyPreferencesCheckbox.forEach((checkbox) => {
      if (storedPreferencesParsed.includes(checkbox.value)) {
        checkbox.checked = true;
      }
    });
    
    // loop through all of the preferences checkboxes and create an event listener
    hourlyPreferencesCheckbox.forEach((checkbox) => {
      checkbox.addEventListener("change", (event) => {
        // if the change means a preference is checked, add it to the array once its not already there
        if (event.target.checked) {
          if (!preferenceData.includes(event.target.value)) {
            preferenceData.push(event.target.value);
          }
        } else {
          // if it was an uncheck, remove the city from the array backed on the value
          preferenceData = preferenceData.filter(
            (preference) => preference !== event.target.value
          );
        }
        // stringify favouriteCities array
        const stringifiedPreferences = JSON.stringify(preferenceData);

        // Store updated array in localStorage
        localStorage.setItem("preferenceData", stringifiedPreferences); 
        
        console.log("Preferences:", preferenceData);
      });
    });
    

    // FAVOURITE CITY CHECKBOXES
    // sets all checkboxes that exist in localStorage to checked
    favouriteCityCheckbox.forEach((checkbox) => {
      if (storedCitiesParsed.includes(checkbox.value)) {
        checkbox.checked = true;
      }
    });
    
    // loop through all of the favourite city checkboxes and create an event listener
    favouriteCityCheckbox.forEach((checkbox) => {
      checkbox.addEventListener("change", (event) => {
        // if the change means a city is checked, add it to the array once its not already there
        if (event.target.checked) {
          if (!favouriteCities.includes(event.target.value)) {
            favouriteCities.push(event.target.value);
          }
        } else {
          // if it was an uncheck, remove the city from the array backed on the value
          favouriteCities = favouriteCities.filter(
            (city) => city !== event.target.value
          );
        }
        // stringify favouriteCities array
        const stringifiedCities = JSON.stringify(favouriteCities);

        // Store updated array in localStorage
        localStorage.setItem("favouriteCities", stringifiedCities); 
        
        console.log("Favourite Cities:", favouriteCities);
      });
    });
  } else if (path === "/favourite_cities/") {
    console.log(favouriteCities);

    // identify element on favourite cities page to insert content
    const favouriteCitiesContainer = document.querySelector("#favoutiteCities");

    console.log("store names" + storedCitiesParsed);

    // if no favourite cities have been selected i.e. favourite cities array is empty, render element declaring this
    if (favouriteCities.length === 0) {
      let element = `
        <div class="column is-12 has-text-centered">
        <p class="is-size-3">
            You have not selected your favourite cities
        </p>
        <p class="is-size-4">
          You can choose your favourite cities on the <a href="/preferences/">preferences</a> page
      </p>
    </div>
        `;
      favouriteCitiesContainer.innerHTML += element;
    } else {
      // if some favourite cities selected, iterate through array
      // first, get names from local storag

      storedCitiesParsed.forEach((favouriteCity, index) => {
        // get favourite city object from all_cities
        let favouriteCityObject = allCities.find(
          (city) => city.city === favouriteCity
        );

        // add city to html by creating card
        favouriteCitiesContainer.innerHTML += createCityDailyCards(
          favouriteCityObject,
          day
        );
      });
    }
  } else if (path === "/cityfocus/") {
    // handle city focus page
    if (currentCity) {
      // TODAYS WEATHER SUMMARY
      // identify element on city focus page for todays weather summary
      const cityPageToday = document.querySelector("#cityPageToday");

      // create a card for the cities weather summary of today and insert to html
      console.log("current city: " + currentCity);
      cityPageToday.innerHTML += createTodaysCityDailyCards(currentCity, day);

      // TODAYS HOURLY WEATHER
      // identify element on city focus page for todays hourly weather summary
      const hourlyWeatherTable = document.querySelector("#hourlyTable");

      // call function to create rows for the hourly table and insert into the html
      hourlyWeatherTable.innerHTML = createHourlyTable(currentCity, day, storedPreferencesParsed);

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
    } else {
      console.log("no current city found".currentCity);
    }
  }
});

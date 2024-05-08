/*
  This function looks after producing hourly weather tables for days other than today in the city focus page
*/

function getHourlyData(cardId) {
    // split the id to recover the parameters needed to call the createHourlyTable function
    const [currentCity, selectedDay] = cardId.split("-");

    // get local storage of preferences
    let storedPreferences = localStorage.getItem("preferenceData");
  let storedPreferencesParsed = JSON.parse(storedPreferences);
  
    // ensure the day index is greater than 0 i.e. not today as we already have this hourly data on the page
    if (selectedDay > 0) {
      // identify element on city focus page for todays hourly weather summary
      const otherDayHourlyData = document.querySelector(
        "#otherDayHourlyData"
      );
      // SHOW ACTIVE CARD
      // clear active class from all cards when clicked, so only 1 appears active at the same time
      document.querySelectorAll(".card-header").forEach(header => {
        header.classList.remove("card-header-active");
      });

      // get the clicked card and all the active class. This will show what day the hourly table represents
      const clickedCardHeader = document.querySelector(`#${cardId} .card-header`);
    if (clickedCardHeader) {
        clickedCardHeader.classList.add('card-header-active');
    }
      // get the object containing the current city to pass to the createHourlyTable
      const currentCityObject = allCities.find(city => city.city === currentCity);
      console.log(currentCityObject + "here")
  
      // call function to create rows for the hourly table and insert into the html
      otherDayHourlyData.innerHTML = createHourlyTable(currentCityObject, selectedDay, storedPreferencesParsed);
    }
  }
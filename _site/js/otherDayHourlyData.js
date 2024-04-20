function getHourlyData(cardId) {
    // split the id to recover the parameters needed to call the createHourlyTable function
    const [city, selectedDay] = cardId.split("_");
  
    // ensure the day index is greater than 0 i.e. not today as we already have this hourly data on the page
    if (selectedDay > 0) {
      // identify element on city focus page for todays hourly weather summary
      const otherDayHourlyData = document.querySelector(
        "#otherDayHourlyData"
      );
  
      // call function to create rows for the hourly table and insert into the html
      otherDayHourlyData.innerHTML = createHourlyTable(city, selectedDay);
    }
  }
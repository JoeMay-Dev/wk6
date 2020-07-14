const citySearch = "Atlanta"
const APIKey = "166a433c57516f51dfab1f7edaed8413";

const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=" + APIKey;


    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(nowResult) {

      
      console.log(queryURL);
      console.log(nowResult);
      
      const cityName = (nowResult.name);
      const cityID = (nowResult.id);
      console.log(cityName);
      console.log(cityID);

      const fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?id=" + cityID + "&units=imperial&appid=" + APIKey;

      
    $.ajax({
        url: fiveDayQueryURL,
        method: "GET"
    }).then(function(fiveDayResult){

        console.log(fiveDayResult);
        const day = new Date (fiveDayResult.list[i].dt);
        
        // console.log(day);
        // console.log(day.getUTCDate());
        // console.log(day.toUTCString());

    })

      // Create CODE HERE to transfer content to HTML
      // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
      // Create CODE HERE to dump the temperature content into HTML

    });
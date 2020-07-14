const searchButton = document.getElementById("searchButton");
const APIKey = "166a433c57516f51dfab1f7edaed8413";

$("button").on("click", function(e){
    e.preventDefault();
    const citySearch = document.getElementById("search").value;
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&units=imperial&appid=" + APIKey;
    console.log(citySearch);

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(nowResult) {
    
    const cityName = (nowResult.name);
    const cityTemp = (nowResult.main.temp);
    const cityHumidity = (nowResult.main.humidity);
    const cityWindspeed = (nowResult.wind.speed)
    const cityID = (nowResult.id);
    const cityLat = (nowResult.coord.lat);
    const cityLon = (nowResult.coord.lon);
    const uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + cityLat + "&lon=" + cityLon;
    const fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?id=" + cityID + "&units=imperial&appid=" + APIKey;
    
    
    $('#city').text(cityName);
    $('#temp').text(cityTemp + " degrees F");
    $('#humidity').text(cityHumidity + "%");
    $('#windspeed').text(cityWindspeed + " knots");
    
    
    
    
    $.ajax({
        url: uvQueryURL,
        method: "GET"
    }).then(function(uvResult){
        
        const cityUV = (uvResult.value)
        $('#UV').text(cityUV);
        
        if (cityUV <= 2) {
            $("#UV").addClass("lowUV");
        } else if (cityUV >2 && cityUV <=5) {
            $("#UV").addClass("moderateUV");
        } else {
            $("#UV").addClass("highUV");
        }
        
        
        // console.log(day);
        // console.log(day.getUTCDate());
        // console.log(day.toUTCString());
        
    })
    
    $.ajax({
        url: fiveDayQueryURL,
        method: "GET"
    }).then(function(fiveDayResult){
        
        console.log(fiveDayResult);
        const day = new Date (fiveDayResult.list[0].dt);
        
        // console.log(day);
        // console.log(day.getUTCDate());
        // console.log(day.toUTCString());
        
    })
    
    // Create CODE HERE to transfer content to HTML
    // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
    // Create CODE HERE to dump the temperature content into HTML
});
    
});
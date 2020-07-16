const searchButton = document.getElementById("searchButton");
const APIKey = "166a433c57516f51dfab1f7edaed8413";
const day = moment().format("MM/D/YY");
const prevSearchArr = []
const prevSearchList = document.getElementById("prev-search");

prevSearchList.addEventListener("click", function (event) {
    const element = event.target;
    if (element.innerHTML !== null) {
        const prevCity = element.innerHTML;
        const index = element.getAttribute("data-index");
        console.log(index);
        prevSearchArr.splice(index, 1);
        storePrev();
        renderPrevSearch();
        weatherSearch(prevCity);
    }
    // console.log(prevSearchArr);

});
function init() {
    const storedPrevSearch = JSON.parse(localStorage.getItem("prevSearchArr"));
    if (storedPrevSearch !== null) {
        prevSearchArr = storedPrevSearch;
    }
    renderPrevSearch();
}

function renderPrevSearch() {
    prevSearchList.innerHTML = "";
    for (let i = 0; i < prevSearchArr.length; i++) {
        const prevSearch = prevSearchArr[i];
        const li = document.createElement("li");
        li.textContent = prevSearch;
        li.setAttribute("data-index", i);
        prevSearchList.appendChild(li);
    }
}
function storePrev() {
    localStorage.setItem("prev", JSON.stringify(prevSearchArr));
}
function weatherSearch(city) {
    // console.log(city);
    const queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    // console.log(prevSearchArr);


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (nowResult) {

        const cityName = (nowResult.name);
        const cityTemp = (nowResult.main.temp);
        const cityHumidity = (nowResult.main.humidity);
        const cityWindspeed = (nowResult.wind.speed)
        const cityID = (nowResult.id);
        const cityLat = (nowResult.coord.lat);
        const cityLon = (nowResult.coord.lon);
        const uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + cityLat + "&lon=" + cityLon;
        const fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?id=" + cityID + "&cnt=6&units=imperial&appid=" + APIKey;

        $('#city').text(cityName + " " + day);
        $('#temp').text(cityTemp + " °F");
        $('#humidity').text(cityHumidity + "%");
        $('#windspeed').text(cityWindspeed + " knots");

        $.ajax({
            url: uvQueryURL,
            method: "GET"
        }).then(function (uvResult) {

            const cityUV = (uvResult.value)
            $('#UV').text(cityUV);

            if (cityUV <= 2) {
                $("#UV").addClass("lowUV");
            } else if (cityUV > 2 && cityUV <= 5) {
                $("#UV").addClass("moderateUV");
            } else {
                $("#UV").addClass("highUV");
            }

        })

        $.ajax({
            url: fiveDayQueryURL,
            method: "GET"
        }).then(function (fiveDayResult) {
            // console.log(fiveDayResult);
            const fiveDay = fiveDayResult.list;

            for (let i = 1; i < fiveDay.length; i++) {
                $("#day" + [i]).empty();
                const nextDiv = $("<div>");
                const nextDate = $("<h4>");
                const newDay = moment().add([i], 'days').format("MM/D/YY");
                const maxTemp = $("<p>");
                maxTemp.text("High: " + fiveDay[i].temp.max + " °F");
                const minTemp = $("<p>");
                minTemp.text("Low: " + fiveDay[i].temp.min + " °F");
                const moisture = $("<p>");
                moisture.text("Humidity: " + fiveDay[i].humidity + "%");
                // console.log(newDay)
                nextDate.text(newDay);
                nextDiv.append(nextDate, maxTemp, minTemp, moisture);
                $("#day" + [i]).prepend(nextDiv);
            }
        });

    });
};
$("button").on("click", function (e) {
    e.preventDefault();
    const citySearch = document.getElementById("search").value.trim();
    // console.log(citySearch);
    init();
    prevSearchArr.push(citySearch);
    citySearch.value = "";
    storePrev();
    renderPrevSearch();
    weatherSearch(citySearch);
});

var APIKey = "08fd305a5d7db027100d162178b62865";
var city;

var header = $("#city-display");
var forecast = $("#forecast-wrapper");
var windDisplay = $("#wind");
var tempDisplay = $("#temp");
var humidityDisplay = $("#humidity");
var uvDisplay = $("#uv");

var dayOne = $("#forecast-1");
var dayTwo = $("#forecast-2");
var dayThree = $("#forecast-3");
var dayFour = $("#forecast-4");
var dayFive = $("#forecast-5");

var input = $("#city-input");
var searchButton = $("#city-input-button");

var res;

//Search button event listener
searchButton.on("click", handleSubmit);


//Called on button click, calls input city to display
function handleSubmit() {
    callCity()
}

//Appends recent searches
function appendCity(cityName) {
    //Declares variables to append
    var cityDisplay = $("#city-display-table");
    var tableEl = $('<button>')

    //On recent searches/appended button click, calls respective city
    tableEl.on("click", function() {
        input.val(cityName);
        callCity();
    });
    
    //Prepends, so most recent search remains at top of container
    cityDisplay.prepend(tableEl);
    tableEl.text(cityName);
}

//Pulls local storage
function readCities() {
    var cityListStr = localStorage.getItem("cityList");

    //Creates empty string for local storage / city searches
    var cityList = [];

    if (cityListStr !== null) {
        cityList = JSON.parse(cityListStr);
    }

    return cityList;
}

function saveCity(cityName) {
    var cityList = readCities();

    //If user input is already in cityList string, console log response
    if (cityList.indexOf(cityName) !== -1) {
        console.log("already exists");
    } else {
        //Else, add user input to cityList array
        cityList.push(cityName);
        appendCity(cityName);
    }

    localStorage.setItem("cityList", JSON.stringify(cityList));
}

//Calls data from API
function callCity() {
    //Forces all user input to uppercase, for uniformity on the page
    var city = input.val().toUpperCase();

    //FIX THIS
    //FIX THIS
    //FIX THIS
    //FIX THIS
    //FIX THIS
    //FIX THIS
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIKey}`

    $.ajax({
        //Pulls URL from API
        url: queryURL,
        method: "GET",
    }).then(function(response){
        //Take city search parameters and delcare variables for lat/long
        var latitude = response.coord.lat;
        var longitude = response.coord.lon;

        $.ajax({
            //Then, pull new API URL with lat/lon of chosen city
            url: `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=${APIKey}`
        }).then(function(data) {

            //Loop through array, and increment through API's daily array
            //Will append current data for city to main containers, and for each consecutive day to respective containers.
            for (var i = 0; i < 6; i++){
                $("#weather-icon" + i).attr("src", "http://openweathermap.org/img/wn/" + data.daily[i].weather[0]);
                $("#temp" + i).text("Temp: " + data.daily[i].temp.day);
                $("#wind" + i).text("Wind: " + data.daily[i].wind_speed);
                $("#humidity" + i).text("Humidity: " + data.daily[i].humidity);
                $("#uv").text("UV Index: " + data.daily[i].uvi);
            }

            saveCity(city)
        })
    })
}

//Appends local storage
function getCity() {
    var cityList = readCities();
    
    //Loops through array of appended city searches and appends list
    for (i = 0; i < cityList.length; i++) {
        appendCity(cityList[i]);
        console.log(cityList[i]);
    }

}

//Pulls local storage data
getCity()

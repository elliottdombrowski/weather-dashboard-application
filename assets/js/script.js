var APIKey = "08fd305a5d7db027100d162178b62865";
var city;

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
// var dayCast = $("");

var input = $("#city-input");
var searchButton = $("#city-input-button");


searchButton.on("click", appendCity);

//APPENDS RECENT SEARCHES
function appendCity() {
    var cityDisplay = $("#city-display-table");
    var tableEl = $('<button>')
    
    cityDisplay.append(tableEl);
    tableEl.text(input.val())

    //Calls saveCity to save input to local storage
    saveCity()
    //Calls callCity to pull and append API data
    callCity()
}


//saveCity to store persistent local data
function saveCity() {
    localStorage.setItem("cities", input.val());
    console.log("save working?");
}

function callCity() {
    city = "chicago";
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
    console.log(url);

    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            showForecast(result)
        },
        error: function (error) {
            console.log(error);
        }
    })  
}

function showForecast(forecast) {
    var temp = forecast.main;
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`


    tempDisplay.textContent = temp;
    console.log(forecast)
}
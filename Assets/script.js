//This displays the current date
var today = moment();
$("#todays-date").text(today.format("MMM Do, YYYY"));
// var apiKey = "fe350fcf1bdf0b9498e33816a7a5fca8"
var forecasts = document.querySelectorAll(".forecasts");

//--------------------------------------------------------------------------------------------------------------------//
//ON-LOAD
//When page first load it already has a city to show the weather from 
window.onload = function() { 
    startLoad.loadWeather ()
    onForecast.onfetchForecast() 
} 
let startLoad = {
    "apiKey": "fe350fcf1bdf0b9498e33816a7a5fca8",
    loadWeather: function (cupertino) {
       fetch ("https://api.openweathermap.org/data/2.5/weather?q=cupertino" 
        + "&units=imperial&appid=" 
        + this.apiKey)
       .then((response) => response.json())
       .then((data) => this.onLoadWeather(data));
    },
    //This Function retrieves the data then displays it to its respective locations on the page 
    onLoadWeather: function (data) {
        const {name} = data;
        const {icon} = data.weather[0];
        const {temp} = data.main;
        const {humidity} = data.main;
        const {speed} = data.wind;
        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon + ".png";
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " mph";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    },
};

let onForecast = {
    "apiKey": "fe350fcf1bdf0b9498e33816a7a5fca8",
    onfetchForecast: function (cupertino) {
        fetch ("https://api.openweathermap.org/data/2.5/forecast?q=cupertino"
        + "&appid="
        + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.onDisplayForecast(data));
    },

    onDisplayForecast: function (data) {
        console.log(data)
        for (i = 0; i < forecasts.length; i++) {
            forecasts[i].innerText = "";
            var forecastTime = i * 8 + 4;
            var fDate = new Date(data.list[forecastTime].dt * 1000);
            var fDay = fDate.getDate();
            var fMonth = fDate.getMonth() + 1;
            var fYear = fDate.getFullYear();
            var forecastInfo = document.createElement("h4");
                forecastInfo.innerText = fMonth + "/" + fDay + "/" + fYear;
                forecasts[i].append(forecastInfo);
            var fIcon = document.createElement("img");
            fIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[forecastTime].weather[0].icon + ".png");
            forecasts[i].append(fIcon);
            var fTemp = document.createElement("p");
            fTemp.innerHTML = "Temp: " + (Math.round(((data.list[forecastTime].main.temp - 273.15) * 9 / 5 + 32) * 100) / 100) + "°F";
            forecasts[i].append(fTemp);
            var fWind = document.createElement("p");
            fWind.innerHTML = "Wind: " + (Math.round(2.23694 * data.list[forecastTime].wind.speed * 100) / 100) + " mph";
            forecasts[i].append(fWind);
            var fHumidity = document.createElement("p");
            fHumidity.innerHTML = "Humidity: " + data.list[forecastTime].main.humidity + " %";
            forecasts[i].append(fHumidity);
        }
    }
}



//---------------------------------------------------------------------------------------------------------------------//
//CURRENT DAY WEATHER
// //This function makes the call to the API
// //Then runs the function to display it
let currentWeather = {
    "apiKey": "fe350fcf1bdf0b9498e33816a7a5fca8",
    fetchWeather: function (city) {
       fetch ("https://api.openweathermap.org/data/2.5/weather?q="
        + city 
        + "&units=imperial&appid=" 
        + this.apiKey)
       .then((response) => response.json())
       .then((data) => this.displayWeather(data));
    },
    //This Function retrieves the data then displays it to its respective locations on the page 
    displayWeather: function (data) {
        const {name} = data;
        const {icon} = data.weather[0];
        const {temp} = data.main;
        const {humidity} = data.main;
        const {speed} = data.wind;
        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon + ".png";
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " mph";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
};

//--------------------------------------------------------------------------------------------------------------------//
// 5-DAY FORECAST
let forecast = {
    "apiKey": "fe350fcf1bdf0b9498e33816a7a5fca8",
    fetchForecast: function (city) {
        fetch ("https://api.openweathermap.org/data/2.5/forecast?q="
        + city
        + "&appid="
        + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayForecast(data));
    },

    displayForecast: function (data) {
        console.log(data)
        for (i = 0; i < forecasts.length; i++) {
            forecasts[i].innerText = "";
            var forecastTime = i * 8 + 4;
            var fDate = new Date(data.list[forecastTime].dt * 1000);
            var fDay = fDate.getDate();
            var fMonth = fDate.getMonth() + 1;
            var fYear = fDate.getFullYear();
            var forecastInfo = document.createElement("h4");
                forecastInfo.innerText = fMonth + "/" + fDay + "/" + fYear;
                forecasts[i].append(forecastInfo);
            var fIcon = document.createElement("img");
            fIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + data.list[forecastTime].weather[0].icon + ".png");
            forecasts[i].append(fIcon);
            var fTemp = document.createElement("p");
            fTemp.innerHTML = "Temp: " + (Math.round(((data.list[forecastTime].main.temp - 273.15) * 9 / 5 + 32) * 100) / 100) + "°F";
            forecasts[i].append(fTemp);
            var fWind = document.createElement("p");
            fWind.innerHTML = "Wind: " + (Math.round(2.23694 * data.list[forecastTime].wind.speed * 100) / 100) + " mph";
            forecasts[i].append(fWind);
            var fHumidity = document.createElement("p");
            fHumidity.innerHTML = "Humidity: " + data.list[forecastTime].main.humidity + " %";
            forecasts[i].append(fHumidity);
        }
    },
    search2: function () {
        this.fetchForecast(document.querySelector(".search-bar").value);
    },
};

//This creates a function to listen fo the click on the search button 
//Which then goes into the VAR "currentWeather" and "forecast" then executes the "search" functions 
document.querySelector(".search-btn").addEventListener("click", function () {
    currentWeather.search ();
    forecast.search2 ();
});

//-------------------------------------------------------------------------------------------------------------------//
// //Recent history load and buttons below 

// const searchBar = document.querySelector("#searchBar") //cityInput
// const submitbtn = document.querySelector("#submit"); //submitBtn
// const cityRef = document.querySelector("#search-history"); //cityref
// var city;
// var cityName;
// var cities;

// submitbtn.addEventListener("click",searchHistory);


// function searchHistory() {
//     var newList = document.createElement("li");
//     var recentSearchBtn = document.createElement("button")
//     cityRef.appendChild(newList);
//     newList.appendChild(recentSearchBtn);
//     cityName = searchBar.val;
//     cities = (cityName);
//     recentSearchBtn.textContent = cityName;
//     localStorage.setItem("City",JSON.stringify(cities))
//     localStorage.getItem("City");
// }

   

//-----------------------------test------------------------------------------------------------------------------------------//
//For forecast
// // for (i=0; i<5; i++) {
        //     // const {date} = data.dt_text;
        //     // const {icon} = data.weather[0].icon;
        //     const {temp} = data.main;
        //     const {humidity} = data.main;
        //     const {speed} = data.wind;

        //     document.querySelector(".fDate" + i).innerText = date;
        //     document.querySelector(".icon" + i).src = "https://openweathermap.org/img/wn/"+ icon + ".png";
        //     document.querySelector(".fTemp" + i).innerText = temp + "°F";
        //     document.querySelector(".fWind" + i).innerText = "Wind Speed: " + speed + " mph";
        //     document.querySelector(".fHumidity" + i).innerText = "Humidity: " + humidity + "%";
        // };
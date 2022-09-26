//This displays the current date
var today = moment();
$("#todays-date").text(today.format("MMM Do, YYYY"));


//-----------------------------------------------------------------------------------------//

//When page first load it already has a city to show the weather from 
window.onload = function() { 
    startLoad.loadWeather ()}; 

let startLoad = {
    "apiKey": "fe350fcf1bdf0b9498e33816a7a5fca8",
    loadWeather: function (seattle) {
       fetch ("https://api.openweathermap.org/data/2.5/weather?q=seattle" 
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


//-------------------------------------------------------------------------------------------------//
//This creates a function to listen fo the click on the search button 
//Which then goes into the VAR "currentWeather" and executes the "search" function above

document.querySelector(".search-btn").addEventListener("click", function () {
    currentWeather.search ();
    forecast.search2 ();
});
//This function makes the call to the API
//Then runs the function to display it
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


//This creates a function to listen fo the click on the search button 
//Which then goes into the VAR "currentWeather" and executes the "search" function above
document.querySelector(".search-btn").addEventListener("click", function () {
    currentWeather.search ();
    forecast.search2 ();
});


//---------------------------------------------------------------------------------------------------------//
// 5-day weather forecast section
let forecast = {
    "apiKey": "fe350fcf1bdf0b9498e33816a7a5fca8",
    fetchForecast: function (city) {
        fetch ("https://api.openweathermap.org/data/2.5/forecast?q="
        + city
        + "&units=imperial&appid="
        + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayForecast(data));
    },

    displayForecast: function (data) {
        for (i=0; i<5; i++) {
            const {date} = data.dt_text;
            const {icon} = data.weather[0].icon;
            const {temp} = data.main;
            const {humidity} = data.main;
            const {speed} = data.wind;

            document.querySelector(".fDate" + i).innerText = date;
            document.querySelector(".icon" + i).src = "https://openweathermap.org/img/wn/"+ icon + ".png";
            document.querySelector(".fTemp" + i).innerText = temp + "°F";
            document.querySelector(".fWind" + i).innerText = "Wind Speed: " + speed + " mph";
            document.querySelector(".fHumidity" + i).innerText = "Humidity: " + humidity + "%";
        };
    },
    search2: function () {
        this.fetchForecast(document.querySelector(".search-bar").value);
    },
};



//-----------------------------------------------------------------------------------------------------------//


const searchBar = document.querySelector("#searchBar") //cityInput
const submitbtn = document.querySelector("#submit"); //submitBtn
const cityRef = document.querySelector("#search-history"); //cityref
var city;
var cityName;
var cities;

submitbtn.addEventListener("click",searchHistory);


function searchHistory() {
    var newList = document.createElement("li");
    var recentSearchBtn = document.createElement("button")
    cityRef.appendChild(newList);
    newList.appendChild(recentSearchBtn);
    cityName = searchBar.val;
    cities = (cityName);
    recentSearchBtn.textContent = cityName;
    localStorage.setItem("City",JSON.stringify(cities))
    localStorage.getItem("City");


    // document.querySelector(".recent-searches").innerHTML = "";
    // for (i = 0; i <history.length; i++) {
    //     var li = document.createElement("li");
    //     var recentSearchBtn = document.createElement("button");
    //     recentSearchBtn.innerHTML = history[i];
    //     recentSearchBtn.append(li);
    //     recentSearchBtn.append(recentSearchBtn);
    //     recentSearchBtn.classList.add("recent-search-btn");

        // recentSearchBtn.addEventListener("click", currentWeather)
    }


    /**  fix this **/
//This is an extra feature that allow you to press enter when you search instead of having to press the search button every time 
//We add an event listener to "keyup" and give it a function of an "event"
//"If" the button pressed is equal to "Enter" then run the search function
// document.querySelector(".search-bar").addEventListener("keyup", function (event) {
//     if (event.key == "Enter"); {
//         weather.search();
//     }
// });

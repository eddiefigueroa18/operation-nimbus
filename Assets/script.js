var today = moment();
$("#todays-date").text(today.format("MMM Do, YYYY"));

let weather = {
    "apiKey": "fe350fcf1bdf0b9498e33816a7a5fca8",
    fetchWeather: function (city) {
       fetch ("https://api.openweathermap.org/data/2.5/weather?q="
        + city 
        + "&units=imperial&appid=" 
        + this.apiKey)
       .then((response) => response.json())
       .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const {name} = data;
        const {icon} = data.weather[0];
        const {temp} = data.main;
        const {humidity} = data.main;
        const {speed} = data.wind;
        console.log(name, icon, temp, humidity, speed)
        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/"+ icon + ".png";
        document.querySelector(".temp").innerText = temp + "°F";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + " mph";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
    }
};


// weather.fetchWeather("tucson")
function formatDate(date) {
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${date.getHours()}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${date.getMinutes()}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Thursday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `Last updated: ${day}, ${hour}:${minutes}`;
}

let now = new Date();
let dateDisplayed = document.querySelector("#current-day");
dateDisplayed.innerHTML = formatDate(now);

function displayForcast(response) {
  console.log(response.data.daily);
  let forcastElement = document.querySelector("#forcast");
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  let forcastHTML = `<div class="row">`;

  days.forEach(function (day) {
    forcastHTML =
      forcastHTML +
      `<div class="col-2">
          <div class="day-of-week">
              ${day}<img id="week-images" src="images/sunny.png" />
            </div>
            <div class="forcast-temperatures">
              <span class="forcast-temp-max">28° </span
              ><span class="forcast-temp-min">19°</span>
            </div>
          </div>`;
  });
  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}

function getForecast(coordinates) {
  let apiKey = "d258a15b9cfd02450a6bca5a0ce192b2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForcast);
}

function displayWeatherConditions(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = Math.round(response.data.main.temp);

  getForecast(response.data.coord);
}
function search(city) {
  let key = "d258a15b9cfd02450a6bca5a0ce192b2";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;

  axios.get(url).then(displayWeatherConditions);
}
function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", submitCity);

function handlePosition(response) {
  let lat = response.coords.latitude;
  let long = response.coords.longitude;
  let key = "d258a15b9cfd02450a6bca5a0ce192b2";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeatherConditions);
}
let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(handlePosition)
);

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);

search("New York");

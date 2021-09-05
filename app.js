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

function calculateDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForcast(response) {
  let forcast = response.data.daily;

  let forcastElement = document.querySelector("#forcast");

  let forcastHTML = `<div class="row">`;

  forcast.forEach(function (forcastDay, index) {
    if (index < 6) {
      forcastHTML =
        forcastHTML +
        `<div class="col-2">
          <div class="day-of-week">
              ${calculateDay(
                forcastDay.dt
              )}<img id="week-images" src="http://openweathermap.org/img/wn/${
          forcastDay.weather[0].icon
        }@2x.png" />
            </div>
            <div class="forcast-temperatures">
              <span class="forcast-temp-max">${Math.round(
                forcastDay.temp.max
              )}° </span
              ><span class="forcast-temp-min">${Math.round(
                forcastDay.temp.min
              )}°</span>
            </div>
          </div>`;
    }
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

search("New York");

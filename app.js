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
  return `${day}, ${hour}:${minutes}`;
}

let now = new Date();
let dateDisplayed = document.querySelector("#current-day");
dateDisplayed.innerHTML = formatDate(now);

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
    response.data.weather[0].main;
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
  console.log(url);
  axios.get(url).then(displayWeatherConditions);
}
let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(handlePosition)
);
search("New York");

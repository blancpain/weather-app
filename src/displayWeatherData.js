import formatWeatherData from "./extractWeatherData";

const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector('input[type="text"]');
const locationTitle = document.querySelector(".location-title");
const currentTemperature = document.querySelector(".current-temp");
const weatherDescription = document.querySelector(".weather-description");
const feelsLike = document.querySelector(".feels-like");
const errorField = document.querySelector("#error-field");

export default async function displayWeatherData(location) {
  try {
    const weatherData = await formatWeatherData(location);
    errorField.textContent = "";
    locationTitle.textContent = weatherData.fullLocation;
    currentTemperature.textContent = `${weatherData.currentTemperature}°`;
    weatherDescription.textContent = weatherData.weatherDescription;
    feelsLike.textContent = `Feels like ${weatherData.temperatureFeelsLike}°`;
  } catch (err) {
    errorField.textContent =
      err.message === "Location not found."
        ? err.message
        : "Failed to connect to weather service.";
  }
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const location = searchInput.value;
  displayWeatherData(location);
});

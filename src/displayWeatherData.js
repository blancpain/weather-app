import formatWeatherData from "./extractWeatherData";

const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector('input[type="text"]');
const locationTitle = document.querySelector(".location-title");
const currentTemperature = document.querySelector(".current-temp");
const weatherDescription = document.querySelector(".weather-description");
const feelsLikeTemp = document.querySelector(".feels-like-temp");
const errorField = document.querySelector("#error-field");
const measureSwitcher = document.querySelector(".measure-switcher");

export default async function displayWeatherData(location) {
  try {
    const weatherData = await formatWeatherData(location);
    errorField.textContent = "";
    locationTitle.textContent = weatherData.fullLocation;
    currentTemperature.textContent = `${weatherData.currentTemperature}°`;
    weatherDescription.textContent = weatherData.weatherDescription;
    feelsLikeTemp.textContent = `${weatherData.temperatureFeelsLike}°`;
  } catch (err) {
    errorField.textContent =
      err.message === "Location not found."
        ? err.message
        : "Failed to connect to weather service.";
  }
}

function temperatureConverter(system, temp) {
  let convertedTemp;
  if (system === "C°") {
    convertedTemp = Number(temp) * (9 / 5) + 32;
  } else if (system === "F°") {
    convertedTemp = (Number(temp) - 32) * (5 / 9);
  }
  return convertedTemp.toFixed(0);
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const location = searchInput.value;
  displayWeatherData(location);
});

measureSwitcher.addEventListener("click", () => {
  const currentSystem = measureSwitcher.textContent;
  if (currentSystem.includes("C")) {
    const newCurrentTemperature = temperatureConverter(
      currentSystem,
      currentTemperature.textContent.slice(0, -1)
    );
    const newFeelsLikeTemperature = temperatureConverter(
      currentSystem,
      feelsLikeTemp.textContent.slice(0, -1)
    );
    currentTemperature.textContent = `${newCurrentTemperature}°`;
    feelsLikeTemp.textContent = `${newFeelsLikeTemperature}°`;
    measureSwitcher.textContent = "F°";
  } else {
    const newCurrentTemperature = temperatureConverter(
      currentSystem,
      currentTemperature.textContent.slice(0, -1)
    );
    const newFeelsLikeTemperature = temperatureConverter(
      currentSystem,
      feelsLikeTemp.textContent.slice(0, -1)
    );
    currentTemperature.textContent = `${newCurrentTemperature}°`;
    feelsLikeTemp.textContent = `${newFeelsLikeTemperature}°`;
    measureSwitcher.textContent = "C°";
  }
});

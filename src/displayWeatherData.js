import extractWeatherData from "./extractWeatherData";

const searchBtn = document.querySelector("#search-btn");
const searchInput = document.querySelector('input[type="text"]');
const weatherContainer = document.querySelector(".weather-container");
const testPara = document.createElement("p");
weatherContainer.appendChild(testPara);

export default async function displayWeatherData(location) {
  try {
    const weatherData = await extractWeatherData(location);
    testPara.textContent = weatherData.country;
  } catch (err) {
    testPara.textContent = "poop";
  }
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const location = searchInput.value;
  displayWeatherData(location);
});

import getData from "./fetchWeatherData";

export default async function formatWeatherData(location) {
  // using Promise.All to execute all in parallel
  const weatherData = await getData(location);

  if (weatherData.cod === "404") {
    throw new Error("Location not found.");
  }
  let [
    weatherDescription,
    currentTemperature,
    windSpeedMetric,
    temperatureFeelsLike,
    humidity,
    country,
    city,
  ] = await Promise.all([
    weatherData.weather[0].description,
    weatherData.main.temp,
    weatherData.wind.speed,
    weatherData.main.feels_like,
    weatherData.main.humidity,
    new Intl.DisplayNames(["en"], { type: "region" }).of(
      weatherData.sys.country
    ),
    weatherData.name,
  ]);

  weatherDescription =
    weatherDescription.charAt(0).toUpperCase() +
    weatherDescription.substring(1);
  const fullLocation = `${city}, ${country}`;
  currentTemperature = Math.trunc(currentTemperature);
  temperatureFeelsLike = Math.trunc(temperatureFeelsLike);
  humidity += "%";

  return {
    weatherDescription,
    currentTemperature,
    windSpeedMetric,
    temperatureFeelsLike,
    humidity,
    fullLocation,
  };
}

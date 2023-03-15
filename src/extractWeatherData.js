import getData from "./fetchWeatherData";

export default async function extractWeatherData(location) {
  try {
    // using Promise.All to execute all in parallel
    const weatherData = await getData(location);
    if (!weatherData) {
      throw new Error("Something went wrong. Please try again.");
    } else if (!weatherData.weather) {
      throw new Error("Unable to find location. Please try again.");
    }
    const [
      weatherDescription,
      currentTemperatureMetric,
      windSpeedMetric,
      temperatureFeelsLikeMetric,
      humidity,
      country,
    ] = await Promise.all([
      weatherData.weather[0].description,
      weatherData.main.temp,
      weatherData.wind.speed,
      weatherData.main.feels_like,
      weatherData.main.humidity,
      new Intl.DisplayNames(["en"], { type: "region" }).of(
        weatherData.sys.country
      ),
    ]);
    return {
      weatherDescription,
      currentTemperatureMetric,
      windSpeedMetric,
      temperatureFeelsLikeMetric,
      humidity,
      country,
    };
  } catch (err) {
    console.log(err.message);
  }
}

export default async function getData(location) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=f3283dc6489429f85319c9f78c856248&units=metric`,
    { mode: "cors" }
  );
  const weatherData = await response.json();
  return weatherData;
}

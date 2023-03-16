const loadingContainer = document.querySelector(".loading-container");

export default async function getData(location) {
  loadingContainer.classList.add("loading");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=f3283dc6489429f85319c9f78c856248&units=metric`;
  const response = await fetch(url, { mode: "cors" });
  const weatherData = await response.json();

  await new Promise((resolve) => setTimeout(resolve, 1000));
  loadingContainer.classList.remove("loading");

  return weatherData;
}

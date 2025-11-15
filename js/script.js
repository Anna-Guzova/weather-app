const API_KEY = "6e3fb5235f7153193457ad99619b4f4d";

document.getElementById("getWeatherBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Введіть назву міста!");
  getWeather(city);
});

async function getWeather(city) {
  const url = `https://weather-backend-peach-one.vercel.app/api/weather?city=${city}`;

  //https://weather-backend-peach-one.vercel.app/

  const res = await fetch(url);
  const data = await res.json();

  if (data.cod !== 200) {
    alert("Місто не знайдено, введіть назву англійською мовою");
    return;
  }

  document.getElementById("cityName").textContent = data.name;
  document.getElementById("temp").textContent = `${data.main.temp}°C`;
  document.getElementById("feel").textContent = data.main.feels_like + "°C";
  document.getElementById("humidity").textContent = data.main.humidity + "%";
  document.getElementById("description").textContent =
    data.weather[0].description;

  const sunrise = new Date(
    (data.sys.sunrise + data.timezone) * 1000
  ).toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });

  const sunset = new Date(
    (data.sys.sunset + data.timezone) * 1000
  ).toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" });

  document.getElementById("sunrise").textContent = sunrise;
  document.getElementById("sunset").textContent = sunset;

  const timestamp = data.dt;
  const timezone = data.timezone;
  const local = new Date((timestamp + timezone) * 1000).toLocaleTimeString(
    "uk-UA",
    { hour: "2-digit", minute: "2-digit" }
  );

  document.getElementById("time").textContent = local;

  const visKm = (data.visibility / 1000).toFixed(1);
  document.getElementById("visibility").textContent = visKm + " km";

  const windKmh = (data.wind.speed * 3.6).toFixed(1);
  document.getElementById("wind").textContent = windKmh + " km/h";
}

//visibility;
// `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=en`;
//api/weather?city=${city}

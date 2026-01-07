const apiKey = "fd613648e5da23a9e42ecce607814409";

function getWeather() {
  const city = document.getElementById("city").value;
  const weatherDiv = document.getElementById("weather");

  if (city === "") {
    weatherDiv.innerText = "Zadej název města 🌍";
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=cz&appid=${apiKey}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Město nenalezeno");
      }
      return response.json();
    })
.then(data => {
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const currentTime = data.dt;
  const sunrise = data.sys.sunrise;
  const sunset = data.sys.sunset;

  const isDay = currentTime >= sunrise && currentTime < sunset;
  document.body.className = isDay ? "day" : "night";

  // převod času z UNIX na normální čas
  function formatTime(timestamp) {
    return new Date(timestamp * 1000).toLocaleTimeString("cs-CZ", {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  weatherDiv.innerHTML = `
    <p><strong>${data.name}</strong></p>


    <p>🌡️ ${data.main.temp} °C</p>
    <img src="${iconUrl}" alt="Počasí">
    <p>${data.weather[0].description}</p>
    <p>💨 Vítr: ${data.wind.speed} m/s</p>

    <hr>

    <p>☀️ Východ slunce: ${formatTime(sunrise)}</p>
    <p>🌇 Západ slunce: ${formatTime(sunset)}</p>

    <p>${isDay ? "🌞 Den" : "🌙 Noc"}</p>
  `;
})
.catch(error => {
  weatherDiv.innerText = "Město nenalezeno ❌";
});
}

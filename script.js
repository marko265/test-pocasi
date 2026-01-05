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
      weatherDiv.innerHTML = `
        <p><strong>${data.name}</strong></p>
        <p>🌡️ ${data.main.temp} °C</p>
        <p>☁️ ${data.weather[0].description}</p>
        <p>💨 Vítr: ${data.wind.speed} m/s</p>
      `;
    })
    .catch(error => {
      weatherDiv.innerText = "Město nenalezeno ❌";
    });
}

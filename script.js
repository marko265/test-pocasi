const apiKey = "fd613648e5da23a9e42ecce607814409";

function getWeather() {

  const city = document.getElementById("city").value;

  if (city === "") {
    alert("Zadej město");
    return;
  }

  getCurrent(city);
  getForecast(city);
}


/* ===== AKTUÁLNÍ POČASÍ ===== */
function getCurrent(city) {

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=cz&appid=${apiKey}`)
    .then(res => {
      if (!res.ok) throw new Error("Město nenalezeno");
      return res.json();
    })
    .then(data => {

      const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      const html = `
        <div class="card">
          <strong>${data.name}</strong>
        </div>

        <div class="card" style="justify-content:center;">
          <img src="${icon}" style="width:70px">
        </div>

        <div class="card">
          🌡️ ${Math.round(data.main.temp)} °C
          (pocitově ${Math.round(data.main.feels_like)} °C)
        </div>

        <div class="card">
          ☁️ ${data.weather[0].description}
        </div>

        <div class="card">
          💨 Vítr: ${data.wind.speed} m/s
        </div>

        <div class="card">
          💧 Vlhkost: ${data.main.humidity} %
        </div>
      `;

      document.querySelector("#current .content").innerHTML = html;

    })
    .catch(err => {
      document.querySelector("#current .content").innerHTML =
        `<div class="card">❌ ${err.message}</div>`;
    });
}



/* ===== PŘEDPOVĚĎ ===== */
function getForecast(city) {

  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=cz&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {

      showHourly(data);
      showDaily(data);

    });
}


/* ===== 12 HODIN PO 2 HOD ===== */
function showHourly(data) {

  let html = "";

  for (let i = 0; i < 6; i++) {

    const item = data.list[i * 3]; // každé 3h → cca 2h interval

    const time = formatTime(item.dt);
    const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

    html += `
      <div class="card">
        <span>${time}</span>
        <img src="${icon}">
        <span>${Math.round(item.main.temp)} °C</span>
      </div>
    `;
  }

  document.querySelector("#hourly .content").innerHTML = html;
}


/* ===== 4 DNY ===== */
function showDaily(data) {

  let html = "";
  const used = [];

  data.list.forEach(item => {

    const date = new Date(item.dt * 1000).toLocaleDateString("cs-CZ");

    if (!used.includes(date) && used.length < 4) {

      used.push(date);

      const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;

      html += `
        <div class="card">
          <span>${date}</span>
          <img src="${icon}">
          <span>${Math.round(item.main.temp)} °C</span>
        </div>
      `;
    }

  });

  document.querySelector("#daily .content").innerHTML = html;
}


/* ===== FORMÁT ČASU ===== */
function formatTime(timestamp) {

  return new Date(timestamp * 1000).toLocaleTimeString("cs-CZ", {
    hour: "2-digit",
    minute: "2-digit"
  });

}

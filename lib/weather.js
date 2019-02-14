const baseURL = "https://api.openweathermap.org/data/2.5/weather?";
const apiKEY = "bdb6388afc707df65ac525f1e9cd8649";
const weatherLogoURL = "https://openweathermap.org/img/w/";
const randomImgURL = "https://loremflickr.com/600/400/";
const mainContainer = document.getElementById("main");
const units = "&units=metric";

const clean = () => {
  mainContainer.innerHTML = "";
};

const buildCard = (params) => {
  const date = new Date().toDateString("2019/01/01");
  const card = `
    <div class="card" style="background-image: linear-gradient(to bottom, rgba(0,0,0,0.60) 0%,rgba(0,0,0,0.3) 100%), url(${randomImgURL}${params.city_name})">
      <h1 class="location">${params.city_name}</h1>
      <h4 class="date">${date}</h4>
      <h3 class="weather">${params.state}</h3>
      <div class="description">
        <img src="${weatherLogoURL}${params.icon}.png" alt="">
        <p>${params.stateDescription}</p>
      </div>
      <div class="info">
        <p>Temp: ${params.temp} º</p>
        <p>Hum: ${params.humidity} %</p>
        <p>Min: ${params.min} º</p>
        <p>Max: ${params.max} º</p>
      </div>
    </div>
    `;
  clean();
  mainContainer.insertAdjacentHTML('beforeEnd', card);
};

const getWeather = (city) => {
  const url = `${baseURL}q=${city}${units}&appid=${apiKEY}`;
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      const params = {
        city_name: city,
        state: data.weather[0].main,
        stateDescription: data.weather[0].description,
        icon: data.weather[0].icon,
        temp: data.main.temp,
        humidity: data.main.humidity,
        min: data.main.temp_min,
        max: data.main.temp_max
      };
      buildCard(params);
    });
};

const getWeatherByCoords = () => {
  navigator.geolocation.getCurrentPosition((coords) => {
    const lat = coords.coords.latitude;
    const long = coords.coords.longitude;
    const url = `${baseURL}lat=${lat}&lon=${long}${units}&appid=${apiKEY}`;
    fetch(url)
      .then(response => response.json())
      .then((data) => {
        const params = {
          city_name: data.name,
          state: data.weather[0].main,
          stateDescription: data.weather[0].description,
          icon: data.weather[0].icon,
          temp: data.main.temp,
          humidity: data.main.humidity,
          min: data.main.temp_min,
          max: data.main.temp_max
        };
        buildCard(params);
      });
  });
};

export { getWeather, getWeatherByCoords };

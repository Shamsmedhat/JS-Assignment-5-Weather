const myWeather = new XMLHttpRequest();

myWeather.open(
  "GET",
  `https://api.weatherapi.com/v1/forecast.json?key=586fa5cce4ab4083ba6180857230108&q=London&days=3&aqi=no&alerts=no`
);

myWeather.send();
var allWeatherData = [];

// const allDays = [
//   {
//     Sun: "Sunday",
//     Mon: "Monday",
//     Tue: "Tuesday",
//     Wed: "Wednesday",
//     Thu: "Thursday",
//     Fri: "Friday",
//     Sat: "Saturday",
//   },
// ];
// console.log(allDays[0].Fri);
myWeather.addEventListener("readystatechange", function () {
  if (myWeather.status === 200 && myWeather.readyState === 4) {
    weatherDataRes = JSON.parse(myWeather.response);
    allWeatherData.push(weatherDataRes);
    displayWeather();
    Today();
    todayDate();
    forcastWetherSecDay();
    forcastWetherLastDay();
    // console.log(allWeatherData);
  }
});

function Today() {
  let date = allWeatherData[0].current.last_updated;
  let today = new Date(date).toDateString().slice(0, 3);
  document.querySelector(".dayAndDate h5").innerText = today;
}

function todayDate() {
  let currDate = allWeatherData[0].current.last_updated.slice(0, 10);
  let dateWithMounth = new Date(currDate).toDateString().slice(4, 10);
  document.querySelector(".dayAndDate span").innerText = dateWithMounth;
}

function displayWeather() {
  var firstlist = `
  <div class="dayAndDate d-flex justify-content-between">
  <h5></h5>
  <span></span>
</div>
<h4 class="fs-5 p-3 d-flex my-3">${allWeatherData[0].location.name}</h4>
<div class='firstDeg d-flex justify-content-evenly'>
<h2 >${allWeatherData[0].current.temp_c}ْ C</h2>
<img src="${allWeatherData[0].current.condition.icon}" alt="weatherDegree" />
</div>
<span class='d-flex p-3'>${allWeatherData[0].current.condition.text}</span>
<div class='weatherStatus d-flex justify-content-around my-3'>
<div>
<i class="fa-solid fa-umbrella me-2"></i><span>20%</span>
</div>
<div>
<i class="fa-solid fa-wind me-2 "></i><span>${allWeatherData[0].current.wind_kph}</span>
</div>
<div>
<i class="fa-solid fa-greater-than me-2"></i><span>East</span>
</div>
</div>`;

  document.getElementsByClassName("firstBox")[0].innerHTML = firstlist;
}

function forcastWetherSecDay() {
  // var fullNameDay = allDays[0];
  // if (secDay === fullNameDay.secDay) {
  // }
  let secDateMax = allWeatherData[0].forecast.forecastday[1];
  let secDay = new Date(secDateMax.date).toDateString().slice(0, 3);
  var secList = `
  <h5 >${secDay}</h5>
  <div class='boxTwo p-5'>
  <img src="${secDateMax.day.condition.icon}" alt="" />
  <h2 class='mt-4'>${secDateMax.day.maxtemp_c}ْ C </h2>
  <h4 class='fs-6 mb-4'>${secDateMax.day.mintemp_c}</h4>
  <span>${secDateMax.day.condition.text}</span>
  </div>`;
  document.querySelector(".forcastFirstBox").innerHTML = secList;
  // console.log(secDay);
}

function forcastWetherLastDay() {
  // var fullNameDay = allDays[0];
  // if (secDay === fullNameDay.secDay) {
  // }
  let lastDateMax = allWeatherData[0].forecast.forecastday[2];
  let lastDay = new Date(lastDateMax.date).toDateString().slice(0, 3);
  var lastList = `
  <h5>${lastDay}</h5>
  <div class='boxThree p-5'>
  <img  src="${lastDateMax.day.condition.icon}" alt="" />
  <h2 class='mt-4'>${lastDateMax.day.maxtemp_c} ْ C</h2>
  <h4 class='fs-6 mb-4'>${lastDateMax.day.mintemp_c}</h4>
  <span>${lastDateMax.day.condition.text}</span>
  </div>`;
  document.querySelector(".forcastSecBox").innerHTML = lastList;
  // console.log(secDay);
}

function updateWeatherData(city) {
  let url = `https://api.weatherapi.com/v1/forecast.json?key=586fa5cce4ab4083ba6180857230108&q=${city}&days=3&aqi=no&alerts=no`;

  let request = new XMLHttpRequest();
  request.open("GET", url);
  request.send();

  request.addEventListener("readystatechange", function () {
    if (request.status === 200 && request.readyState === 4) {
      allWeatherData = [];
      weatherDataRes = JSON.parse(request.response);
      allWeatherData.push(weatherDataRes);
      displayWeather();
      Today();
      todayDate();
      forcastWetherSecDay();
      forcastWetherLastDay();
    }
  });
}

const cityInput = document.querySelector(".form-control");
cityInput.addEventListener("input", function () {
  let city = cityInput.value;
  updateWeatherData(city);
});

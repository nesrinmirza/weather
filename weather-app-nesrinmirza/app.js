const form = document.querySelector(".form")
const cityname = document.querySelector(".input")
const degree = document.querySelector(".degree")
const city = document.querySelector(".city")
const icon = document.querySelector(".icon")
const cloudy = document.querySelector(".cloudy span")
const humidity = document.querySelector(".humidity span")
const wind = document.querySelector(".wind span")
const date = document.querySelector(".date")

let dayName =['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let day = dayName[new Date().getDay()];



window.addEventListener('load', () => {
    let long;
    let lat;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // Storing Longitude and Latitude in variables
        long = position.coords.longitude;
        lat = position.coords.latitude;
        const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=c7d905310cf881a8e2c6b114594ba51a&units=metric`;
  
        // Using fetch to get data
        fetch(base)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
           createElement(data)
          });
      });
    }
  });



form.addEventListener("submit", function(e){
    e.preventDefault()
    weather(cityname.value)
    cityname.value = ""
})

function weather(data) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data}&units=metric&appid=c7d905310cf881a8e2c6b114594ba51a`)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        createElement(data)
    })
}

const createElement = (genrData)=>{
    degree.innerText = parseInt(genrData.main.temp)
    degree.classList.add("symbol")
    city.innerText = genrData.name
    icon.src = `http://openweathermap.org/img/wn/${genrData.weather[0].icon}@2x.png`
    cloudy.innerText = genrData.clouds.all + '%'
    humidity.innerText = genrData.main.humidity + "%"
    wind.innerText = parseInt(genrData.wind.speed) + "km/h"
    date.innerText = day + "  " + new Date().toLocaleString()
}


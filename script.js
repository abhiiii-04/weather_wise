const userLocation = document.getElementById("userLocation"),
deg = document.getElementById("deg"),
weatherIcon = document.querySelector(".weatherIcon"),
temperature = document.querySelector(".temperature"),
feelsLike = document.querySelector(".feelsLike"),
description = document.querySelector(".description"),
date = document.querySelector(".date"),
city = document.querySelector(".city"),
HValue = document.getElementById("HValue"),
WValue = document.getElementById("WValue"),
SRValue = document.getElementById("SRValue"),
SSValue = document.getElementById("SSValue"),
CValue = document.getElementById("CValue"),
PValue = document.getElementById("PValue"),
weatherApp = document.querySelector(".weather-app"),
Forecast = document.querySelector(".Forecast");

const WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?&appid=aeaf2a170bb939355040e061700457e4&units=metric&exclude=minutely&q=`;
const WEATHER_DATA_ENDPOINT = `https://api.openweathermap.org/data/2.5/onecall?&appid=aeaf2a170bb939355040e061700457e4&units=metric&exclude=minutely`;

function findUserLocation() {
    fetch(WEATHER_API_ENDPOINT + userLocation.value)
        .then((response) => response.json())
        .then((data) => {
            if (data.cod !== 200) {
                alert(data.message);
                return;
            }
            
            city.innerHTML = data.name + " , " + data.sys.country;
            weatherIcon.style.background = `url(https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png)`;
            temperature.innerHTML = TemConverter(data.main.temp);
            feelsLike.innerHTML = " Feels Like " + data.main.feels_like;
            description.innerHTML = `<i class="fa-brands fa-cloudversify"></i> &nbsp;` + data.weather[0].description;
            
            const options = {
                weekday: "long",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            };
            date.innerHTML = getLongFormateDateTime(data.dt, data.timezone, options);
            
            HValue.innerHTML = Math.round(data.main.humidity) + "<span>%</span>";
            WValue.innerHTML = Math.round(data.wind.speed) + "<span>m/s</span>";
            const options1 = {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
            };
            SRValue.innerHTML = getLongFormateDateTime(data.sys.sunrise, data.timezone, options1);
            SSValue.innerHTML = getLongFormateDateTime(data.sys.sunset, data.timezone, options1);

            CValue.innerHTML = data.clouds.all + "<span>%</span>";
            PValue.innerHTML = data.main.pressure + "<span> hPa</span>";

            SLValue.innerHTML = data.main.sea_level + "<span> hPa</span>";
            GLValue.innerHTML = data.main.grnd_level + "<span> hPa</span>";
            VValue.innerHTML = data.visibility + "<span> meters</span>";
            
            // Change background based on weather
            const weatherCondition = data.weather[0].main.toLowerCase();
            weatherApp.className = 'weather-app'; // Reset class
            switch (weatherCondition) {
                case 'clear':
                    weatherApp.classList.add('sunny');
                    break;
                case 'rain':
                case 'drizzle':
                    weatherApp.classList.add('rainy');
                    break;
                case 'snow':
                    weatherApp.classList.add('snowy');
                    break;
                case 'clouds':
                    weatherApp.classList.add('cloudy');
                    break;
                default:
                    weatherApp.classList.add('spring');
            }
            
            console.log(data.daily);
        });
}

function formatUnixTime(dtValue, offSet, options = {}) {
    const date = new Date((dtValue + offSet) * 1000);
    return date.toLocaleTimeString([], { timeZone: "UTC", ...options });
}

function getLongFormateDateTime(dtValue, offSet, options) {
    return formatUnixTime(dtValue, offSet, options);
}

function TemConverter(temp) {
    let tempValue = Math.round(temp);
    let message = "";
    if (deg.value === "C") {
        message = tempValue + "<span>\xB0C</span>";
    } else {
        let ctof = (tempValue * 9) / 5 + 32;
        message = ctof + "<span>\xB0F</span>";
    }
    return message;
}

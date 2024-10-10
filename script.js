const input = document.getElementById("city-input");

window.onload = () => {
    input.value = "Barcelona";
    getWeatherData();
}

function fahrToCelsius(fahr) {
    return Math.floor((fahr - 32) / 1.8);
};

function assignIcon(outputName, icon) {
    switch (outputName) {
        case "snow":
            icon.src = "assets/snow.svg"
            break;
        case "rain":
            icon.src = "assets/rain.svg"
            break;
        case "fog":
            icon.src = "assets/fog.svg"
            break;
        case "wind":
            icon.src = "assets/wind.svg"
            break;
        case "cloudy":
            icon.src = "assets/cloudy.svg"
            break;
        case "partly-cloudy-day":
            icon.src = "assets/partly-cloudy-day.svg"
            break;
        case "partly-cloudy-night":
            icon.src = "assets/partly-cloudy-night.svg"
            break;
        case "clear-day":
            icon.src = "assets/clear-day.svg"
            break;
        case "clear-night":
            icon.src = "assets/clear-night.svg"
            break;
        case "snow-showers-night":
            icon.src = "assets/extreme-night-snow.svg"
            break;
        case "thunder-rain":
            icon.src = "assets/thunderstorms-rain.svg"
            break;
        case "thunder-showers-day":
            icon.src = "assets/thunderstorms-day-rain.svg"
            break;
        case "thunder-showers-night":
            icon.src = "assets/thunderstorms-night-rain.svg"
            break;
        case "showers-day":
            icon.src = "assets/rain.svg"
            break;
        case "showers-night":
            icon.src = "assets/rain.svg"
            break;
        default:
            icon.src = "assets/clear-day.svg";
            break;
        }
    };

async function getWeatherData() {
    let city = input.value
    let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=SBT2PTJB3ASMEVTUST7UJU9GH`, {
        mode: 'cors'
      });
    let rawData = await response.json();
    displayInfo(rawData);
};

function displayInfo(rawData) {

    console.log(rawData)

    const mainIcon = document.getElementById("main-icon");
    let iconWeather = rawData.currentConditions.icon;
    assignIcon(iconWeather, mainIcon);
    
    const mainTemp = document.getElementById("temperature");
    const fahrTemp = rawData.currentConditions.temp;
    mainTemp.textContent = fahrToCelsius(fahrTemp) + "ºC";

    const mainDesc = document.getElementById("short-description");
    mainDesc.textContent = rawData.currentConditions.conditions;

    const minTemp = document.getElementById("min-temperature-value");
    const fahrMinTemp = rawData.days[0].tempmin
    minTemp.textContent = fahrToCelsius(fahrMinTemp) + "ºC";

    const maxTemp = document.getElementById("max-temperature-value");
    const fahrMaxTemp = rawData.days[0].tempmin
    maxTemp.textContent = fahrToCelsius(fahrMaxTemp) + "ºC";

    const chanceRain = document.getElementById("chance-rain");
    chanceRain.textContent = rawData.currentConditions.precipprob + "%";

    const humidity = document.getElementById("humidity");
    humidity.textContent = rawData.currentConditions.humidity + "%";

    const wind = document.getElementById("wind");
    wind.textContent = rawData.currentConditions.windspeed + " km/h";

    const uvIndex = document.getElementById("uv-index");
    uvIndex.textContent = rawData.currentConditions.uvindex;

    const sunrise = document.getElementById("sunrise");
    sunrise.textContent = rawData.currentConditions.sunrise.substring(0, 5);

    const sunset = document.getElementById("sunset");
    sunset.textContent = rawData.currentConditions.sunset.substring(0, 5);

    const hourlyForecastTime = document.getElementsByClassName("hourly-time");
    const timeArray = Array.from(hourlyForecastTime);
    let hour = new Date().getHours();
    
    timeArray.forEach(function(time, i) {
        let hourElement = hour + i +1;
        if (hourElement < 24) {
            time.textContent = rawData.days[0].hours[hourElement].datetime.substring(0,2) + " H";
        } else {
            time.textContent = rawData.days[1].hours[hourElement - 24].datetime.substring(0,2) + " H";
        };
    });

    const hourlyForecastIcon = document.getElementsByClassName("hourly-icon");
    const iconArray = Array.from(hourlyForecastIcon);

    iconArray.forEach(function(hourIcon, i) {
        let hourElement = hour + i +1;
        if (hourElement < 24) {
            iconHourly = rawData.days[0].hours[hourElement].icon;
        } else {
            iconHourly = rawData.days[1].hours[hourElement - 24].icon;
        };
        assignIcon(iconHourly, hourIcon)
    });

    const dailyForecastIcon = document.getElementsByClassName("daily-icon");
    const iconDailyArray = Array.from(dailyForecastIcon);

    iconDailyArray.forEach(function(dayIcon, i) {
        let iconDaily = rawData.days[i+1].icon
        assignIcon(iconDaily, dayIcon);
    });

    const weekday = document.getElementsByClassName("weekday");
    const weekdayArray = Array.from(weekday);
    let day = new Date().getDay();
    const dayArray = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    weekdayArray.forEach(function(element, i) {
        element.textContent = dayArray[day + i];
    });

    const minTempDaily = document.getElementsByClassName("daily-min-temperature");
    const minTempDailyArray = Array.from(minTempDaily);

    minTempDailyArray.forEach(function(element, i) {
        let minTempEl = rawData.days[i].tempmin;
        element.textContent = fahrToCelsius(minTempEl);
    });

    const maxTempDaily = document.getElementsByClassName("daily-max-temperature");
    const maxTempDailyArray = Array.from(maxTempDaily);

    maxTempDailyArray.forEach(function(element, i) {
        let maxTempEl = rawData.days[i].tempmax;
        element.textContent = fahrToCelsius(maxTempEl);
    });
};

const userInput = input.addEventListener("change", getWeatherData)
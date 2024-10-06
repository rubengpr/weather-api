const input = document.getElementById("city-input");

window.onload = () => {
    input.value = "Barcelona";
    getWeatherData();
}

async function getWeatherData() {
    let city = input.value
    let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=SBT2PTJB3ASMEVTUST7UJU9GH`, {
        mode: 'cors'
      });
    let rawData = await response.json();
    displayInfo(rawData);
};

function displayInfo(rawData) {

    const mainTemp = document.getElementById("temperature");
    mainTemp.textContent = rawData.currentConditions.temp;

    const mainDesc = document.getElementById("short-description");
    mainDesc.textContent = rawData.currentConditions.conditions;

    const minTemp = document.getElementById("min-temperature-value");
    const maxTemp = document.getElementById("max-temperature-value");

    const chanceRain = document.getElementById("chance-rain");
    chanceRain.textContent = rawData.currentConditions.precipprob + "%";

    const humidity = document.getElementById("humidity");
    humidity.textContent = rawData.currentConditions.humidity + "%";

    const wind = document.getElementById("wind");
    wind.textContent = rawData.currentConditions.windspeed + " km/h";

    const uvIndex = document.getElementById("uv-index");
    uvIndex.textContent = rawData.currentConditions.uvindex;

    const sunrise = document.getElementById("sunrise");
    sunrise.textContent = rawData.currentConditions.sunrise;

    const sunset = document.getElementById("sunset");
    sunset.textContent = rawData.currentConditions.sunset;

    const hourlyForecastTime = document.getElementsByClassName("hourly-time");
    const timeArray = Array.from(hourlyForecastTime);
    
    timeArray.forEach(function(time, i) {
        time.textContent = rawData.days[i].hours[i].datetime + " pm";
    }
);

    const hourlyForecastIcon = document.getElementsByClassName("hourly-icon");
    const iconArray = Array.from(hourlyForecastIcon);

    iconArray.forEach(function(hourIcon, i) {
        let iconOutput = rawData.days[i].hours[i].icon
        assignIcon(iconOutput, hourIcon)
    }
);

    const mainIcon = document.getElementById("main-icon");
    let iconWeather = rawData.days[0].icon;
    assignIcon(iconWeather, mainIcon);

function assignIcon(outputName, icon) {
    switch (outputName) {
        case "snow":
            icon.src = "assets/snow.svg"
            break
        case "rain":
            icon.src = "assets/rain.svg"
            break
        case "fog":
            icon.src = "assets/fog.svg"
            break
        case "wind":
            icon.src = "assets/wind.svg"
            break
        case "cloudy":
            icon.src = "assets/cloudy.svg"
            break
        case "partly-cloudy-day":
            icon.src = "assets/partly-cloudy-day.svg"
            break
        case "partly-cloudy-night":
            icon.src = "assets/partly-cloudy-night.svg"
            break
        case "clear-day":
            icon.src = "assets/clear-day.svg"
            break
        case "clear-night":
            icon.src = "assets/clear-night.svg"
            break
        case "snow-showers-night":
            icon.src = "assets/extreme-night-snow.svg"
            break
        case "thunder-rain":
            icon.src = "assets/thunderstorms-rain"
            break
        case "thunder-showers-day":
            icon.src = "assets/thunderstorms-day-rain.svg"
            break
        case "thunder-showers-night":
            icon.src = "assets/thunderstorms-night-rain.svg"
            break
        case "showers-day":
            icon.src = "assets/rain.svg"
            break
        case "showers-night":
            icon.src = "assets/rain.svg"
            break
        }
    };


};

const userInput = input.addEventListener("change", getWeatherData)
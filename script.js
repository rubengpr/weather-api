const input = document.getElementById("city-input");
const deleteIcon = document.getElementById("delete-icon");
const settingsButton = document.getElementById("settings");
const tempUnit = document.getElementById("temp-unit");
const speedUnit = document.getElementById("speed-unit");

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
        try {
            let city = input.value;
            let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=SBT2PTJB3ASMEVTUST7UJU9GH`, {
                mode: 'cors'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            let rawData = await response.json();
            displayInfo(rawData);
        } catch (error) {
            console.error("Error fetching weather data:", error);
            displayError(`Failed to fetch weather data: ${error.message}`);
        }
    };

    function displayError(message) {
        const errorElement = document.getElementById('error-message');
        const modal = document.getElementById("modal");
        const closeModal = document.getElementById("close");
        errorElement.textContent = message;
        modal.style.display = "block";

        closeModal.addEventListener("click", function() {
            modal.style.display = "none";
        })
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
    const fahrMaxTemp = rawData.days[0].tempmax
    maxTemp.textContent = fahrToCelsius(fahrMaxTemp) + "ºC";

    const chanceRain = document.getElementById("chance-rain");
    chanceRain.textContent = rawData.days[0].precipprob + "%";

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
    let hour = Number(rawData.currentConditions.datetime.substring(0,2));
    
    timeArray.forEach(function(time, i) {
        let hourElement = hour + i + 1;
        if (hourElement < 24) {
            time.textContent = rawData.days[0].hours[hourElement].datetime.substring(0,2) + " H";
        } else {
            time.textContent = rawData.days[1].hours[hourElement - 24].datetime.substring(0,2) + " H";
        };
    });

    const hourlyForecastIcon = document.getElementsByClassName("hourly-icon");
    const iconArray = Array.from(hourlyForecastIcon);

    iconArray.forEach(function(hourIcon, i) {
        let hourElement = hour + i + 1;
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
        let iconDaily = rawData.days[i + 1].icon
        assignIcon(iconDaily, dayIcon);
    });

    const weekday = document.getElementsByClassName("weekday");
    const weekdayArray = Array.from(weekday);
    let day = new Date().getDay();
    const dayArray = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    weekdayArray.forEach(function(element, i) {
        element.textContent = dayArray[day + i + 1];
    });

    const minTempDaily = document.getElementsByClassName("daily-min-temperature");
    const minTempDailyArray = Array.from(minTempDaily);

    minTempDailyArray.forEach(function(element, i) {
        let minTempEl = rawData.days[i + 1].tempmin;
        element.textContent = fahrToCelsius(minTempEl);
    });

    const maxTempDaily = document.getElementsByClassName("daily-max-temperature");
    const maxTempDailyArray = Array.from(maxTempDaily);

    maxTempDailyArray.forEach(function(element, i) {
        let maxTempEl = rawData.days[i + 1].tempmax;
        element.textContent = fahrToCelsius(maxTempEl);
    });
};

function clearInput() {
    input.value = "";
    deleteIcon.style.display = "none";

}

function displayDeleteIcon() {
    if (input.value === "") {
        deleteIcon.style.display = "none";
    } else {
        deleteIcon.style.display = "block";
    };
}

function openSettings() {
    const dropdownMenu = document.getElementById("dropdown-menu");
        if (dropdownMenu.style.display === "none" || dropdownMenu.style.display === "") {
            dropdownMenu.style.display = "block";
        } else {
            dropdownMenu.style.display = "none";
    }
};

function toggleTemp(event) {
    if (event.target.textContent === "Celsius") {
        tempUnit.textContent = "Fahrenheit";
    } else {
        tempUnit.textContent = "Celsius";
    };
};

function toggleSpeed(event) {
    if (event.target.textContent === "km/h") {
        speedUnit.textContent = "mph";
    } else {
        speedUnit.textContent = "km/h";
    };
};

const userInput = input.addEventListener("change", getWeatherData);
const checkInputValue = input.addEventListener("input", displayDeleteIcon);
const clearInputValue = deleteIcon.addEventListener("click", clearInput);
const settingsOpen = settingsButton.addEventListener("click", openSettings);
const toggleTempUnit = tempUnit.addEventListener("click", toggleTemp);
const toggleTempSpeed = speedUnit.addEventListener("click", toggleSpeed);
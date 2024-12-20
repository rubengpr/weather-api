const body = document.body;
const input = document.getElementById("city-input");
const deleteIcon = document.getElementById("delete-icon");
const settingsButton = document.getElementById("settings");
const tempUnit = document.getElementById("temp-unit");
const speedUnit = document.getElementById("speed-unit");
const themeOption = document.getElementById("theme-option")
const dropdownMenu = document.getElementById("dropdown-menu");

window.onload = () => {
    input.value = "Barcelona";
    getWeatherData();

    setTimeout(() => {
        const loadingPage = document.getElementById("loading-page");
        const mainPage = document.getElementById("main-page");

        loadingPage.style.opacity = "0";

        mainPage.style.opacity = "1";

        setTimeout(() => {
            loadingPage.style.display = "none";
        }, 2000);
        
    }, 1000);
}


const celsiusToFahr = (celsius) => (celsius * 1.8) + 32;
const fahrToCelsius = (fahr) => (fahr - 32) / 1.8;
const kmhToMph = (kmh) => (kmh * kmh * 0.621371);
const mphToKmh = (mph) => (mph * 1.60934);


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

        closeModal.addEventListener("click", () => {
            modal.style.display = "none";
        })
    };
        

let mainTemp;
let fahrTemp;
let mainTempCelsius;
let fahrMinTemp;
let minTempCelsius;
let minTemp;
let fahrMaxTemp;
let maxTempCelsius;
let maxTemp;
let wind;
let minTempEl;
let minTempElCelsius;
let maxTempEl;
let maxTempElCelsius;
let minTempDaily;
let minTempDailyArray;
let maxTempDaily;
let maxTempDailyArray;
let windValueKmh;
let windValueMph;


function displayInfo(rawData) {

    console.log(rawData)

    const mainIcon = document.getElementById("main-icon");
    let iconWeather = rawData.currentConditions.icon;
    assignIcon(iconWeather, mainIcon);
    
    mainTemp = document.getElementById("temperature");
    fahrTemp = rawData.currentConditions.temp;
    mainTempCelsius = fahrToCelsius(fahrTemp);
    mainTemp.textContent = Math.floor(mainTempCelsius) + "ºC";

    const mainDesc = document.getElementById("short-description");
    mainDesc.textContent = rawData.currentConditions.conditions;

    minTemp = document.getElementById("min-temperature-value");
    fahrMinTemp = rawData.days[0].tempmin;
    minTempCelsius = fahrToCelsius(fahrMinTemp);
    minTemp.textContent = Math.floor(minTempCelsius) + "ºC";

    maxTemp = document.getElementById("max-temperature-value");
    fahrMaxTemp = rawData.days[0].tempmax
    maxTempCelsius = fahrToCelsius(fahrMaxTemp);
    maxTemp.textContent = Math.floor(fahrToCelsius(fahrMaxTemp)) + "ºC";

    const chanceRain = document.getElementById("chance-rain");
    chanceRain.textContent = rawData.days[0].precipprob + "%";

    const humidity = document.getElementById("humidity");
    humidity.textContent = rawData.currentConditions.humidity + "%";

    wind = document.getElementById("wind");
    windValueKmh = rawData.currentConditions.windspeed;
    windValueMph = Math.round(kmhToMph(windValueKmh) * 10) / 10;
    wind.textContent = windValueKmh + " km/h";

    const uvIndex = document.getElementById("uv-index");
    uvIndex.textContent = rawData.currentConditions.uvindex;

    const sunrise = document.getElementById("sunrise");
    sunrise.textContent = rawData.currentConditions.sunrise.substring(0, 5);

    const sunset = document.getElementById("sunset");
    sunset.textContent = rawData.currentConditions.sunset.substring(0, 5);

    const hourlyForecastTime = document.getElementsByClassName("hourly-time");
    const timeArray = Array.from(hourlyForecastTime);
    let hour = Number(rawData.currentConditions.datetime.substring(0,2));
    
    timeArray.forEach((time, i) => {
        let hourElement = hour + i + 1;
        if (hourElement < 24) {
            time.textContent = rawData.days[0].hours[hourElement].datetime.substring(0,2) + " H";
        } else {
            time.textContent = rawData.days[1].hours[hourElement - 24].datetime.substring(0,2) + " H";
        };
    });

    const hourlyForecastIcon = document.getElementsByClassName("hourly-icon");
    const iconArray = Array.from(hourlyForecastIcon);

    iconArray.forEach((hourIcon, i) => {
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

    iconDailyArray.forEach((dayIcon, i) => {
        let iconDaily = rawData.days[i + 1].icon
        assignIcon(iconDaily, dayIcon);
    });

    const weekday = document.getElementsByClassName("weekday");
    const weekdayArray = Array.from(weekday);
    let day = new Date().getDay();
    const dayArray = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    weekdayArray.forEach((element, i) => {
        element.textContent = dayArray[day + i + 1];
    });

    minTempDaily = document.getElementsByClassName("daily-min-temperature");
    minTempDailyArray = Array.from(minTempDaily);

    minTempDailyArray.forEach((element, i) => {
        minTempEl = rawData.days[i + 1].tempmin;
        minTempElCelsius = fahrToCelsius(minTempEl);
        element.textContent = Math.floor(minTempElCelsius);
    });

    maxTempDaily = document.getElementsByClassName("daily-max-temperature");
    maxTempDailyArray = Array.from(maxTempDaily);

    maxTempDailyArray.forEach((element, i) => {
        maxTempEl = rawData.days[i + 1].tempmax;
        maxTempElCelsius = fahrToCelsius(maxTempEl);
        element.textContent = Math.floor(maxTempElCelsius);
    });
};

const clearInput = () => {
    input.value = "";
    deleteIcon.style.display = "none";
}

const displayDeleteIcon = () => {
    if (input.value === "") {
        deleteIcon.style.display = "none";
    } else {
        deleteIcon.style.display = "block";
    };
}

const openSettings = () => {
        if (dropdownMenu.style.display === "none" || dropdownMenu.style.display === "") {
            dropdownMenu.style.display = "block";
        } else {
            dropdownMenu.style.display = "none";
    }
};

const toggleTemp = (event) => {
    if (event.target.textContent === "Celsius") {
        tempUnit.textContent = "Fahrenheit";
        mainTemp.textContent = Math.floor(mainTempCelsius) + "ºC";
        minTemp.textContent = Math.floor(minTempCelsius) + "ºC";
        maxTemp.textContent = Math.floor(maxTempCelsius) + "ºC";
        
        minTempDailyArray.forEach((element) => {
            const minTempDailyValue = element.textContent;
            element.textContent = Math.floor(fahrToCelsius(minTempDailyValue));
        });

        maxTempDailyArray.forEach((element) => {
            const maxTempDailyValue = element.textContent;
            element.textContent = Math.floor(fahrToCelsius(maxTempDailyValue));
        });

    } else {
        tempUnit.textContent = "Celsius";
        mainTemp.textContent = Math.floor(fahrTemp) + "ºF";
        minTemp.textContent = Math.floor(fahrMinTemp) + "ºF";
        maxTemp.textContent = Math.floor(fahrMaxTemp) + "ºF";
        
        minTempDailyArray.forEach((element) => {
            const minTempDailyValue = element.textContent;
            element.textContent = Math.floor(celsiusToFahr(minTempDailyValue));
        });

        maxTempDailyArray.forEach((element) => {
            const maxTempDailyValue = element.textContent;
            element.textContent = Math.floor(celsiusToFahr(maxTempDailyValue));
        });
    };


};

const toggleSpeed = (event) => {
    if (event.target.textContent === "km/h") {
        speedUnit.textContent = "mph";
        wind.textContent = windValueKmh + " km/h";
    } else {
        speedUnit.textContent = "km/h";
        wind.textContent = windValueMph + " mph";
    };
};

const toggleTheme = (event) => {
    if (event.target.textContent === "Dark mode") {
        event.target.textContent = "Light mode";
        body.classList.toggle("dark-mode");

        const themeIcon = document.getElementById("theme-icon");
        themeIcon.classList.toggle("fa-moon");
        themeIcon.classList.toggle("fa-lightbulb");
    } else {
        event.target.textContent = "Dark mode";
        body.classList.toggle("dark-mode");

        const themeIcon = document.getElementById("theme-icon");
        themeIcon.classList.toggle("fa-moon");
        themeIcon.classList.toggle("fa-lightbulb");
    }
};

input.addEventListener("change", getWeatherData);
input.addEventListener("input", displayDeleteIcon);

input.addEventListener("click", () => {
    input.select();
});

deleteIcon.addEventListener("click", clearInput);
settingsButton.addEventListener("click", openSettings);
tempUnit.addEventListener("click", toggleTemp);
speedUnit.addEventListener("click", toggleSpeed);
themeOption.addEventListener("click", toggleTheme);


window.addEventListener("click", (event) => {
    if (!dropdownMenu.contains(event.target) && !settingsButton.contains(event.target)) {
        dropdownMenu.style.display = "none";
    };
});
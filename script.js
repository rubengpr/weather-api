async function getWeatherData(event) {
    let city = event.target.value
    let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=SBT2PTJB3ASMEVTUST7UJU9GH`, {
        mode: 'cors'
      });
    let rawData = await response.json();
    displayInfo(rawData);
};

function displayInfo(rawData) {
    const outputBox = document.getElementById("output-box");

    outputBox.style.display = "flex";
    
    const icon = document.getElementById("icon");
    const description = document.getElementById("description");
    const temperature = document.getElementById("temperature");
    const humidity = document.getElementById("humidity");

    description.textContent = rawData.description;
    temperature.textContent = "Temperature: " + rawData.days[0].temp;
    humidity.textContent = "Humidity: " + rawData.days[0].humidity;

    let iconWeather = rawData.days[0].icon;

    switch (iconWeather) {
        case "clear-day":
            icon.src = "assets/sunny.svg"
            break;
        case "clear-night":
            icon.src = "assets/halfmoon.svg"
            break;
        case "cloudy":
            icon.src = "assets/cloudy.svg"
            break;
        case "thunder-showers-day":
            icon.src = "assets/thunderstorm.svg"
            break;
        case "partly-cloudy-night":
            icon.src = "assets/halfmoon.svg"
            break;
        case "partly-cloudy-day":
            icon.src = "assets/cloudy.svg"
            break;
    }


}

const userInput = document.getElementById("input").addEventListener("change", getWeatherData)
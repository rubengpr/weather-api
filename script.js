async function getWeatherData(event) {
    let city = event.target.value
    let response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=SBT2PTJB3ASMEVTUST7UJU9GH`, {
        mode: 'cors'
      });
    let rawData = await response.json();
    displayInfo(rawData);
};

function displayInfo(rawData) {
    const description = document.getElementById("description");
    const temperature = document.getElementById("temperature");
    const humidity = document.getElementById("humidity");

    description.textContent = rawData.description;
    temperature.textContent = rawData.days[0].temp;
    humidity.textContent = rawData.days[0].humidity;
}

const userInput = document.getElementById("input").addEventListener("change", getWeatherData)
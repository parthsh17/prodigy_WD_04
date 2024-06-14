document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  const locationInput = document.getElementById("location-input");
  const weatherInfo = document.getElementById("weather-info");

  const apiKey = "9212ac41d38e4b27a0d75616241406"; // Replace with your actual API key
  const baseUrl = "https://api.weatherapi.com/v1/forecast.json";

  searchBtn.addEventListener("click", () => {
    const location = locationInput.value.trim();  
    if (location === "") {
      alert("Please enter a location");
      return;
    }

    fetch(`${baseUrl}?key=${apiKey}&q=${location}&days=3`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // Clear previous weather info
        weatherInfo.innerHTML = "";

        // Display current weather
        const current = data.current;
        const currentWeather = `
                    <h2>Current Weather in ${data.location.name}, ${data.location.country}</h2>
                    <p>Temperature: ${current.temp_c}°C</p>
                    <p>Condition: ${current.condition.text}</p>
                    <p>Humidity: ${current.humidity}%</p>
                `;
        weatherInfo.innerHTML += currentWeather;

        // Display forecast for next 3 days
        const forecast = data.forecast.forecastday;
        forecast.forEach((day) => {
          const forecastWeather = `
                        <h2>${new Date(day.date).toDateString()}</h2>
                        <p>Max Temp: ${day.day.maxtemp_c}°C</p>
                        <p>Min Temp: ${day.day.mintemp_c}°C</p>
                        <p>Condition: ${day.day.condition.text}</p>
                    `;
          weatherInfo.innerHTML += forecastWeather;
        });
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data. Please try again later.");
      });
  });
});

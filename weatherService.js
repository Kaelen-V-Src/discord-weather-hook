const axios = require('axios');

async function fetchWeather(location, apiKey) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        const weather = response.data;
        return {
            temp: weather.main.temp,
            description: weather.weather[0].description,
            humidity: weather.main.humidity,
            windSpeed: weather.wind.speed,
        };
    } catch (error) {
        console.error('Error fetching weather:', error.message);
        return null;
    }
}

module.exports = { fetchWeather };
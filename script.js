const apiKey = "5547669027e8ca9629a0671605ee03d1"; 

document.getElementById('getWeather').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    const weatherDiv = document.getElementById('weather');

    if (!city) {
        weatherDiv.innerHTML = '<p>Kindly enter a city name before clicking search.</p>';
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Unable to find the city');
        }
        const data = await response.json();
        const { name, main, weather, wind } = data;

        const weatherCondition = weather[0].main.toLowerCase();
        const weatherDescription = weather[0].description;
        let weatherImage = '';

        switch (weatherCondition) {
            case 'clear':
                weatherImage = 'sunny.png'; 
                break;
            case 'haze':
                weatherImage = 'haze.png'; 
                break;
            case 'clouds':
                weatherImage = 'cloudy.png';
                break;
            case 'rain':
                weatherImage = 'rainy.png'; 
                break;
            case 'snow':
                weatherImage = 'snowy.png'; 
                break;
            case 'thunderstorm':
                weatherImage = 'thunderstorm.png'; 
                break;
            case 'drizzle':
                weatherImage = 'drizzle.png'; 
                break;
            case 'mist':
                weatherImage = 'mist.png';
                break;
            case 'fog':
                weatherImage = 'foggy.png';
                break;
            default:
                weatherImage = 'default.png'; 
        }

        weatherDiv.innerHTML = 
           `<h2>${name}</h2>
            <img src="${weatherImage}" alt="${weatherCondition}" style="width: 100px; height: 100px;">
            <p style="text-transform: capitalize;">Weather: ${weatherDescription}</p>
            <p>Temperature: ${main.temp}°C</p>
            <p>Humidity: ${main.humidity}%</p>
            <p>Wind Speed: ${wind.speed} m/s</p>
        `;
    } catch (error) {
        weatherDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});



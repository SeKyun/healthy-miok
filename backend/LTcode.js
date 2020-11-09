router.get('/boardPage/weather', async function(req, res, next) {
    const weatherApiCall = await weatherApiControllers.weatherApiCall();
    res.json(weatherApiCall);
    });

const weatherApi = () => {
    const weather = async (cityTranslationData) => {
    console.log("cityTranslationData",cityTranslationData);
    const url = https://api.openweathermap.org/data/2.5/weather?q=${cityTranslationData.translation}&appid=d9583df922854c83ea691112930d7197&units=metric&lang=kr;
    const r = await axios.get(url);
    const weatherData = r.data;
    return weatherData;
    }
    
    const weatherApiSeparation = async (weatherData) => {
        const data = {
            name: weatherData.name,
            main: weatherData.weather[0].main,
            description: weatherData.weather[0].description,
            temp: weatherData.main.temp,
            feels_like: weatherData.main.feels_like,
            temp_min: weatherData.main.temp_min,
            temp_max: weatherData.main.temp_max,
            speed: weatherData.wind.speed,
            deg: weatherData.wind.deg,
            country: weatherData.sys.country,
            humidity: weatherData.main.humidity,
            clouds: weatherData.clouds.all,
        }
        return data;
    }
    
    const cityTranslation = async (city) => {
        const cityTranslationData = await papagoController.papagoApiCall(city);
        return cityTranslationData;
    }
    
    const weatherApiCall = async (city) => {
        console.log("city",city);
        const cityTranslationData = await cityTranslation(city);
        console.log("asdasddasd",cityTranslationData);
        const weatherData = await weather(cityTranslationData);
        const weatherApiSeparationData = await weatherApiSeparation(weatherData);
        console.log(weatherData);
        const data = {
            weatherApiSeparationData: weatherApiSeparationData,
        }
        return data;
    }
    return {
        weatherApiCall: weatherApiCall,
    }
}

module.exports = weatherApi();
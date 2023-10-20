import {container, weatherDetails, weatherBox,errorBug,daysList,image,temperature,description,name,humidity,wind, informationAboutUniqueDays, todayButton} from "./main.js"
export function checkRespondStatus(response)
{
    let error = false;
    if (response.status === 404) {
        todayButton.style.display='none';
        todayButton.style.opacity='0';
        todayButton.style.scale='0';
        container.style.background="white"
        container.style.height = '400px';
        container.style.color='black'
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        daysList.style.display = 'none';
        errorBug.style.display = 'block';
        errorBug.style.opacity = '1';
        errorBug.style.scale = '1';
        errorBug.style.color = 'black';
        errorBug.classList.add('fadeIn');
        console.log(errorBug)
        error = true;
    }
    return error;
}
export function showingResult(json, day)
{
    todayButton.style.display='none';
    todayButton.style.opacity='0';
    todayButton.style.scale='0';
    container.style.color="black"
    errorBug.style.display='none';
    errorBug.classList.remove('fadeIn');
    weatherBox.style.opacity = '1';
    weatherBox.style.scale = '1';
    weatherDetails.style.opacity = '1';
    weatherDetails.style.scale = '1';
    daysList.style.display = 'flex';

    switch(day.weather[0].main){
        case 'Clear':
            image.src='weather/clear.png';
            break;
        case 'Drizzle':
            image.src='weather/rain.png';
            break;
        case 'Rain':
            image.src='weather/rain.png';
            break;
        case 'Snow':
            image.src='weather/snow.png';
            break;
        case 'Clouds':
            image.src='weather/clouds.png';
            break;
        case 'Haze':
            image.src='weather/haze.png';
            break;
        default:
            image.src='';
    }
    temperature.innerHTML=`${Math.round(day.main.temp)}<span>°C</span>`;
    description.innerHTML=`${day.weather[0].description}`;
    humidity.innerHTML=`${day.main.humidity}%`;
    wind.innerHTML=`${parseInt(day.wind.speed)}Km/h`;
    name.innerHTML=`${json.city.name}`
    weatherBox.style.display='';
    weatherDetails.style.display='';
    weatherBox.classList.add('fadeIn');
    container.style.height='700px'
}
//json.list[index]
export function changingBackground(json, day){
    const temp = day.weather[0].description;
    switch(temp){
        case 'overcast clouds':
            container.style.background='url("weather/overcast_clouds.jpg")';
            container.style.color="white"
            break;
        case 'clear sky':
            container.style.background='url("weather/clear_sky.jpg")';
            container.style.color="white"
            break
        case 'scattered clouds':
            container.style.background='url("weather/scattered_clouds.jpg")';
            break
        case 'few clouds':
            container.style.background='url("weather/few_clouds.jpg")';
            container.style.color="white"
            break
        case 'light rain':
            container.style.background='url("weather/light_rain.jpg")';
            container.style.color="white"
            break
        case 'very heavy rain':
        case 'heavy rain':
            container.style.background='url("weather/heavy_rain.jpg")';
            container.style.color="white"
            break
        case 'broken clouds':
            container.style.background='url("weather/broken_clouds.jpg")'
            container.style.color="white"
            break
        case 'moderate rain':
            container.style.background='url("weather/light_rain.jpg")'
            container.style.color="white"
            break
        case 'light snow':
        case 'heavy snow':
        case 'snow':
            container.style.background='url("weather/snowing.jpg")'
            container.style.color="black"
            break
        case 'fog':
        case 'mist':
            container.style.background='url("weather/mist.jpg")'
            container.style.color="white"
            break
        default:
            container.style.background='url("weather/normal.jpg")';
            container.style.color="white"
    }
}
export function addingForecastDays(json){
    const today = new Date();
    const nextDaysData = json.list.slice(1);
    // console.log("nextDaysData:");
    // console.log(nextDaysData);
    // console.log("------------------");

    const uniqueDays = new Set();
    let count = 0;
    daysList.innerHTML = '';
    for (const dayData of nextDaysData) {
        const forecastDate = new Date(dayData.dt_txt);
        const dayAbbreviation = forecastDate.toLocaleDateString('en', { weekday: 'short' });
        const dayTemp = `${Math.round(dayData.main.temp)}°C`;

        if (!uniqueDays.has(dayAbbreviation) && forecastDate.getDate() !== today.getDate()) {
            uniqueDays.add(dayAbbreviation);
            informationAboutUniqueDays.add(dayData);
            const li = document.createElement('li');
            li.classList.add('forecast-day');
            li.innerHTML = `
                <span>${dayAbbreviation}</span>
                <span class="day-temp">${dayTemp}</span>
            `;

            li.addEventListener('click', () => {
                // console.log(dayData);
                showingResult(json, dayData);
                changingBackground(json, dayData);
                todayButton.style.display='flex';
                todayButton.style.opacity='1';
                todayButton.style.scale='1';
                todayButton.addEventListener('click',()=>{
                    todayButton.style.display='none';
                    todayButton.style.opacity='0';
                    todayButton.style.scale='0';
                    showingResult(json, json.list[0]);
                    changingBackground(json, json.list[0]);
                })
            });

            daysList.appendChild(li);

            count++;
        }

        if (count === 4) break;
    }
}

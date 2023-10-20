
export const container = document.querySelector('.container')
export  const search = document.querySelector('.search-wrapper .search input')
export const weatherBox = document.querySelector('.weather-box')
export const weatherDetails = document.querySelector('.weather-description')
export const errorBug = document.querySelector('.not-found')
export const daysList = document.querySelector('.days-list')

//////
export const image = document.querySelector('.weather-box img')
export const temperature = document.querySelector('.weather-box .temperature')
export const description = document.querySelector('.weather-box .description')
export const name = document.querySelector('.weather-box .name')
export const humidity = document.querySelector('.weather-description .humidity span')
export const wind = document.querySelector('.weather-description .wind span')
export const informationAboutUniqueDays = new Set();
export const todayButton = document.querySelector(".todayButton");

 import {checkRespondStatus,showingResult,changingBackground,addingForecastDays} from "./logic_functions.js";

search.addEventListener('keydown',function (event){
    // console.log(event.code)
    if (event.keyCode === 13) {
        event.preventDefault();
        const APIKey = '08558fea855a3fe54e4bc6f134a82ae9'
        const city = document.querySelector('.search-wrapper .search input').value
        if(city==='')
            return;
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`)
            .then(response => {
                if(checkRespondStatus(response)===true){
                    return ;
                }
                return response.json();
            })
            .then(json=>{
                // console.log(json)
                if(!json)return;
                showingResult(json,json.list[0]);

                changingBackground(json,json.list[0]);

                addingForecastDays(json);

            })

    }
})
import dayInOrder from './Components/day.js';
import darkMode from './Components/darkMode.js';

darkMode();

const apiKey = '5f916eca6fa7f042a148dfbdaef39e9f';

//instant weather
const description = document.querySelector('.instant-weather__description');
const temp = document.querySelector('.instant-weather__temp');

//hourly weather
const hour = document.querySelectorAll('.hourly-weather__hour');
const tempHour = document.querySelectorAll('.hourly-weather__temp');
const hourlyLogo = document.querySelectorAll('.hourly-weather__logo')

// weather by day
const day = document.querySelectorAll('.day-weather__day');
const minTemp = document.querySelectorAll('.day-weather__min-temp');
const maxTemp = document.querySelectorAll('.day-weather__max-temp');
const dayLogo = document.querySelectorAll('.day-weather__logo');

let resultsAPI;
//Geolocation activate
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        //console.log(position);
        let lon = position.coords.longitude;
        let lat = position.coords.latitude;
        callAPI(lon, lat)

    }, () => {
        alert(`Géolocatisation refusé, l'application ne peut pas fonctionner.`)
    })
}

function callAPI(lon, lat) {

    //fetch data in api
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=fr&units=metric&exclude=minutely&appid=${apiKey}`)
        // convert response to json
        .then((response) =>{
            return response.json();
        })
        .then((data) =>{
            console.log(data);

            resultsAPI = data;

            description.innerText = resultsAPI.current.weather[0].description;
            temp.innerHTML = Math.trunc(resultsAPI.current.temp) + '<span>°</span>';

            //retrieve time using Date constructor
            let currentTime = new Date().getHours();

            //Set hours in increments of 3
            for(let i = 0; i < hour.length; i++) {

                let hourIncr = currentTime + i * 3;
    
                if(hourIncr > 24) {
                    hour[i].innerText = hourIncr - 24 + 'h';
                } else if(hourIncr === 24) {
                    hour[i].innerText = "00 h"
                } else {
                    hour[i].innerText = hourIncr + 'h';
                }
            }

            //temp by hour
            for(let n = 0; n < tempHour.length; n++) {
                tempHour[n].innerHTML = Math.trunc(resultsAPI.hourly[n * 3].temp) + '<span>°</span>';

                hourlyLogo[n].src = `assets/${resultsAPI.hourly[n * 3].weather[0].icon}.png`;
            }

            //first three letters of days
            for(let x = 0; x < dayInOrder.length; x++) {
                day[x].innerText = dayInOrder[x].slice(0,3);
            }

            // min and max temp by day
            for(let m = 0; m < 7; m++){
                minTemp[m].innerHTML = Math.trunc(resultsAPI.daily[m].temp.min) + '<span>°</span>';
                maxTemp[m].innerHTML = Math.trunc(resultsAPI.daily[m].temp.max) + '<span>°</span>';
                dayLogo[m].src = `assets/${resultsAPI.daily[m].weather[0].icon}.png`;
            }
    })
} 


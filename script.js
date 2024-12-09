const MyAPI = "838605c3f9daea89b157310967505144";
const foreAPI = "1f866ef268c7ba6ce0fc085f799352ee";
var def;
const input = document.querySelectorAll('.callweather');
function searchCity(city){

    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${MyAPI}&units=metric`)
    .then(response => response.json());
}
function forecast(city){
    return fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${foreAPI}&units=metric`)
    .then(response => response.json());
}
    function weatherCondition(type){
        const images =['atmosphere2.png','clear2.png','clouds2.png','drizzle2.png','humidity2.png','snow2.png','thunderstorm2.png','windspeed2.png'];
        const imageMap = {
            'Atmosphere':0,'Clear':1,'Clouds':2,'Drizzle':3,'Humidity':4,'Snow':5,'Thunderstorm':6,'Windspeed':7
        };
        if(imageMap.hasOwnProperty(type)){
            document.querySelector('.weather-type').src = images[imageMap[type]];
        }
    }
    function setDefaultCity(){
        const defaultCity = "New York";
        searchCity(defaultCity)
        .then((def) => {
            document.querySelector('.city-name').innerText = def.name;
            const weatherType =def.weather[0].main;
            document.querySelector('.weather-type').innerText = weatherCondition(weatherType);
            document.querySelector('.temperature').innerText = def.main.temp;
            document.querySelector('.Humidity').innerText = `${def.main.humidity} %`;
            document.querySelector('.Windspeed').innerText = `${def.wind.speed} km/h`;
            console.log(def);
        }) 
    }
    window.onload = setDefaultCity;
    for(let i=0;i<input.length;i++){
        input[i].addEventListener('keypress',() =>{
            if(event.key === 'Enter'){
                var city = document.querySelector('#input-city');
        searchCity(city.value)
        .then((data) => {
                document.querySelector('.city-name').innerText = data.name;
                const weatherType =data.weather[0].main;
                document.querySelector('.weather-type').innerText = weatherCondition(weatherType);
                document.querySelector('.temperature').innerText = data.main.temp;
        })
        .catch(err => {
          console.log(err);
          alert('wrong city name or API issue');
        });
        city.value = '';
            }
    });
    }
    
for(let i=0;i<input.length;i++){
    input[i].addEventListener('keypress',() =>{
        if(event.key === 'Enter'){
            var city = document.querySelector('#input-city');
            forecast(city.value)
            .then((data) => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
                alert('wrong city name or API issue');
            })
        }
    });
}

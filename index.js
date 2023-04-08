let current = new Date();
let days = [
    "Sunday",
    "monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]
let day = days[current.getDay()];
let hours = current.getHours();
if( hours < 10 ){
    hours = `0${hours}`;
}
let minutes = current.getMinutes();
if ( minutes < 10 ){
    minutes = `0${minutes}`;
}
let currentTime = document.querySelector("#dayntime");
currentTime.innerHTML = `${day} ${hours} : ${minutes}`;

function displayWeather(response){
    console.log(response.data);
    document.querySelector("h2").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#description").innerHTML = response.data.weather[0].main;
}
function search(city){
    let apiKey = "645d010554ad9de36d3aed2874744589";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
}
function handleSubmit(event){
    event.preventDefault();
    let city = document.querySelector("#city-name").value;
    search(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function searchLocation(position){
    apiKey = "645d010554ad9de36d3aed2874744589";
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayWeather);
}
function displayCurrentLocation(event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", displayCurrentLocation);

search("New York");
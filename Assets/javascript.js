const list = document.querySelector('#city-list');
var newName = document.getElementById("city-input");
var cityName = document.getElementById("city-name");

function GetWeather(city) {

    cityName.innerHTML = "--"+city+"--";
    var searchList = [];
    var searchListFromStorage = localStorage.getItem("searchListFromStorage");
    console.log(searchListFromStorage);
    if(searchListFromStorage){
        searchList = JSON.parse(searchListFromStorage);
    }

fetch('https://api.openweathermap.org/data/2.5/forecast?q='+newName.value+'&appid=0dc90d293cea65afe29d4b8a579af5b0')
.then(response => response.json())
.then(data => {

    //The min and max values
    //Weather Api Icons
     for(let i = 0; i<5; i++){
        console.log(i);
        document.getElementById("day" + (i+1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1)+ "°";
        document.getElementById("day" + (i+1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
        document.getElementById("day" + (i+1) + "Humidity").innerHTML = "Humidity: " + Number(data.list[i].main.humidity).toFixed(2) + "%";
        document.getElementById("day" + (i+1) + "Wind").innerHTML = "Wind: " + Number(data.list[i].wind.speed).toFixed(2) + "m/s";
        document.getElementById("img" + (i+1)).src = "http://openweathermap.org/img/wn/"+
        data.list[i].weather[0].icon
        +".png";
    }
    //------------------------------------------------------------
    console.log(data)

    searchList.push(newName.value)

    localStorage.setItem("searchListFromStorage",  JSON.stringify(searchList));

    searchHistory(searchList);


})

.catch(err => alert(err))
}

function StandardScreen(){
    document.getElementById("city-input").defaultValue = "Chicago";
    GetWeather("Chicago");
}

//Getting and displaying the text for the upcoming five days of the week
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",];

//Function to get the correct integer for the index of the days array
function CheckDay(day){
    if(day + d.getDay() > 6){
        return day + d.getDay() - 7;
    }
    else{
        return day + d.getDay();
    }
}

    for(i = 0; i<5; i++){
        document.getElementById("day" + (i+1)).innerHTML = weekday[CheckDay(i)];
    }

function searchHistory(history) {
    var historyList= document.getElementById("city-list");
    var emptyList= "";
    for (i = 0; i < history.length; i++){
        emptyList += `<li onclick="GetWeather()" data-city=${history[i]}>${history[i]}</li>`
    }
    historyList.innerHTML = emptyList;
}

function checkSearchHistory(){
    let history = localStorage.getItem
}

list.addEventListener('click', (event) => GetWeather(event.data.city));
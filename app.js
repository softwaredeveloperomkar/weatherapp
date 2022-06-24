let weather = {
    apiKey : "549b0987e7e420b4606ff84114e85f9a",
    fetchWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="+
            city +
            "&units=metric&appid="+
            this.apiKey )
            .then((response)=> response.json())
            .then((data)=> this.displayWeather(data))
            .catch(err => this.displayErr());
    },
    displayErr : function(){
        document.querySelector(".city").innerHTML = "Error... City Not Found";
        document.querySelector(".loader").style.display="none";
        document.querySelector(".toHide").style.visibility="visible";
    },
    displayWeather : function(data){
        const { name } =data;
        const { icon,description } =data.weather[0];
        const { temp, humidity} = data.main;
        const { speed } = data.wind;
        document.body.style.backgroundImage = "url(https://source.unsplash.com/random/?city,landscape" +name+")" ;
        document.querySelector(".city").innerHTML = "Weather in "+name;
        document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".temp").innerHTML = temp +" °C";
        document.querySelector(".details").innerHTML = description;
        document.querySelector(".humidity").innerHTML ="Humidity : "+ humidity +" %";
        document.querySelector(".wind").innerHTML ="Wind Speed : "+ speed +" km/hr";
        document.querySelector(".loader").style.display="none";
        document.querySelector(".weather").style.visibility="visible";
        document.querySelector(".toHide").style.visibility="visible";
    },
    search : function() {
        this.fetchWeather(document.querySelector(".searchBar").value);
    }
};

document.querySelector(".searchIcon").addEventListener("click",function(){
    weather.search();
    document.querySelector(".weather").style.visibility="hidden";
    document.querySelector(".loader").style.display="flex";
    document.querySelector(".toHide").style.visibility="hidden";
});
document.querySelector(".searchBar").addEventListener("keyup",function(e){
    if(e.key=="Enter"){
        weather.search();
        document.querySelector(".weather").style.visibility="hidden";
        document.querySelector(".loader").style.display="flex";
        document.querySelector(".toHide").style.visibility="hidden";
    }
});

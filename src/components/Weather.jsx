import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import Search_Icon from '../assets/search.png';
import Clear_Icon from '../assets/clear.png';
import Cloud_Icon from '../assets/cloud.png';
import Drizzle_Icon from '../assets/drizzle.png';
import Humidity_Icon from '../assets/humidity.png';
import Rain_Icon from '../assets/rain.png';
import Snow_Icon from '../assets/snow.png';
import Wind from '../assets/wind.png';
 

const Weather = () => {
    const inputRef= useRef()
    const[weatherData, setWeatherData]=useState(false);
    const allIcons={
        "01d":Clear_Icon,
        "01n":Clear_Icon,
        "02d":Cloud_Icon,
        "02n":Cloud_Icon,
        "03d":Cloud_Icon,
        "03n":Cloud_Icon,
        "04d":Drizzle_Icon,
        "04n":Drizzle_Icon,
        "09d":Rain_Icon,
        "09n":Rain_Icon,
        "10d":Rain_Icon,
        "10n":Rain_Icon,
        "13d":Snow_Icon,
        "13n":Snow_Icon
    }

    const search= async(city)=>{
        if(city==""){
            alert("Enter City Name");
            return;
        }
        try {
            const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const response= await fetch(url);
            const data = await response.json();
            if(!response.ok){
                
                // alert("city Not Found");
                alert(data.message);
                return;

            }
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || Clear_Icon;
            setWeatherData({
                humidity:data.main.humidity,
                windSpeed:data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location:data.name,
                icon:icon
            })
        } catch (error) {
            setWeatherData(false);
            console.error("Error Fetching Weather Data");
            
        }
    }
useEffect(()=>{
    search("London");
},[])

  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type='text' placeholder='Search'/>
            <img src={Search_Icon} onClick={()=>search(inputRef.current
                .value
            )} alt="" />
        </div>
        {weatherData?<><img src={weatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className="location">{weatherData.location}</p>
        <div className="weather-data">
                <div className="col">
                    <img src={Humidity_Icon} alt="" />
                    <div>
                        <p>91%</p>
                        <span>{weatherData.humidity}</span>
                    </div>
                </div>
                <div className="col">
                    <img src={Wind} alt="" />
                    <div>
                        <p>{weatherData.windSpeed}km/hr</p>
                        <span>Wind</span>
                    </div>
                </div>
              
                   
                
        </div>
        </>:
        <> </>}
        
    </div>
  )
}

export default Weather
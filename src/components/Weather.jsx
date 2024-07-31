
import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import {
  TiWeatherPartlySunny,
  TiWeatherStormy,
  TiWeatherSunny,
  TiWeatherCloudy,
  TiWeatherDownpour,
  TiWeatherShower,
} from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineWindPower } from "react-icons/md";
import { getApiData } from "../data";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null); // Initialize as null
  const inputRef = useRef();

  const AllIcons = {
    "01d": <TiWeatherSunny size={90} color="#FFFFCC" />,
    "01n": <TiWeatherSunny size={90} color="#FFFFCC" />,
    "02d": <TiWeatherDownpour size={90} color="#FFFFCC" />,
    "02n": <TiWeatherCloudy size={90} color="#FFFFCC" />,
    "03d": <TiWeatherStormy size={90} color="#FFFFCC" />,
    "03n": <TiWeatherStormy size={90} color="#FFFFCC" />,
    "04d": <TiWeatherPartlySunny size={90} color="#FFFFCC" />,
    "04n": <TiWeatherPartlySunny size={90} color="#FFFFCC" />,
    "09d": <TiWeatherShower size={90} color="#FFFFCC" />,
    "09n": <TiWeatherShower size={90} color="#FFFFCC" />,
    "10d": <TiWeatherDownpour size={90} color="#FFFFCC" />,
    "10n": <TiWeatherDownpour size={90} color="#FFFFCC" />,
    "13d": <TiWeatherPartlySunny size={90} color="#FFFFCC" />,
    "13n": <TiWeatherPartlySunny size={90} color="#FFFFCC" />,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getApiData("Buxar");
        const icon = AllIcons[data.weather[0].icon] || (
          <TiWeatherPartlySunny size={90} color="#FFFFCC" />
        );
        setWeatherData({
          humidity: data.main.humidity,
          windspeed: data.wind.speed,
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setWeatherData(null); // Clear data on error
      }
    };
    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const data = await getApiData(inputRef.current.value);
      const icon = AllIcons[data.weather[0].icon] || (
        <TiWeatherPartlySunny size={90} color="#FFFFCC" />
      );
      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null); // Clear data on error
    }
  };

  return (
    <div className="grid place-items-center p-10 bg-slate-400 rounded-lg">
      <div className="flex items-center gap-1 bg-white px-1 w-fit rounded">
        <input
          ref={inputRef}
          className="p-1 outline-none rounded"
          type="search"
          placeholder="Search..."
        />
        <button onClick={handleSearch}>
          <IoSearchOutline color="#737CA1" size={22} />
        </button>
      </div>
      <div className="">
        <div className="py-2">
          {weatherData ? (
            weatherData.icon
          ) : (
            <TiWeatherPartlySunny size={90} color="#FFFFCC" />
          )}
        </div>
        <p className="flex justify-center text-[#5453A6] text-2xl">
          {weatherData ? `${weatherData.temperature}°C` : "Loading..."}
        </p>
        <p className="flex justify-center text-[#6667AB] text-2xl">
          {weatherData ? weatherData.location : "Loading..."}
        </p>
      </div>
      <div className="flex justify-between items-center w-full py-2 text-[#d4d8d8]">
        <div>
          <div className="flex items-center gap-2">
            <WiHumidity color="#d3e3fd" size={30} />
            <p>{weatherData ? `${weatherData.humidity} %` : "Loading..."}</p>
          </div>
          <p>Humidity</p>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <MdOutlineWindPower color="#638ed4" size={22} />
            <p>
              {weatherData ? `${weatherData.windspeed} km/h` : "Loading..."}
            </p>
          </div>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
  );
};

export default Weather;

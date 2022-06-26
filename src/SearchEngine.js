import React, { useState } from "react";
import axios from "axios";

import "./SearchEngine.css";

export default function SearchEngine() {
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");

  function displayWeather(response) {
    console.log(response.data);
    setMessage(
      <div>
        <h2>Current weather in {city}:</h2>
        <ul>
          <li>Temperature: {Math.round(response.data.main.temp)}°F</li>
          <li>
            Description: <span>{response.data.weather[0].description}</span>
          </li>
          <li>Humidity: {response.data.main.humidity}%</li>
          <li>Wind: {Math.round(response.data.wind.speed)} mph</li>
          <li>
            <img
              src={`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`}
              alt={`${response.data.weather.description}`}
            />
          </li>
        </ul>
      </div>
    );
  }

  function callApi() {
    let units = "imperial";
    let apiKey = "59446b2366c35cbe45d81fb3e3545297";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeather);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (city.length >= 1) {
      callApi();
    } else {
      setMessage(<h2>Please type the name of a city.</h2>);
    }
  }

  function updateCity(event) {
    //console.log(event.target.value);
    setCity(event.target.value);
  }

  return (
    <div className="SearchEngine">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          onChange={updateCity}
          autoFocus={true}
          placeholder="Search for a city"
        />
        <input type="submit" value="Search" className="submit" />
      </form>
      {message}
      <footer>
        <p>
          <a
            href="https://github.com/AddyLopez/shecodesreact-weather-app-homework"
            title="To GitHub repository"
            target="_blank"
            rel="noreferrer"
          >
            Open-source code
          </a>{" "}
          by Addy López
        </p>
      </footer>
    </div>
  );
}

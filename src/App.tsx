import "./App.css";
import React, { useState, useEffect, useRef } from "react";
function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "44f6efc4d7bf5f85ca0b6e3f638b629a"; // Your API Key
  // Remplace par ta clé API

  const fetchWeather = async () => {
    if (!city) {
      setError("Veuillez saisir une ville !");
      return;
    }

    setError(""); // Réinitialiser les erreurs
    setWeather(null); // Réinitialiser les données météo

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}&lang=fr`
      );
      if (!response.ok) throw new Error("Ville introuvable !");
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <h1>Application Météo</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Entrez une ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Rechercher</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather">
          <h2>{weather.name}</h2>
          <p>
            <strong>Température :</strong> {weather.main.temp}°C
          </p>
          <p>
            <strong>Conditions :</strong> {weather.weather[0].description}
          </p>
          <p>
            <strong>Humidité :</strong> {weather.main.humidity}%
          </p>
        </div>
      )}
    </div>
  );
}

export default App;

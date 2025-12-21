import { useEffect, useState } from "react";

function Weather() {
    const [city, setCity] = useState("Kathmandu");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    const fetchWeather = () => {
        setError("");
        setWeather(null);

        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        )
            .then(res => {
                if (!res.ok) {
                    throw new Error("City not found");
                }
                return res.json();
            })
            .then(data => setWeather(data))
            .catch(() => setError("City not found"));
    };

    // Fetch weather when app starts
    useEffect(() => {
        fetchWeather();
    }, []);

    return (
        <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-gray-800 p-6 rounded-lg w-80 text-center">
                <h1 className="text-2xl font-bold mb-4">Weather App</h1>

                {/* City Input */}
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                    className="w-full p-2 mb-3 rounded text-black"
                />

                {/* Buttons */}
                <div className="flex gap-2 mb-4">
                    <button
                        onClick={fetchWeather}
                        className="flex-1 bg-blue-500 py-2 rounded hover:bg-blue-600"
                    >
                        Search
                    </button>

                    <button
                        onClick={fetchWeather}
                        className="flex-1 bg-green-500 py-2 rounded hover:bg-green-600"
                    >
                        Refresh
                    </button>
                </div>

                {/* Error */}
                {error && <p className="text-red-400">{error}</p>}

                {/* Weather Data */}
                {weather && (
                    <div>
                        <p className="text-lg">City: {weather.name}</p>
                        <p className="text-lg">Temp: {weather.main.temp}°C</p>
                        <p className="text-lg">{weather.weather[0].main}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Weather;

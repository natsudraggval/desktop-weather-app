import { useEffect, useState } from "react";
import spinner from "./assets/spinner.svg";

function Weather() {
    const [city, setCity] = useState("Kathmandu");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);

    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

    const fetchWeather = () => {
        setError("");
        setWeather(null);

        setLoading(true);

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
            .catch(() => setError("City not found"))
            .finally(() => setLoading(false));
    };

    // Fetch weather automatically when app starts
    useEffect(() => {
        fetchWeather();
    }, []);

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center text-white">
            <div className="w-130 rounded-3xl bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 px-10 py-8">
                {/* Search and refresh */}
                <div className="flex items-center gap-3 mb-6">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
                        placeholder="Search city..."
                        className="flex-1 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
                    />

                    <button
                        onClick={fetchWeather}
                        className="h-11 w-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-lg hover:bg-white/20"
                        title="Refresh"
                    >
                        ⟳
                    </button>
                </div>

                {/* Error */}
                {error && <p className="text-red-400 text-center mb-4">{error}</p>}

                {/* Loading */}
                {loading && (<div className="flex justify-center my-8">
                    <img
                        src={spinner}
                        alt="Loading..."
                        className="h-12 w-12"
                    />
                </div>)}


                {weather && !loading && (
                    <>
                        {/* Header */}
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h1 className="text-3xl font-semibold tracking-wide">
                                    {weather.name}
                                </h1>
                                <p className="text-sm text-white/60 mt-1">
                                    {new Date().toLocaleDateString("en-US", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                    })}
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-5xl font-light leading-none">
                                    {Math.round(weather.main.temp)}°
                                </p>
                                <p className="text-sm text-white/60 mt-1">
                                    {weather.weather[0].main}
                                </p>
                            </div>
                        </div>

                        {/* Main Weather */}
                        <div className="flex items-center justify-between mb-10">
                            <div className="text-7xl">
                                {weather.weather[0].main === "Clear" && "☀️"}
                                {weather.weather[0].main === "Clouds" && "☁️"}
                                {weather.weather[0].main === "Rain" && "🌧️"}
                                {weather.weather[0].main === "Snow" && "❄️"}
                            </div>
                            <div className="text-right">
                                <p className="text-sm uppercase tracking-wide text-white/60">
                                    Feels like
                                </p>
                                <p className="text-4xl font-semibold">
                                    {Math.round(weather.main.feels_like)}°
                                </p>
                            </div>
                        </div>

                        <div className="my-6 h-px bg-white/20"></div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-5 text-center">
                            <div className="rounded-2xl bg-white/10 py-5">
                                <p className="text-xs uppercase tracking-wide text-white/60">
                                    Humidity
                                </p>
                                <p className="text-2xl font-semibold mt-1">
                                    {weather.main.humidity}%
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white/10 py-5">
                                <p className="text-xs uppercase tracking-wide text-white/60">
                                    Wind
                                </p>
                                <p className="text-2xl font-semibold mt-1">
                                    {Math.round(weather.wind.speed * 3.6)} km/h
                                </p>
                            </div>

                            <div className="rounded-2xl bg-white/10 py-5">
                                <p className="text-xs uppercase tracking-wide text-white/60">
                                    Pressure
                                </p>
                                <p className="text-2xl font-semibold mt-1">
                                    {weather.main.pressure} hPa
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Weather;

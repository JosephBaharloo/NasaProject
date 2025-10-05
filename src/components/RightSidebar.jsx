import React, { useState, useEffect } from 'react';
import { Wind, Umbrella, CloudHail, Sun, Cloud, MapPin, Loader } from 'lucide-react';

const RightSidebar = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Get user's current location on mount
    useEffect(() => {
        getUserLocation();
    }, []);

    const getUserLocation = () => {
        setIsLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            setIsLoading(false);
            // Fallback to default location
            setDefaultLocation();
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherData(latitude, longitude);
            },
            (error) => {
                console.error('Geolocation error:', error);
                setError('Unable to get your location. Using default location.');
                setDefaultLocation();
            }
        );
    };

    const setDefaultLocation = () => {
        // Default to New York coordinates
        const defaultLat = 40.7128;
        const defaultLng = -74.0060;
        fetchWeatherData(defaultLat, defaultLng);
    };

    const fetchWeatherData = async (lat, lng) => {
        try {
            // Simulated weather API call - Replace with actual API
            // For now, using OpenWeatherMap-like structure
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulated weather data
            const mockWeatherData = {
                location: {
                    name: 'Current Location',
                    country: 'USA',
                    coordinates: { lat, lng }
                },
                current: {
                    temp: Math.floor(Math.random() * 27) + 59, // 59-86°F
                    feelsLike: Math.floor(Math.random() * 27) + 59,
                    wind: Math.floor(Math.random() * 20) + 5,
                    rain: Math.floor(Math.random() * 100),
                    speed: Math.floor(Math.random() * 30) + 10,
                    humidity: Math.floor(Math.random() * 40) + 40,
                    condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)]
                },
                nearbyLocations: [
                    {
                        name: 'Northeast Region',
                        country: 'USA',
                        temp: Math.floor(Math.random() * 27) + 50, // 50-77°F
                        condition: 'Sunny'
                    },
                    {
                        name: 'Midwest Region',
                        country: 'USA',
                        temp: Math.floor(Math.random() * 27) + 50,
                        condition: 'Cloudy'
                    },
                    {
                        name: 'Southern Region',
                        country: 'USA',
                        temp: Math.floor(Math.random() * 27) + 59, // 59-86°F
                        condition: 'Sunny'
                    }
                ]
            };

            setCurrentLocation(mockWeatherData.location);
            setWeatherData(mockWeatherData);
            setIsLoading(false);
        } catch (error) {
            console.error('Weather fetch error:', error);
            setError('Failed to fetch weather data');
            setIsLoading(false);
        }
    };

    const getWeatherIcon = (condition) => {
        switch (condition) {
            case 'Sunny':
                return <Sun className="w-6 h-6 text-yellow-400" />;
            case 'Cloudy':
            case 'Partly Cloudy':
                return <Cloud className="w-6 h-6 text-gray-400" />;
            case 'Rainy':
                return <Umbrella className="w-6 h-6 text-blue-400" />;
            default:
                return <Sun className="w-6 h-6" />;
        }
    };

    if (isLoading) {
        return (
            <aside className="w-80 glass-panel rounded-3xl p-6 hidden lg:flex flex-col gap-6 overflow-y-auto">
                <div className="flex flex-col items-center justify-center h-full gap-4">
                    <Loader className="w-12 h-12 animate-spin text-purple-400" />
                    <p className="text-gray-400">Loading weather data...</p>
                </div>
            </aside>
        );
    }

    if (error && !weatherData) {
        return (
            <aside className="w-80 glass-panel rounded-3xl p-6 hidden lg:flex flex-col gap-6 overflow-y-auto">
                <div className="flex flex-col items-center justify-center h-full gap-4">
                    <p className="text-red-400 text-center">{error}</p>
                    <button 
                        onClick={getUserLocation}
                        className="glass-panel-light px-4 py-2 rounded-full hover:bg-white/20 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </aside>
        );
    }

    return (
        <aside className="w-80 glass-panel rounded-3xl p-6 hidden lg:flex flex-col gap-6 overflow-y-auto">
            {/* Current Location Weather */}
            <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-purple-400" />
                    <h2 className="text-xl font-bold">{currentLocation?.name || 'Current Location'}</h2>
                </div>
                
                {error && (
                    <p className="text-xs text-yellow-400 mb-2">{error}</p>
                )}

                <p className="text-8xl font-bold">
                    {weatherData?.current.temp}
                    <span className="align-top text-4xl opacity-50">°F</span>
                </p>
                
                <p className="text-gray-300 mb-4">{weatherData?.current.condition}</p>

                <div className="flex justify-center gap-6 text-sm opacity-80 mt-2">
                    <span className="flex items-center gap-1">
                        <Wind className="w-4 h-4" />
                        {weatherData?.current.wind} mph
                    </span>
                    <span className="flex items-center gap-1">
                        <Umbrella className="w-4 h-4" />
                        {weatherData?.current.rain}%
                    </span>
                    <span className="flex items-center gap-1">
                        <CloudHail className="w-4 h-4" />
                        {weatherData?.current.speed}km/h
                    </span>
                </div>
            </div>

            {/* Nearby Locations */}
            <div className="flex flex-col gap-4">
                <h3 className="text-sm font-bold text-gray-400 uppercase">Nearby Regions</h3>
                {weatherData?.nearbyLocations.map((location, index) => (
                    <button 
                        key={index}
                        className="location-card glass-panel-light p-4 rounded-2xl flex justify-between items-center w-full text-left hover:bg-white/10 transition-colors"
                    >
                        <div>
                            <p className="text-sm text-gray-300">{location.country}</p>
                            <p className="font-bold">{location.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-xl font-bold">{location.temp}°</p>
                            {getWeatherIcon(location.condition)}
                        </div>
                    </button>
                ))}
            </div>
        </aside>
    );
};

export default RightSidebar;

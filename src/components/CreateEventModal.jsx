import React, { useState } from 'react';
import { X, Calendar, MapPin, Search, Cloud, Thermometer, Wind, Droplets, Sun, Gauge, Sparkles, LoaderCircle, Navigation } from 'lucide-react';
import ReactDOM from 'react-dom';
import LocationMap from './LocationMap';
import GeocodingService from '../services/geocodingService';

class EventFormData {
    constructor() {
        this.eventName = '';
        this.eventDate = new Date().toISOString().split('T')[0];
        this.location = { lat: null, lng: null, address: '' };
        this.weather = null;
    }

    setEventName(name) {
        this.eventName = name;
        return this;
    }

    setEventDate(date) {
        this.eventDate = date;
        return this;
    }

    setLocation(lat, lng, address) {
        this.location = { lat, lng, address };
        return this;
    }

    setWeather(weatherData) {
        this.weather = weatherData;
        return this;
    }

    isValid() {
        return this.eventName.trim() !== '' && this.eventDate !== '' && this.location.address !== '';
    }
}

class WeatherService {
    static async fetchWeatherForLocation(lat, lng, date) {
        // Simulated API call - Replace with actual backend call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        return {
            temperature: Math.floor(Math.random() * 15) + 15,
            windSpeed: Math.floor(Math.random() * 20) + 5,
            chanceOfRain: Math.floor(Math.random() * 100),
            uvIndex: Math.floor(Math.random() * 11),
            humidity: Math.floor(Math.random() * 40) + 40,
            recommendation: this.generateRecommendation()
        };
    }

    static generateRecommendation() {
        const recommendations = [
            "Perfect weather for outdoor activities! Don't forget sunscreen.",
            "Might want to bring an umbrella, there's a chance of rain.",
            "Great conditions for your event! Enjoy the pleasant weather.",
            "A bit windy, but overall good conditions for outdoor activities.",
            "Cool weather expected - dress in layers for comfort."
        ];
        return recommendations[Math.floor(Math.random() * recommendations.length)];
    }
}

const CreateEventModal = ({ isOpen, onClose, onCreateEvent }) => {
    const [formData] = useState(new EventFormData());
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [mapPosition, setMapPosition] = useState([39.8283, -98.5795]); // USA center
    const [coordinates, setCoordinates] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [isLoadingWeather, setIsLoadingWeather] = useState(false);
    const [aiRecommendation, setAiRecommendation] = useState('');

    const handleLocationSearch = async () => {
        if (!searchQuery.trim()) return;
        setIsSearching(true);
        try {
            const results = await GeocodingService.searchLocation(searchQuery);
            setSearchResults(results);
        } catch (error) {
            console.error('Search error:', error);
            alert('Failed to search location. Please try again.');
        } finally {
            setIsSearching(false);
        }
    };

    const handleSelectSearchResult = (result) => {
        setSelectedLocation(result.displayName);
        setMapPosition([result.lat, result.lng]);
        setCoordinates({ lat: result.lat, lng: result.lng });
        setSearchResults([]);
        setSearchQuery(result.name);
        formData.setLocation(result.lat, result.lng, result.displayName);
    };

    const handleMapClick = async (lat, lng) => {
        setCoordinates({ lat, lng });
        setMapPosition([lat, lng]);
        try {
            const locationData = await GeocodingService.reverseGeocode(lat, lng);
            setSelectedLocation(locationData.displayName);
            setSearchQuery(locationData.name);
            formData.setLocation(lat, lng, locationData.displayName);
        } catch (error) {
            console.error('Reverse geocoding error:', error);
            setSelectedLocation(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
        }
    };

    const handleUseCurrentLocation = async () => {
        setIsSearching(true);
        try {
            const location = await GeocodingService.getCurrentLocation();
            setSelectedLocation(location.displayName);
            setMapPosition([location.lat, location.lng]);
            setCoordinates({ lat: location.lat, lng: location.lng });
            setSearchQuery(location.name);
            formData.setLocation(location.lat, location.lng, location.displayName);
        } catch (error) {
            console.error('Current location error:', error);
            alert('Unable to get your current location. Please enable location permissions.');
        } finally {
            setIsSearching(false);
        }
    };

    const handleFetchWeather = async () => {
        if (!coordinates) {
            alert('Please select a location first');
            return;
        }
        setIsLoadingWeather(true);
        try {
            const weather = await WeatherService.fetchWeatherForLocation(coordinates.lat, coordinates.lng, eventDate);
            setWeatherData(weather);
            setAiRecommendation(weather.recommendation);
            formData.setWeather(weather);
        } catch (error) {
            console.error('Error fetching weather:', error);
        } finally {
            setIsLoadingWeather(false);
        }
    };

    const handleSubmit = () => {
        formData.setEventName(eventName).setEventDate(eventDate);
        if (!formData.isValid()) {
            alert('Please fill in all required fields');
            return;
        }
        onCreateEvent({
            name: eventName,
            date: new Date(eventDate),
            location: selectedLocation,
            weather: weatherData
        });
        handleClose();
    };

    const handleClose = () => {
        setEventName('');
        setEventDate(new Date().toISOString().split('T')[0]);
        setSearchQuery('');
        setSelectedLocation('');
        setSearchResults([]);
        setMapPosition([40.7128, -74.0060]);
        setCoordinates(null);
        setWeatherData(null);
        setAiRecommendation('');
        onClose();
    };

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="glass-panel rounded-3xl w-full max-w-7xl text-white border border-white/20 max-h-[90vh] flex flex-col">
                {/* Header - Fixed */}
                <div className="glass-panel-light rounded-t-3xl p-6 flex justify-between items-center border-b border-white/10 flex-shrink-0">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Calendar className="w-6 h-6" />
                        Create New Event
                    </h2>
                    <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Two Column Layout - Scrollable Content */}
                <div className="overflow-y-auto flex-1">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                        {/* LEFT COLUMN - INPUTS */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-purple-300">📝 Event Details</h3>
                            
                            {/* Event Name */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Event Name *</label>
                                <input
                                    type="text"
                                    value={eventName}
                                    onChange={(e) => setEventName(e.target.value)}
                                    placeholder="e.g., Beach Picnic, Mountain Hiking..."
                                    className="w-full bg-white/10 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-400"
                                />
                            </div>

                            {/* Date Selection */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Event Date *</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="date"
                                        value={eventDate}
                                        onChange={(e) => setEventDate(e.target.value)}
                                        className="w-full bg-white/10 p-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                                    />
                                </div>
                            </div>

                            {/* Location Search */}
                            <div>
                                <label className="block text-sm font-medium mb-2">Location *</label>
                                <div className="flex gap-2">
                                    <div className="flex-1 relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && handleLocationSearch()}
                                            placeholder="Search for a location..."
                                            className="w-full bg-white/10 p-3 pl-12 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 placeholder-gray-400"
                                        />
                                    </div>
                                    <button
                                        onClick={handleLocationSearch}
                                        disabled={isSearching}
                                        className="glass-panel-light px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-white/20 transition-colors disabled:opacity-50"
                                    >
                                        {isSearching ? <LoaderCircle className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                                    </button>
                                    <button
                                        onClick={handleUseCurrentLocation}
                                        disabled={isSearching}
                                        className="glass-panel-light px-4 py-3 rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50"
                                        title="Use my current location"
                                    >
                                        <Navigation className="w-5 h-5" />
                                    </button>
                                </div>
                                
                                {/* Search Results Dropdown */}
                                {searchResults.length > 0 && (
                                    <div className="mt-2 glass-panel-light rounded-lg border border-white/20 max-h-48 overflow-y-auto">
                                        {searchResults.map((result, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleSelectSearchResult(result)}
                                                className="w-full text-left p-3 hover:bg-white/20 transition-colors border-b border-white/10 last:border-b-0"
                                            >
                                                <div className="flex items-start gap-2">
                                                    <MapPin className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium truncate">{result.name}</p>
                                                        <p className="text-xs text-gray-400 truncate">{result.displayName}</p>
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {selectedLocation && (
                                    <div className="mt-2 p-3 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-green-400" />
                                        <span className="text-sm text-green-300 truncate">{selectedLocation}</span>
                                    </div>
                                )}
                            </div>

                            {/* Interactive Map */}
                            <div className="glass-panel-light rounded-2xl overflow-hidden" style={{ height: '350px' }}>
                                <LocationMap
                                    selectedPosition={mapPosition}
                                    onLocationSelect={handleMapClick}
                                    center={mapPosition}
                                    zoom={13}
                                />
                            </div>
                        </div>

                        {/* RIGHT COLUMN - OUTPUTS */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-bold text-pink-300">🌤️ Weather Forecast</h3>
                                <button
                                    onClick={handleFetchWeather}
                                    disabled={!coordinates || isLoadingWeather}
                                    className="glass-panel-light px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoadingWeather ? (
                                        <>
                                            <LoaderCircle className="w-4 h-4 animate-spin" />
                                            <span className="text-sm">Loading...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Cloud className="w-4 h-4" />
                                            <span className="text-sm">Get Weather</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {weatherData ? (
                                <div className="space-y-4">
                                    {/* Weather Stats Grid */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-white/10 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Thermometer className="w-4 h-4 text-red-400" />
                                                <span className="text-xs text-gray-300">Temperature</span>
                                            </div>
                                            <p className="text-2xl font-bold">{weatherData.temperature}°C</p>
                                        </div>
                                        
                                        <div className="bg-white/10 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Wind className="w-4 h-4 text-blue-400" />
                                                <span className="text-xs text-gray-300">Wind Speed</span>
                                            </div>
                                            <p className="text-2xl font-bold">{weatherData.windSpeed} km/h</p>
                                        </div>
                                        
                                        <div className="bg-white/10 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Droplets className="w-4 h-4 text-cyan-400" />
                                                <span className="text-xs text-gray-300">Chance of Rain</span>
                                            </div>
                                            <p className="text-2xl font-bold">{weatherData.chanceOfRain}%</p>
                                        </div>
                                        
                                        <div className="bg-white/10 rounded-lg p-3">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Sun className="w-4 h-4 text-yellow-400" />
                                                <span className="text-xs text-gray-300">UV Index</span>
                                            </div>
                                            <p className="text-2xl font-bold">{weatherData.uvIndex}</p>
                                        </div>
                                        
                                        <div className="bg-white/10 rounded-lg p-3 col-span-2">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Gauge className="w-4 h-4 text-purple-400" />
                                                <span className="text-xs text-gray-300">Humidity</span>
                                            </div>
                                            <p className="text-2xl font-bold">{weatherData.humidity}%</p>
                                        </div>
                                    </div>

                                    {/* AI Recommendation */}
                                    {aiRecommendation && (
                                        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4">
                                            <div className="flex items-start gap-3">
                                                <Sparkles className="w-5 h-5 text-yellow-300 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <h4 className="font-bold mb-1">Aura's Recommendation</h4>
                                                    <p className="text-sm text-gray-200">{aiRecommendation}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="glass-panel-light rounded-lg p-8 text-center text-gray-400">
                                    <Cloud className="w-16 h-16 mx-auto mb-3 opacity-50" />
                                    <p className="text-sm font-medium mb-1">No Weather Data Yet</p>
                                    <p className="text-xs">Select a location and click "Get Weather" to see forecast</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 p-6 pt-0 border-t border-white/10 mt-6">
                        <button
                            onClick={handleClose}
                            className="flex-1 bg-white/10 px-6 py-3 rounded-lg font-bold hover:bg-white/20 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!eventName || !selectedLocation}
                            className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Create Event
                        </button>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default CreateEventModal;

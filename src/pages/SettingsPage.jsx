import React from 'react';
import { Sparkles, Cloud, Calendar, MapPin, Users, Zap } from 'lucide-react';

const SettingsPage = () => (
    <div className="h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <Sparkles className="w-8 h-8 text-yellow-300" />
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        About WeatherWise
                    </h1>
                    <Sparkles className="w-8 h-8 text-yellow-300" />
                </div>
                <p className="text-gray-300 text-lg">
                    Your intelligent weather companion powered by AI
                </p>
            </div>

            {/* Main Description */}
            <div className="glass-panel-light rounded-3xl p-8 mb-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Cloud className="w-6 h-6 text-blue-400" />
                    What is WeatherWise?
                </h2>
                <p className="text-gray-200 leading-relaxed mb-4">
                    WeatherWise is an innovative weather planning application designed to help you make informed decisions about your outdoor events and activities. Combining real-time weather data with AI-powered insights, we provide you with personalized recommendations to ensure your events are perfectly planned.
                </p>
                <p className="text-gray-200 leading-relaxed">
                    Whether you're planning a beach picnic, a mountain hike, or a family gathering, WeatherWise gives you the confidence to schedule your events with accurate weather forecasts and intelligent recommendations from Aura, your AI weather assistant.
                </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="glass-panel-light rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                            <Sparkles className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold">AI-Powered Assistant</h3>
                    </div>
                    <p className="text-gray-300 text-sm">
                        Meet Aura, your intelligent weather companion that provides personalized activity recommendations based on weather conditions and your preferences.
                    </p>
                </div>

                <div className="glass-panel-light rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                            <Calendar className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold">Event Planning</h3>
                    </div>
                    <p className="text-gray-300 text-sm">
                        Create and manage events with integrated weather forecasts. Get real-time updates and plan your activities with confidence.
                    </p>
                </div>

                <div className="glass-panel-light rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-pink-500/20 rounded-lg">
                            <MapPin className="w-6 h-6 text-pink-400" />
                        </div>
                        <h3 className="text-xl font-bold">Location-Based Forecasts</h3>
                    </div>
                    <p className="text-gray-300 text-sm">
                        Choose from 24 major US cities and get accurate, location-specific weather data for your events and daily planning.
                    </p>
                </div>

                <div className="glass-panel-light rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                            <Zap className="w-6 h-6 text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold">Real-Time Updates</h3>
                    </div>
                    <p className="text-gray-300 text-sm">
                        Stay informed with live weather data, including temperature, wind speed, humidity, UV index, and precipitation forecasts.
                    </p>
                </div>
            </div>

            {/* Technology Section */}
            <div className="glass-panel-light rounded-3xl p-8 mb-6">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-yellow-400" />
                    Built With Modern Technology
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-4 bg-white/5 rounded-lg">
                        <p className="font-bold text-purple-400">React 19</p>
                        <p className="text-xs text-gray-400 mt-1">UI Framework</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg">
                        <p className="font-bold text-blue-400">Tailwind CSS</p>
                        <p className="text-xs text-gray-400 mt-1">Styling</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg">
                        <p className="font-bold text-pink-400">Gemini AI</p>
                        <p className="text-xs text-gray-400 mt-1">AI Assistant</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg">
                        <p className="font-bold text-green-400">Leaflet</p>
                        <p className="text-xs text-gray-400 mt-1">Interactive Maps</p>
                    </div>
                </div>
            </div>

            {/* Team/Project Info */}
            <div className="glass-panel-light rounded-3xl p-8 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <h2 className="text-2xl font-bold mb-3">NASA Space Apps Challenge 2025</h2>
                <p className="text-gray-300 leading-relaxed max-w-2xl mx-auto mb-4">
                    WeatherWise was developed as part of the NASA Space Apps Challenge, demonstrating how technology and data can be combined to create practical solutions for everyday planning and decision-making.
                </p>
                <p className="text-sm text-gray-400">
                    Made with ❤️ for weather-conscious planners everywhere
                </p>
            </div>

            {/* Version Info */}
            <div className="text-center mt-6 pb-6">
                <p className="text-xs text-gray-500">
                    Version 1.0.0 | © 2025 WeatherWise Team
                </p>
            </div>
        </div>
    </div>
);

export default SettingsPage;

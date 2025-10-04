import React, { useState } from 'react';
import { Sparkles, LoaderCircle } from 'lucide-react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../react-calendar.css'; // Özel stiller
import { callGeminiAPI } from '../services/geminiApi';
import { weatherData } from '../data/weatherData.jsx';

const events = [
    { date: new Date(2025, 9, 11), title: 'Hiking Trip' },
    { date: new Date(2025, 9, 26), title: "Anna's Wedding" },
    { date: new Date(2025, 10, 7), title: 'Camping' },
];

const EventsView = () => {
    const [ideas, setIdeas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState(new Date(2025, 9, 4));

    const handleGetIdeas = async () => {
        setIsLoading(true);
        const forecastString = Object.entries(weatherData['central-jakarta'].daily)
            .map(([day, data]) => `${day}: ${data.title} (${data.temp}°C)`)
            .join(', ');

        const systemInstruction = "You are Aura, a friendly and helpful AI weather assistant. Your personality is a bit witty and empathetic. Your goal is to give creative and practical activity ideas based on the weather.";
        const prompt = `Here is the upcoming weekly weather forecast: ${forecastString}. Based on this, suggest 3 fun and diverse activity ideas for the user. Present them as a list.`;

        const response = await callGeminiAPI(prompt, systemInstruction);
        setIdeas(response.split('\n').filter(idea => idea.length > 0));
        setIsLoading(false);
    };

    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const event = events.find(event =>
                event.date.getDate() === date.getDate() &&
                event.date.getMonth() === date.getMonth() &&
                event.date.getFullYear() === date.getFullYear()
            );
            if (event) {
                return (
                    <>
                        <div className="event-marker"></div>
                        <p className="event-title">{event.title}</p>
                    </>
                );
            }
        }
        return null;
    };

    return (
        <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-bold">My Events</h1>
                <button onClick={handleGetIdeas} disabled={isLoading} className="glass-panel-light px-4 py-2 rounded-full flex items-center gap-2 disabled:opacity-50">
                    {isLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-yellow-300" />}
                    {isLoading ? 'Generating...' : 'Get Activity Ideas'}
                </button>
            </div>
            <p className="text-gray-300 mb-6">Here are your upcoming events and Aura's personalized advice.</p>

            {ideas.length > 0 && (
                <div className="mb-6 glass-panel-light rounded-2xl p-4">
                    <h3 className="font-bold mb-2">Aura's Suggestions ✨</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-200">
                        {ideas.map((idea, index) => <li key={index}>{idea.replace(/^\* ?/g, '')}</li>)}
                    </ul>
                </div>
            )}

            <div className="flex-grow">
                <Calendar
                    onChange={setDate}
                    value={date}
                    tileContent={tileContent}
                    className="glass-panel-light rounded-2xl p-4 w-full h-full "
                />
            </div>
            <button className="mt-6 w-full glass-panel-light p-4 rounded-2xl font-bold hover:bg-white/20 transition-colors">Create New Event</button>
        </div>
    );
};

export default EventsView;

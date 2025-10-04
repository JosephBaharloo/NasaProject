import React from 'react';
import { Plus, Search, Bell, Sparkles } from 'lucide-react';
import ForecastChart from '../components/ForecastChart';

const DashboardView = ({ location, selectedDay, setSelectedDay, onAskAura }) => (
    <div className="flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
            <div>
                <p className="text-gray-300">Welcome</p>
                <h1 className="text-2xl font-bold">Calfin Danang</h1>
            </div>
            <div className="flex items-center gap-4">
                 <button onClick={onAskAura} className="glass-panel-light px-4 py-2 rounded-full flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-300" /> Ask Aura
                </button>
                <button className="glass-panel-light p-2 rounded-full"><Plus /></button>
                <button className="glass-panel-light p-2 rounded-full"><Search /></button>
                <button className="glass-panel-light p-2 rounded-full"><Bell /></button>
            </div>
        </div>
        <div className="flex-grow flex flex-col justify-between">
            <div>
                <h2 className="text-sm uppercase text-gray-300 mb-2">Weather Forecast</h2>
                <h3 className="text-5xl font-bold">{location.daily[selectedDay].title}</h3>
                <h3 className="text-5xl font-bold mb-4">{location.daily[selectedDay].subtitle}</h3>
                <p className="max-w-md text-gray-200 mb-6">{location.daily[selectedDay].desc}</p>
            </div>
            <div className="mb-6"><ForecastChart data={location.forecast} /></div>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 text-center">
                {Object.keys(location.daily).map(day => (
                    <button key={day} className={`day-selector glass-panel-light p-3 rounded-2xl flex flex-col items-center ${selectedDay === day ? 'active' : ''}`} onClick={() => setSelectedDay(day)}>
                        <span className="capitalize">{day.slice(0, 3)}</span>
                        <div className="my-2">{location.daily[day].icon}</div>
                        <span>{location.daily[day].temp}°</span>
                    </button>
                ))}
            </div>
        </div>
    </div>
);

export default DashboardView;

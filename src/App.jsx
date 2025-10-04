import React, { useState } from 'react';
import { weatherData } from './data/weatherData.jsx';
import LeftNav from './components/LeftNav';
import RightSidebar from './components/RightSidebar';
import DashboardView from './views/DashboardView';
import EventsView from './views/EventsView';
import SettingsView from './views/SettingsView';
import AuraModal from './components/AuraModal';

export default function App() {
    const [activeView, setActiveView] = useState('dashboard');
    const [selectedDay, setSelectedDay] = useState('wednesday');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = weatherData['central-jakarta'];

    const handleAskAura = () => {
        setIsModalOpen(true);
    }
    
    const weatherContextForAura = `Today is ${selectedDay}. The weather is '${location.daily[selectedDay].title} ${location.daily[selectedDay].subtitle}' with a temperature of ${location.daily[selectedDay].temp}°C. ${location.daily[selectedDay].desc}`;

    return (
        <>
            <div className="text-white h-screen w-screen p-4 flex gap-4">
                <LeftNav activeView={activeView} setActiveView={setActiveView} />
                <main className="flex-1 glass-panel rounded-3xl p-6 md:p-8 flex flex-col overflow-y-auto">
                    {activeView === 'dashboard' && <DashboardView location={location} selectedDay={selectedDay} setSelectedDay={setSelectedDay} onAskAura={handleAskAura} />}
                    {activeView === 'events' && <EventsView />}
                    {activeView === 'settings' && <SettingsView />}
                </main>
                <RightSidebar location={location} />
            </div>
            <AuraModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                weatherContext={weatherContextForAura}
            />
        </>
    );
}

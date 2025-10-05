import React from 'react';

const SettingsPage = () => (
    <div className="h-full">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-bold">Units</h2>
                <div className="mt-2 flex gap-4">
                   <button className="bg-white/20 px-4 py-2 rounded-lg">Celsius (°C)</button>
                   <button className="bg-black/20 px-4 py-2 rounded-lg">Fahrenheit (°F)</button>
                </div>
            </div>
            <div>
                <h2 className="text-lg font-bold">Aura's Personality</h2>
                 <p className="text-gray-300 text-sm mb-2">Choose how you'd like Aura to chat with you.</p>
                <div className="mt-2 flex gap-4">
                   <button className="bg-white/20 px-4 py-2 rounded-lg">Helpful & Friendly</button>
                   <button className="bg-black/20 px-4 py-2 rounded-lg">Just the Facts</button>
                   <button className="bg-black/20 px-4 py-2 rounded-lg">A Bit Witty</button>
                </div>
            </div>
        </div>
    </div>
);

export default SettingsPage;

import React from 'react';
import { Wind, Umbrella, CloudHail, Sun, Cloud } from 'lucide-react';

const RightSidebar = ({ location }) => (
    <aside className="w-80 glass-panel rounded-3xl p-6 hidden lg:flex flex-col gap-6 overflow-y-auto">
        <div className="text-center">
            <h2 className="text-xl font-bold">{location.name}</h2>
            <p className="text-8xl font-bold">{location.temp}<span className="align-top text-4xl opacity-50">°C</span></p>
            <div className="flex justify-center gap-6 text-sm opacity-80 mt-2">
                <span className="flex items-center gap-1"><Wind className="w-4 h-4" />{location.wind} mph</span>
                <span className="flex items-center gap-1"><Umbrella className="w-4 h-4" />{location.rain}%</span>
                <span className="flex items-center gap-1"><CloudHail className="w-4 h-4" />{location.speed}km/h</span>
            </div>
        </div>
        <div className="flex flex-col gap-4">
            <button className="location-card glass-panel-light p-4 rounded-2xl flex justify-between items-center w-full text-left">
                <div>
                    <p className="text-sm text-gray-300">Indonesia</p>
                    <p className="font-bold">North Jakarta</p>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-xl font-bold">12°</p><Sun />
                </div>
            </button>
            <button className="location-card glass-panel-light p-4 rounded-2xl flex justify-between items-center w-full text-left">
                <div>
                    <p className="text-sm text-gray-300">Indonesia</p>
                    <p className="font-bold">Bandung</p>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-xl font-bold">10°</p><Cloud />
                </div>
            </button>
            <button className="location-card glass-panel-light p-4 rounded-2xl flex justify-between items-center w-full text-left">
                <div>
                    <p className="text-sm text-gray-300">Indonesia</p>
                    <p className="font-bold">South Jakarta</p>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-xl font-bold">14°</p><Sun />
                </div>
            </button>
        </div>
    </aside>
);

export default RightSidebar;

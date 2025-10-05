import React from "react";
import { Plus, Search, Bell, Sparkles } from "lucide-react";
import ForecastChart from "../components/ForecastChart";
import { useOutletContext } from "react-router-dom";

const DashboardPage = () => {
  const { location, selectedDay, setSelectedDay, onAskAura } = useOutletContext();

  // Güvenli erişim / fallback'ler
  const daily = location?.daily || {};
  const forecast = location?.forecast || [];
  const dayKeys = Object.keys(daily);
  const currentDayKey = dayKeys.includes(selectedDay) ? selectedDay : dayKeys[0];

  const current = currentDayKey ? daily[currentDayKey] : null;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-300">Welcome</p>
          <h1 className="text-2xl font-bold">Calfin Danang</h1>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onAskAura}
            className="glass-panel-light px-4 py-2 rounded-full flex items-center gap-2"
            aria-label="Ask Aura"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" /> Ask Aura
          </button>
          <button className="glass-panel-light p-2 rounded-full" aria-label="Add">
            <Plus />
          </button>
          <button className="glass-panel-light p-2 rounded-full" aria-label="Search">
            <Search />
          </button>
          <button className="glass-panel-light p-2 rounded-full" aria-label="Notifications">
            <Bell />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <h2 className="text-sm uppercase text-gray-300 mb-2">Weather Forecast</h2>

          {/* Başlık ve açıklamalar güvenli şekilde */}
          <h3 className="text-5xl font-bold">{current?.title || "-"}</h3>
          <h3 className="text-5xl font-bold mb-4">{current?.subtitle || ""}</h3>
          <p className="max-w-md text-gray-200 mb-6">{current?.desc || ""}</p>
        </div>

        <div className="mb-6">
          <ForecastChart data={forecast} />
        </div>

        {/* Gün seçici */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-4 text-center">
          {dayKeys.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`glass-panel-light p-3 rounded-2xl flex flex-col items-center day-selector ${
                currentDayKey === day ? "active" : ""
              }`}
              aria-pressed={currentDayKey === day}
            >
              <span className="capitalize">{day.slice(0, 3)}</span>
              <div className="my-2">{daily[day]?.icon}</div>
              <span>{daily[day]?.temp ?? "-" }°</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
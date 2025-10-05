import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { weatherData } from "./data/weatherData.jsx";
import LeftNav from "./components/LeftNav";
import RightSidebar from "./components/RightSidebar";
import AuraModal from "./components/AuraModal";

export default function App() {
  // state
  const [selectedDay, setSelectedDay] = useState("wednesday");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // data
  const location = weatherData ? weatherData["central-jakarta"] : undefined;
  const daily = location && location.daily ? location.daily : {};
  const current = daily && selectedDay in daily ? daily[selectedDay] : undefined;

  // ask aura
  const handleAskAura = () => {
    setIsModalOpen(true);
  };

  // weather context (BACKTICK YOK, klasik string birleştirme)
  const weatherContextForAura = current
    ? "Today is " +
      selectedDay +
      ". The weather is '" +
      (current.title || "") +
      " " +
      (current.subtitle || "") +
      "' with a temperature of " +
      (current.temp != null ? current.temp : "") +
      "°C. " +
      (current.desc || "")
    : "Today is " +
      selectedDay +
      ". No detailed weather data found for this day.";

  return (
    <>
      <div className="text-white h-screen w-screen p-4 flex gap-4">
        <LeftNav />
        <main className="flex-1 glass-panel rounded-3xl p-6 md:p-8 flex flex-col overflow-y-auto">
          <Outlet
            context={{
              location: location,
              selectedDay: selectedDay,
              setSelectedDay: setSelectedDay,
              onAskAura: handleAskAura,
            }}
          />
        </main>
        <RightSidebar location={location} />
      </div>

      <AuraModal
        isOpen={isModalOpen}
        onClose={function () { setIsModalOpen(false); }}
        weatherContext={weatherContextForAura}
      />
    </>
  );
}
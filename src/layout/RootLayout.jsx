import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AuraModal from "../features/aura/AuraModal";

export default function RootLayout() {
  const [isAuraOpen, setIsAuraOpen] = useState(false);

  // İleride gerçek hava durumu verisini geçebilirsin
  const weatherContext = { city: "Kayseri", date: "2025-10-10" };

  // Outlet'e aktarılacak context
  const outletContext = {
    location: {
      daily: {},
      forecast: [],
    },
    selectedDay: "monday",
    setSelectedDay: () => {},
    onAskAura: () => setIsAuraOpen(true), // Ask Aura butonu bunu çağırır
  };

  return (
    <>
      <Outlet context={outletContext} />
      <AuraModal
        isOpen={isAuraOpen}
        onClose={() => setIsAuraOpen(false)}
        weatherContext={weatherContext}
      />
    </>
  );
}
import { CloudSun, Cloud, CloudLightning, CloudDrizzle, Sun, Wind, CloudSnow } from 'lucide-react';

export const weatherData = {
    "central-jakarta": {
        name: "Central Jakarta",
        temp: 10,
        wind: 19,
        rain: 40,
        speed: 15,
        daily: {
            sunday: { title: "Clear Skies", subtitle: "with Gentle Breeze", temp: 11, desc: "A beautiful sunny day with a gentle breeze from the west. Perfect for outdoor activities. Highs around 45°F.", icon: <CloudSun /> },
            monday: { title: "Cloudy", subtitle: "with Overcast Skies", temp: 13, desc: "Expect overcast skies throughout the day. A bit gloomy, but no rain expected. Temperatures will be mild.", icon: <Cloud /> },
            tuesday: { title: "Thunderstorms", subtitle: "in the Afternoon", temp: 14, desc: "A calm morning will give way to afternoon thunderstorms. It's best to stay indoors. Chance of rain is 80%.", icon: <CloudLightning /> },
            wednesday: { title: "Storm", subtitle: "with Heavy Rain", temp: 10, desc: "Partly cloudy with occasional snow showers. High around 50°F. Wind from the east 11 to 21 mph. Snow chance is 40%, with rainfall expected to be less than an inch.", icon: <CloudDrizzle /> },
            thursday: { title: "Sunny", subtitle: "and Very Warm", temp: 19, desc: "A perfect sunny day. Temperatures will be much warmer than usual. Great for a day at the beach.", icon: <Sun /> },
            friday: { title: "Windy", subtitle: "with Strong Gusts", temp: 12, desc: "Be prepared for strong winds throughout the day, with gusts reaching up to 40 mph. Secure any loose outdoor items.", icon: <Wind /> },
            saturday: { title: "Light Snow", subtitle: "in the Evening", temp: 8, desc: "Colder temperatures will bring light snow in the evening. Accumulation will be minimal, around 1 inch.", icon: <CloudSnow /> },
        },
        forecast: [11, 13, 14, 10, 19, 12, 8]
    }
};

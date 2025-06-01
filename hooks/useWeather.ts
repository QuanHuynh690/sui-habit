import { useEffect, useState } from "react";
// import { OPENWEATHER_API_KEY } from "@env";

export const useWeather = (date: Date, lat: number, lon: number) => {
  const [weather, setWeather] = useState<null | {
    icon: string;
    description: string;
    temp: number;
  }>(null);
  const [loading, setLoading] = useState(true);
  const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,current,alerts&appid=${OPENWEATHER_API_KEY}&units=metric`
        );
        const data = await res.json();
        console.log('res',res);
        console.log('data',data);
        
        // ✅ So sánh ngày chính xác theo UTC
        const matched = data.daily?.find((d: any) => {
          const forecast = new Date(d.dt * 1000);
          const selected = new Date(date);

          return (
            forecast.getUTCFullYear() === selected.getUTCFullYear() &&
            forecast.getUTCMonth() === selected.getUTCMonth() &&
            forecast.getUTCDate() === selected.getUTCDate()
          );
        });

        if (matched) {
          setWeather({
            icon: matched.weather[0].icon,
            description: matched.weather[0].description,
            temp: matched.temp.day,
          });
        } else {
          setWeather(null);
        }
      } catch (err) {
        console.error("Failed to fetch weather:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [date, lat, lon]);

  return { weather, loading };
};

// import { buttonVariants } from './components/ui/button';
import React, { useState } from 'react';
import Weather from './components/weather';
import WeatherForm from './components/weatherForm';
import { buttonVariants } from './components/ui/button';

function App() {
  const [location, setLocation] = useState('');
  const [endPoint, setEndPoint] = useState('');
  const [date, setDate] = useState('');
  const [days, setDays] = useState('');

  return (
    <>
      <header className="bg-purple-700 text-white sticky top-0 z-10 ml-0">
        <section className="max-w-4xl p-4 flex ">
          <h1 className="text-3xl font-medium">Weather API</h1>
        </section>
      </header>
      <main className="flex flex-col items-center  min-h-screen space-y-20 mt-10">
        <WeatherForm
          setLocation={setLocation}
          setEndPoint={setEndPoint}
          setDate={setDate}
          setDays={setDays}
        />
        <Weather
          location={location}
          endPoint={endPoint}
          date={date}
          days={days}
        />
      </main>
    </>
  );
}

export default App;

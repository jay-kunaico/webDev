import { log } from 'console';
import React, { useEffect, useState } from 'react';
// import dotenv from 'dotenv';

interface IWeatherProps {
  location: string;
}

const Weather: React.FunctionComponent<IWeatherProps> = ({ location }) => {
  console.log('weather location ', location);

  //   const [myData, setData] = useState('');
  const [response, setResponse] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const req = `/api?location=${encodeURI(location)}`;
      const res = await fetch(req);
      const data = await res.json();
      setResponse(data);
    }
    if (location) {
      fetchData();
    }
  }, [location]);
  //   console.log('response ', response?.location);

  //   return <pre>{JSON.stringify(response, null, 2)}</pre>;
  return (
    <figure className="my-12">
      <blockquote className="relative rounded-3xl bg-purple-300 py-12 pl-14 pr-12 dark:bg-black inline-block">
        <p className="mt-2 text-left text-2xl text-white before:absolute before:top-0 before:left-0 before:translate-x-2 before:translate-y-2 before:transform before:font-serif before:text-9xl before:text-white before:opacity-25  after:absolute after:-bottom-20 after:right-0 after:-translate-x-2 after:-translate-y-2 after:transform  after:text-white after:opacity-25  dark:text-slate-400 sm:text-3xl">
          City:{response?.location?.name}
        </p>
        <p>Current Temp: {response?.current?.temp_f}</p>
        <div className="flex items-center">
          <p className="mr-2">
            Current Temp: {response?.current?.condition.text}
          </p>
          <img
            src={response?.current?.condition.icon}
            alt={response?.current?.condition.text}
          />
        </div>
      </blockquote>
    </figure>
  );
};

export default Weather;

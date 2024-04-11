import React, { useEffect, useState } from 'react';
// import dotenv from 'dotenv';
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
></link>;
interface IWeatherProps {
  location: string;
  endPoint: string;
  date: string;
  days: string;
}

const Weather: React.FunctionComponent<IWeatherProps> = ({
  location,
  endPoint = 'current.json',
  date,
  days,
}) => {
  //   console.log('weather location ', location);
  //   console.log('weather endPoint ', endPoint);

  const [response, setResponse] = useState(null);
  const hour = new Date().getHours();
  // console.log('weather response ', response);
  // console.log('weather endPoint ', endPoint);
  // console.log('weather days ', days);

  useEffect(() => {
    async function fetchData() {
      const req = `/api?location=${encodeURI(
        location
      )}&endPoint=${endPoint}&dt=${date}&days=${days}`;
      const res = await fetch(req);
      const data = await res.json();
      setResponse(data);
    }
    fetchData();
  }, [location, endPoint, date, days]);
  const forecast = response;
  function formatDateString(dateString: string) {
    const date = new Date(dateString);
    // I will have to revist this, I don't know why the date was short by a day
    const timeZoneOffset = date.getTimezoneOffset() * 60 * 1000; // Convert offset to milliseconds
    const adjustedDate = new Date(date.getTime() + timeZoneOffset);

    return adjustedDate.toLocaleDateString(undefined, {
      timeZone: 'America/New_York', // should get the time zone of the user
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <>
      {response && !response.error && (
        <div className="my-12">
          <div className="flex items-center">
            <p className="mr-2 text-4xl">
              {response?.location?.name}, {response?.location?.region}
            </p>
          </div>
          {endPoint && endPoint === 'current.json' && !response.error && (
            <>
              <div className="flex items-center py-2">
                Current conditions as of:{' '}
                {new Date(response?.location?.localtime).toLocaleTimeString(
                  [],
                  {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  }
                )}
              </div>
              <div className="flex items-center">
                <span>
                  Temp: {response?.current?.temp_f} <span>&deg;</span>
                </span>
                <span className="mx-4">Feels like</span>{' '}
                <span>
                  {response?.current?.feelslike_f} <span>&deg;</span>
                </span>
              </div>

              <div className="flex items-center">
                {response?.current?.condition.text}
                <img
                  src={response?.current?.condition.icon}
                  alt={response?.current?.condition.text}
                />
              </div>
              <div className="flex items-center">
                <p>
                  Wind: <i className="fas fa-wind"></i>
                  {response?.current?.wind_dir} {response?.current?.wind_mph}{' '}
                  mph
                </p>
              </div>
              <div className="flex items-center py-4">
                Precip: {response?.current?.precip_in} in
              </div>
            </>
          )}
        </div>
      )}
      {endPoint && endPoint !== 'current.json' && !response.error && (
        <div class="max-w-screen-3xl mx-auto">
          <div class="grid grid-cols-5 gap-1 bg-white">
            <div class="text-2xl col-span-1 p-2 underline">Time</div>
            <div class="text-2xl col-span-1 p-2 underline">Avg Temp</div>
            <div class="text-2xl col-span-1 p-2 underline">Condition</div>
            <div class="text-2xl col-span-1 p-2 underline">Total Precip</div>
            <div class="text-2xl col-span-1 p-2 underline">Max Wind</div>
            <hr class="w-full col-span-5 border-gray-300" />
            <div className="col-span-5">
              {' '}
              Conditions for:
              {formatDateString(forecast?.forecast?.forecastday[0]?.date)}
            </div>
            {/* {forecast?.forecast?.forecastday[0].hour */}
            {forecast?.forecast?.forecastday.map((day, index) => (
              <>
                {index !== 0 && (
                  <p className="col-span-5">
                    Conditions for{' '}
                    {formatDateString(
                      forecast?.forecast?.forecastday[index]?.date
                    )}
                  </p>
                )}
                {day.hour
                  .slice(index === 0 && endPoint !== 'future.json' ? hour : 0)
                  .map((hour, index) => (
                    <React.Fragment key={index}>
                      <div className="col-span-1 p-2 text- flex items-center">
                        {new Date(hour.time).toLocaleTimeString([], {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </div>
                      <div className="col-span-1 p-2 text- flex items-center">
                        {hour.temp_f}°F
                      </div>
                      <div className="col-span-1 p-2 text- flex items-center">
                        <p>{hour.condition.text}</p>{' '}
                        <div className="flex-grow"></div>
                        <img
                          src={hour.condition.icon}
                          alt={hour.condition.text}
                          className="ml-2" // Apply margin to separate text and image
                        />
                      </div>
                      <div className="col-span-1 p-2 text- flex items-center pl-10">
                        {hour.precip_in} in
                      </div>
                      <div className="col-span-1 p-2 text- flex items-center pl-8">
                        {hour.wind_dir} {hour.wind_mph} mph
                      </div>
                      <hr className="w-full col-span-5 border-gray-300" />
                    </React.Fragment>
                  ))}
                {/* <hr className="w-full col-span-5 border-gray-300" /> */}
              </>
            ))}
          </div>
        </div>
      )}

      {/* <pre>{JSON.stringify(response, null, 2)}</pre> */}
    </>
  );
};

export default Weather;

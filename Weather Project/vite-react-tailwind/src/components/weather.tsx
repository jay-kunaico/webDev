import React, { useEffect, useState } from 'react';
// import dotenv from 'dotenv';
import Windsolid from '../assets/wind-solid.svg';
import Raindrops from '../assets/wi-raindrops.svg';
import Humidity from '../assets/wi-humidity.svg';
import Eyes from '../assets/eyes.png';
import UV from '../assets/uv-index.svg';

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
  const [response, setResponse] = useState(null);
  const forecast = response;
  const hour = new Date().getHours(); //used to display weather information from this hour forward.

  // Fetch the weather data from the server component (index.mjs)
  useEffect(() => {
    async function fetchData() {
      // construct the request URL
      const req = `/api?location=${encodeURI(
        location
      )}&endPoint=${endPoint}&dt=${date}&days=${days}`;
      // make request to server
      const res = await fetch(req);

      // convert the response into json and save it it in data
      const data = await res.json();

      // set the response to the data
      setResponse(data);
    }
    fetchData();
  }, [location, endPoint, date, days]);

  // format the date to be readable by living breathing humans
  function formatDateString(dateString: string) {
    const date = new Date(dateString);
    // I will have to revist this, I don't know why the date was short by a day
    const timeZoneOffset = date.getTimezoneOffset() * 60 * 1000; // Convert offset to milliseconds
    const adjustedDate = new Date(date.getTime() + timeZoneOffset);

    return adjustedDate.toLocaleDateString(undefined, {
      timeZone: response?.location?.tz_id,
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  return (
    <>
      {/* check if there is a response and not an error before displaying results */}
      {response && !response.error && (
        <div className="my-12 ml-4">
          <div className="flex items-center">
            <p className="mr-2 text-4xl">
              {response?.location?.name}, {response?.location?.region}
            </p>
          </div>

          {/* when the Current button was clicked */}
          {endPoint && endPoint === 'current.json' && !response.error && (
            <>
              <div className="flex items-center py-2 ">
                Current conditions as of:{' '}
                <div className="text-green-600 font-bold ml-2">
                  <span>
                    {new Date(response?.location?.localtime).toLocaleTimeString(
                      [],
                      {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      }
                    )}
                    <span className="ml-2">
                      {formatDateString(response?.location?.localtime)}
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex items-center">
                <span>Temp: {response?.current?.temp_f}&deg;</span>
                <div className="mx-4 italic text-lg text-blue-600">
                  Feels like
                </div>
                <span>{response?.current?.feelslike_f}&deg;</span>
              </div>

              <div className="flex items-center">
                {response?.current?.condition.text}
                <img
                  src={response?.current?.condition.icon}
                  alt={response?.current?.condition.text}
                  className="ml-1 w-10 h-10 mr-2"
                />
              </div>

              <div className="flex items-center">
                Precip <p className="ml-1">{response?.current?.precip_in} in</p>
                <img
                  src={Raindrops}
                  alt="rain Icon"
                  className="ml-1 w-12 h-12 mr-2"
                />
              </div>
              <div className="flex items-center">
                Wind
                <p className="ml-3">
                  {response?.current?.wind_dir} {response?.current?.wind_mph}{' '}
                  mph Gusts {response?.current?.gust_mph}
                </p>
                <img
                  src={Windsolid}
                  alt="Wind Icon"
                  className="ml-1 w-6 h-6 mr-2"
                />
              </div>
              <div className="flex items-center mt-3">
                Humidity
                <p className="ml-3">{response?.current?.humidity}%</p>
                <img
                  src={Humidity}
                  alt="Wind Icon"
                  className="ml-1 w-8 h-8 mr-2"
                />
              </div>
              <div className="flex items-center mt-3">
                Visibility
                <p className="ml-3">{response?.current?.vis_miles}%</p>
                <img src={Eyes} alt="Wind Icon" className="ml-1 w-8 h-8 mr-2" />
              </div>
              <div className="flex items-center mt-3">
                UV
                <p className="ml-3">{response?.current?.uv}%</p>
                <img src={UV} alt="Wind Icon" className="ml-1 w-10 h-10 mr-2" />
              </div>
            </>
          )}
        </div>
      )}

      {/* when either the Forecast OR Future button are clicked */}
      {endPoint && endPoint !== 'current.json' && !response.error && (
        <div class="max-w-screen-3xl mx-auto">
          <div class="grid  gap-1 bg-white grid-auto-fit ml-2">
            <div class="text-2xl col-span-1 p-2 underline">Time</div>
            <div class="text-2xl col-span-1 p-2 underline">Avg Temp</div>
            <div class="text-2xl col-span-1 p-2 underline">Condition</div>
            <div class="text-2xl col-span-1 p-2 underline">Total Precip</div>
            <div class="text-2xl col-span-1 p-2 underline">Max Wind</div>
            <hr class="w-full col-span-5 border-gray-300" />

            <div className="col-span-5 text-xl text-blue-700 italic font-bold">
              {' '}
              Conditions for:
              {formatDateString(forecast?.forecast?.forecastday[0]?.date)}
            </div>
            {/* Loop through the results helpful when there is more than one day selected */}
            {forecast?.forecast?.forecastday.map((day, index) => (
              <React.Fragment key={index}>
                {/* only after the first iteration */}
                {index !== 0 && (
                  <p className="col-span-5 text-xl text-blue-700 italic font-bold">
                    Conditions for{' '}
                    {formatDateString(
                      forecast?.forecast?.forecastday[index]?.date
                    )}
                  </p>
                )}
                {/* only for the first iteration and when the Forecast button was clicked set the first result to the current hour and keep going until the end of the day, otherwise set the hour to 0  */}
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
                      <div className="col-span-1 p-2 text- flex items-center ">
                        <p>{hour.condition.text}</p>
                        {/* <div className="flex-grow"></div> */}
                        <img
                          src={hour.condition.icon}
                          alt={hour.condition.text}
                          className="ml-2" // Apply margin to separate text and image
                        />
                      </div>
                      <div className="col-span-1 p-2 text- flex items-center pl-10">
                        {hour.precip_in} in{' '}
                        <img
                          src={Raindrops}
                          alt="rain Icon"
                          className="ml-1 w-12 h-12 mr-2"
                        />
                      </div>
                      <div className="col-span-1 p-2 text- flex items-center pl-8">
                        {hour.wind_dir} {hour.wind_mph} mph
                        <img
                          src={Windsolid}
                          alt="Wind Icon"
                          className="ml-1 w-6 h-6 mr-2"
                        />
                      </div>
                      <hr className="w-full col-span-5 border-gray-300" />
                    </React.Fragment>
                  ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Weather;

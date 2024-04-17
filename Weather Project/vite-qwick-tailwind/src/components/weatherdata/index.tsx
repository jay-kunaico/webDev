import { component$, useContext } from "@builder.io/qwik";
import Windsolid from "../../media/wind-solid.svg";
import Raindrops from "../../media/wi-raindrops.svg";
import Humidity from "../../media/wi-humidity.svg";
import Eyes from "../../media/eyes.png";
import UV from "../../media/uv-index.svg";
import { weatherContextId } from "~/routes/weathercontext/weather-context-id";
import { FormatDateString } from "~/utils/formatDateString";

export default component$(() => {
  const { responseSignal, endPointSignal } = useContext(weatherContextId);
  const hour = new Date().getHours();

  const response = responseSignal.value;

  return (
    <>
      {response && !response?.error && (
        <div class="my-12 ml-4 flex flex-col items-center text-black">
          <div class="flex items-center">
            <p class="mr-2 text-4xl">
              {response.location.name},{response.location.region}
            </p>
          </div>

          {endPointSignal.value === "current.json" && (
            <>
              <div class="flex items-start py-2 text-black">
                Current conditions as of:{" "}
                <div class="ml-2 font-bold text-green-600">
                  <span>
                    {new Date(response.location.localtime).toLocaleTimeString(
                      [],
                      {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      },
                    )}
                    <span class="ml-2">
                      <FormatDateString
                        dateString={response.location.localtime}
                        timeZone={response.location.tz_id}
                      />
                    </span>
                  </span>
                </div>
              </div>
              <div class="py-2 text-black">
                <div class="text-color-black flex items-center">
                  <span>Temp: {response.current?.temp_f}&deg;</span>
                  <div class="mx-4 text-lg italic text-blue-600">
                    Feels like
                  </div>
                  <span>{response.current.feelslike_f}&deg;</span>
                </div>

                <div class="flex items-center text-black">
                  {response.current.condition.text}
                  <img
                    src={response.current.condition.icon}
                    alt={response.current.condition.text}
                    class="ml-1 mr-2 h-10 w-10"
                    height={32}
                    width={32}
                  />
                </div>

                <div class="flex items-center text-black">
                  Precip <p class="ml-1">{response.current.precip_in} in</p>
                  <img
                    src={Raindrops}
                    alt="rain Icon"
                    class="ml-1 mr-2 h-12 w-12"
                    height={32}
                    width={32}
                  />
                </div>
                <div class="flex items-center text-black">
                  Wind
                  <p class="ml-3">
                    {response.current.wind_dir} {response.current.wind_mph} mph
                    Gusts {response.current.gust_mph}
                  </p>
                  <img
                    src={Windsolid}
                    alt="Wind Icon"
                    class="ml-1 mr-2 h-6 w-6"
                    height={32}
                    width={32}
                  />
                </div>
                <div class="mt-3 flex items-center text-black">
                  Humidity
                  <p class="ml-3">{response.current.humidity}%</p>
                  <img
                    src={Humidity}
                    alt="Wind Icon"
                    class="ml-1 mr-2 h-8 w-8"
                    height={32}
                    width={32}
                  />
                </div>
                <div class="mt-3 flex items-center text-black">
                  Visibility
                  <p class="ml-3">{response.current.vis_miles}%</p>
                  <img
                    src={Eyes}
                    alt="Wind Icon"
                    class="ml-1 mr-2 h-8 w-8"
                    height={32}
                    width={32}
                  />
                </div>
                <div class="mt-3 flex items-center text-black">
                  UV
                  <p class="ml-3">{response.current.uv}%</p>
                  <img
                    src={UV}
                    alt="Wind Icon"
                    class="ml-1 mr-2 h-10 w-10"
                    height={32}
                    width={32}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      )}
      {endPointSignal.value !== "current.json" &&
        response &&
        !response.error && (
          <div class="max-w-screen-3xl mx-auto text-black">
            <div class="grid-auto-fit ml-2 grid gap-1">
              <div class="col-span-1 p-2 text-2xl underline">Time</div>
              <div class="col-span-1 p-2 text-2xl underline">Avg Temp</div>
              <div class="col-span-1 p-2 text-2xl underline">Condition</div>
              <div class="col-span-1 p-2 text-2xl underline">Total Precip</div>
              <div class="col-span-1 p-2 text-2xl underline">Max Wind</div>
              <hr class="col-span-5 w-full border-gray-300" />

              <div class="col-span-5 text-xl font-bold italic text-blue-700">
                Conditions for{" "}
                <FormatDateString
                  dateString={response.forecast.forecastday[0]?.date}
                  timeZone={response.location.tz_id}
                />
              </div>
              {/* Loop through the results helpful when there is more than one day selected */}
              {response.forecast.forecastday.map(
                (day: { hour: any[] }, index: number) => (
                  <>
                    {/* only after the first iteration */}
                    {index !== 0 && (
                      <p class="col-span-5 text-xl font-bold italic text-blue-700">
                        Conditions for{" "}
                        <FormatDateString
                          dateString={response.forecast.forecastday[0]?.date}
                          timeZone={response.location.tz_id}
                        />
                      </p>
                    )}
                    {/* only for the first iteration and when the Forecast button was clicked set the first result to the current hour and keep going until the end of the day, otherwise set the hour to 0  */}
                    {day.hour
                      .slice(
                        index === 0 && endPointSignal.value !== "future.json"
                          ? hour
                          : 0,
                      )
                      .map((hour, index) => (
                        <>
                          <div
                            class="text- col-span-1 flex items-center p-2"
                            key={`${index}-${hour}`}
                          >
                            {new Date(hour.time).toLocaleTimeString([], {
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </div>
                          <div class="text- col-span-1 flex items-center p-2">
                            {hour.temp_f}°F
                          </div>
                          <div class="text- col-span-1 flex items-center p-2 ">
                            <p>{hour.condition.text}</p>
                            <img
                              src={hour.condition.icon}
                              alt={hour.condition.text}
                              class="ml-2"
                              height={32}
                              width={32} // Apply margin to separate text and image
                            />
                          </div>
                          <div class="text- col-span-1 flex items-center p-2 pl-10">
                            {hour.precip_in} in{" "}
                            <img
                              src={Raindrops}
                              alt="rain Icon"
                              class="ml-1 mr-2 h-12 w-12"
                              height={32}
                              width={32}
                            />
                          </div>
                          <div class="text- col-span-1 flex items-center p-2 pl-8">
                            {hour.wind_dir} {hour.wind_mph} mph
                            <img
                              src={Windsolid}
                              alt="Wind Icon"
                              class="ml-1 mr-2 h-6 w-6"
                              height={12}
                              width={12}
                            />
                          </div>
                          <hr class="col-span-5 w-full border-gray-300" />
                        </>
                      ))}
                  </>
                ),
              )}
            </div>
          </div>
        )}
    </>
  );
});

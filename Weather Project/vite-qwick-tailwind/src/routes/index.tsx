import { $, component$, event$, useSignal, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";
import Windsolid from "../media/wind-solid.svg";
import Raindrops from "../media/wi-raindrops.svg";
import Humidity from "../media/wi-humidity.svg";
import Eyes from "../media/eyes.png";
import UV from "../media/uv-index.svg";
import ActivityCalendarWidget from "activity-calendar-widget/qwik";

export const useOnGet = () => {};
export default component$(() => {
  const citySignal = useSignal("");
  const endPointSignal = useSignal("current.json");
  const days = useSignal("1");
  const date = useSignal(new Date().toISOString().split("T")[0]);
  const serverData = useSignal<any>();
  const response = serverData;
  //   ? JSON.stringify(serverData.value, null, 2)
  //   : null;
  const hour = new Date().getHours();
  const showDaysSelector = useSignal(false);
  const showFutureSelector = useSignal(false);

  // console.log("serverData ", serverData);
  console.log("date ", date.value);

  useTask$(async ({ track, cleanup }) => {
    track(citySignal);
    track(endPointSignal);
    track(days);
    track(date);
    if (!citySignal.value) {
      console.log("No City name");
      return;
    }
    const abortController = new AbortController();
    cleanup(() => abortController.abort("cleanup"));

    try {
      const origin = isServer ? "http://localhost:3000" : "";
      const url = `${origin}/api?location=${citySignal.value}&endPoint=${endPointSignal.value}&days=${days.value}&dt=${date.value}`;
      const config = {
        method: "get",
        signal: abortController.signal,
      };
      console.log("fetch", url);
      const res = await fetch(url, config);

      const data = await res.json();
      console.log("data ", data);

      serverData.value = data;
    } catch (err) {
      console.log("Error", err);
    }
  });

  const handleEndPoint = $(
    (event: { target?: any; preventDefault?: () => void }) => {
      const buttonText = event.target.textContent.toLowerCase();
      endPointSignal.value = buttonText + ".json";
    },
  );
  const handleCurrentClick = $(
    (event: { target?: any; preventDefault?: () => void }) => {
      showDaysSelector.value = false;
      showFutureSelector.value = false;
      days.value = "";
      date.value = "";
      handleEndPoint(event);
    },
  );
  const handleForeCastClick = $(
    (event: { target?: any; preventDefault?: () => void }) => {
      showDaysSelector.value = !showDaysSelector.value;
      handleEndPoint(event);
      showFutureSelector.value = false;
      date.value = "";
    },
  );

  const handleFutureClick = $(
    (event: { target?: any; preventDefault?: () => void }) => {
      showDaysSelector.value = false;
      showFutureSelector.value = !showFutureSelector.value;
      handleEndPoint(event);
      days.value = "";
      date.value = event.target.value || new Date().toISOString().split("T")[0];
    },
  );
  function formatDateString(dateString: string) {
    const date = new Date(dateString);
    // I will have to revist this, I don't know why the date was short by a day
    const timeZoneOffset = date.getTimezoneOffset() * 60 * 1000; // Convert offset to milliseconds
    const adjustedDate = new Date(date.getTime() + timeZoneOffset);

    return adjustedDate.toLocaleDateString(undefined, {
      timeZone: response.value?.location?.tz_id,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  const handleSelectChange = $((event: { target: { value: string } }) => {
    const selectedValue = event.target.value;
    days.value = selectedValue;
  });

  return (
    <>
      <form
        preventdefault:submit
        onSubmit$={async (e: Event) => {
          console.log("onsubmit ", e);
        }}
        class="mx-auto flex flex-col items-center rounded-md border-2 border-purple-600 bg-white p-4 text-purple-950 shadow-md"
      >
        {/* Main input field  */}
        <div class="w-full max-w-md space-y-1 px-4 py-2">
          <label for="input" class="block text-sm font-semibold">
            Input Location
          </label>
          <input
            id="input"
            placeholder="Input Location"
            class="w-full rounded-md border-2 border-purple-600 px-2 py-1 placeholder-blue-300 caret-blue-400 placeholder-shown:bg-purple-100 disabled:bg-purple-100"
            bind:value={citySignal}
          />
        </div>
        <div class="mt-4 w-full max-w-md">
          <nav class="flex justify-center gap-2">
            <div>
              <button onClick$={handleCurrentClick}>Current</button>
            </div>
            <div>
              <button onClick$={handleForeCastClick}>Forecast</button>
            </div>
            <div>
              <button onClick$={handleFutureClick}>Future</button>
            </div>
          </nav>
          {showDaysSelector.value === true && (
            <div class="ml-7 mt-4  w-full max-w-md ">
              <span>Select the number of days to forecast</span>
              <select
                onChange$={handleSelectChange}
                class="ml-10 border border-blue-500"
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          )}
          {showFutureSelector.value === true && (
            <div class="ml-7 flex w-full max-w-md justify-around">
              {/* <ActivityCalendarWidget
                daysToRender={60}
                showSummary={false}
                summaryText=""
              /> */}
              <input
                id="input"
                placeholder="Input Date"
                class="w-full rounded-md border-2 border-purple-600 px-2 py-1 placeholder-blue-300 caret-blue-400 placeholder-shown:bg-purple-100 disabled:bg-purple-100"
                value={new Date().toISOString().split("T")[0]}
                bind:value={date}
              />
            </div>
          )}
        </div>
      </form>

      {response && response.value && !response.value?.error && (
        <div class="my-12 ml-4 flex flex-col items-center text-black">
          <div class="flex items-center">
            <p class="mr-2 text-4xl">
              {response.value?.location?.name},
              {response.value?.location?.region}
            </p>
          </div>
          {endPointSignal && endPointSignal.value === "current.json" && (
            <>
              <div class="flex items-center py-2 text-black">
                Current conditions as of:{" "}
                <div class="ml-2 font-bold text-green-600">
                  <span>
                    {new Date(
                      response.value?.location?.localtime,
                    ).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                    <span class="ml-2">
                      {formatDateString(response.value?.location?.localtime)}
                    </span>
                  </span>
                </div>
              </div>
              <div class="text-color-black flex items-center">
                <span>Temp: {response.value?.current?.temp_f}&deg;</span>
                <div class="mx-4 text-lg italic text-blue-600">Feels like</div>
                <span>{response.value?.current?.feelslike_f}&deg;</span>
              </div>

              <div class="flex items-center text-black">
                {response.value?.current?.condition.text}
                <img
                  src={response.value?.current?.condition.icon}
                  alt={response.value?.current?.condition.text}
                  class="ml-1 mr-2 h-10 w-10"
                />
              </div>

              <div class="flex items-center text-black">
                Precip{" "}
                <p class="ml-1">{response.value?.current?.precip_in} in</p>
                <img
                  src={Raindrops}
                  alt="rain Icon"
                  class="ml-1 mr-2 h-12 w-12"
                />
              </div>
              <div class="flex items-center text-black">
                Wind
                <p class="ml-3">
                  {response.value?.current?.wind_dir}{" "}
                  {response.value?.current?.wind_mph} mph Gusts{" "}
                  {response.value?.current?.gust_mph}
                </p>
                <img
                  src={Windsolid}
                  alt="Wind Icon"
                  class="ml-1 mr-2 h-6 w-6"
                />
              </div>
              <div class="mt-3 flex items-center text-black">
                Humidity
                <p class="ml-3">{response.value?.current?.humidity}%</p>
                <img src={Humidity} alt="Wind Icon" class="ml-1 mr-2 h-8 w-8" />
              </div>
              <div class="mt-3 flex items-center text-black">
                Visibility
                <p class="ml-3">{response.value?.current?.vis_miles}%</p>
                <img src={Eyes} alt="Wind Icon" class="ml-1 mr-2 h-8 w-8" />
              </div>
              <div class="mt-3 flex items-center text-black">
                UV
                <p class="ml-3">{response.value?.current?.uv}%</p>
                <img src={UV} alt="Wind Icon" class="ml-1 mr-2 h-10 w-10" />
              </div>
            </>
          )}
        </div>
      )}
      {endPointSignal &&
        endPointSignal.value !== "current.json" &&
        response.value &&
        !response.value?.error && (
          <div class="max-w-screen-3xl mx-auto text-black">
            <div class="grid-auto-fit  ml-2 grid gap-1">
              <div class="col-span-1 p-2 text-2xl underline">Time</div>
              <div class="col-span-1 p-2 text-2xl underline">Avg Temp</div>
              <div class="col-span-1 p-2 text-2xl underline">Condition</div>
              <div class="col-span-1 p-2 text-2xl underline">Total Precip</div>
              <div class="col-span-1 p-2 text-2xl underline">Max Wind</div>
              <hr class="col-span-5 w-full border-gray-300" />

              <div class="col-span-5 text-xl font-bold italic text-blue-700">
                Conditions for:
                {formatDateString(
                  response.value?.forecast?.forecastday[0]?.date,
                )}
              </div>
              {/* Loop through the results helpful when there is more than one day selected */}
              {response.value?.forecast?.forecastday.map(
                (day: { hour: any[] }, index: number) => (
                  <>
                    {/* only after the first iteration */}
                    {index !== 0 && (
                      <p class="col-span-5 text-xl font-bold italic text-blue-700">
                        Conditions for{" "}
                        {formatDateString(
                          response.value?.forecast?.forecastday[index]?.date,
                        )}
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
                          <div class="text- col-span-1 flex items-center p-2">
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
                            {/* <div class="flex-grow"></div> */}
                            <img
                              src={hour.condition.icon}
                              alt={hour.condition.text}
                              class="ml-2" // Apply margin to separate text and image
                            />
                          </div>
                          <div class="text- col-span-1 flex items-center p-2 pl-10">
                            {hour.precip_in} in{" "}
                            <img
                              src={Raindrops}
                              alt="rain Icon"
                              class="ml-1 mr-2 h-12 w-12"
                            />
                          </div>
                          <div class="text- col-span-1 flex items-center p-2 pl-8">
                            {hour.wind_dir} {hour.wind_mph} mph
                            <img
                              src={Windsolid}
                              alt="Wind Icon"
                              class="ml-1 mr-2 h-6 w-6"
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
      {/* <pre>
        {JSON.stringify(response.value?.forecast?.forecastday[0], null, 2)}
      </pre> */}
    </>
  );
});

import { $, component$, useContext, useSignal } from "@builder.io/qwik";
import { weatherContextId } from "~/routes/weathercontext/weather-context-id";

export default component$(() => {
  const { citySignal, endPointSignal, daysSignal, dateSignal } =
    useContext(weatherContextId);
  const showDaysSelector = useSignal(false);
  const showFutureSelector = useSignal(false);
  const date = new Date();
  const futureDate = new Date(date);
  futureDate.setDate(date.getDate() + 14);
  const formatedFutureDate = futureDate.toISOString().split("T")[0];
  if (showFutureSelector.value === true) {
    dateSignal.value = formatedFutureDate;
  }

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
      daysSignal.value = "";
      dateSignal.value = "";
      handleEndPoint(event);
    },
  );
  const handleForeCastClick = $(
    (event: { target?: any; preventDefault?: () => void }) => {
      showDaysSelector.value = !showDaysSelector.value;
      handleEndPoint(event);
      showFutureSelector.value = false;
      dateSignal.value = "";
    },
  );

  const handleFutureClick = $(
    (event: { target?: any; preventDefault?: () => void }) => {
      showDaysSelector.value = false;
      showFutureSelector.value = !showFutureSelector.value;
      handleEndPoint(event);
      daysSignal.value = "";
      dateSignal.value =
        event.target.value || new Date().toISOString().split("T")[0];
    },
  );
  const handleSelectChange = $((event: { target: { value: string } }) => {
    const selectedValue = event.target.value;
    daysSignal.value = selectedValue;
  });

  return (
    <div>
      <form
        preventdefault:submit
        onSubmit$={async (e: Event) => {
          console.log("onsubmit ", e);
        }}
        class="mx-auto flex flex-col items-center rounded-md border-2 border-purple-600 bg-white p-4 text-purple-950 shadow-md"
      >
        <div class="ml-7 w-full max-w-md space-y-1 px-4 py-2">
          <label for="input" class="block text-sm font-semibold">
            Input Location
          </label>
          <input
            id="input"
            placeholder="Input Location"
            class="w-full rounded-md border-2 border-purple-600 px-2 py-1 placeholder-blue-300 caret-blue-400 placeholder-shown:bg-purple-100 disabled:bg-purple-100"
            // bind:value={citySignal}
            onInput$={(event) => {
              citySignal.value = (event.target as HTMLInputElement).value;
            }}
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
            <div class="ml-3 mt-4 max-w-fit px-4 py-2">
              <span>Select a date between 14 and 300 days from today</span>
              <input
                id="input"
                placeholder="Input Date"
                class="mt-2  inline-block max-w-fit rounded-md border-2 border-purple-600 px-2 py-1 placeholder-blue-300 caret-blue-400 placeholder-shown:bg-purple-100 disabled:bg-purple-100"
                value={formatedFutureDate}
                bind:value={dateSignal}
              />
            </div>
          )}
        </div>
      </form>
    </div>
  );
});

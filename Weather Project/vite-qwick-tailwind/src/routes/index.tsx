import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";

import Weatherform from "~/components/weatherform";
import Weatherdata from "~/components/weatherdata";

export default component$(() => {
  const citySignal = useSignal("");
  const endPointSignal = useSignal("current.json");
  const daysSignal = useSignal("1");
  const dateSignal = useSignal(new Date().toISOString().split("T")[0]);
  const serverData = useSignal<any>();
  const response = serverData;

  useTask$(async ({ track, cleanup }) => {
    track(citySignal);
    track(endPointSignal);
    track(daysSignal);
    track(dateSignal);
    if (!citySignal.value) {
      console.log("No City name");
      return;
    }
    const abortController = new AbortController();
    cleanup(() => abortController.abort("cleanup"));

    try {
      const origin = isServer ? "http://localhost:3000" : "";
      const url = `${origin}/api?location=${citySignal.value}&endPoint=${endPointSignal.value}&days=${daysSignal.value}&dt=${dateSignal.value}`;
      const config = {
        method: "get",
        signal: abortController.signal,
      };
      // console.log("fetch", url);
      const res = await fetch(url, config);

      const data = await res.json();
      // console.log("data ", data);

      serverData.value = data;
    } catch (err) {
      console.log("Error", err);
    }
  });

  return (
    <>
      <Weatherform
        citySignal={citySignal}
        endPointSignal={endPointSignal}
        daysSignal={daysSignal}
        dateSignal={dateSignal}
      />
      <Weatherdata response={response} endPointSignal={endPointSignal} />
    </>
  );
});

import {
  component$,
  useContextProvider,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import { isServer } from "@builder.io/qwik/build";

import Weatherform from "~/components/weatherform";
import Weatherdata from "~/components/weatherdata";
import { weatherContextId } from "./weathercontext/weather-context-id";

export default component$(() => {
  const citySignal = useSignal<string>("");
  const endPointSignal = useSignal<string>("current.json");
  const daysSignal = useSignal<string>("1");
  const dateSignal = useSignal<string>(new Date().toISOString().split("T")[0]);
  const responseSignal = useSignal<object>();

  useContextProvider(weatherContextId, {
    citySignal,
    endPointSignal,
    daysSignal,
    dateSignal,
    responseSignal,
  });

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

      responseSignal.value = data;
    } catch (err) {
      console.log("Error", err);
    }
  });

  return (
    <>
      <Weatherform />
      <Weatherdata />
    </>
  );
});

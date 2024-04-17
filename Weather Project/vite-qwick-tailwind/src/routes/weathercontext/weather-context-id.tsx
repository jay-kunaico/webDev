import { Signal, createContextId } from "@builder.io/qwik";

export interface WeatherContextState {
  citySignal: Signal<string>;
  endPointSignal: Signal<string>;
  daysSignal: Signal<string>;
  dateSignal: Signal<string>;
  responseSignal: Signal<object>;
}

export const weatherContextId =
  createContextId<WeatherContextState>("weatherContext");

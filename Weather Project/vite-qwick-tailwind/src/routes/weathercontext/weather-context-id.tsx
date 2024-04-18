import { Signal, createContextId } from "@builder.io/qwik";

export interface Condition {
  text: string;
  icon: string;
}

type Forecast = {
  forecastday: Array<any>;
};

export interface Response {
  location: {
    tz_id: string;
    name: string;
    region: string;
    localtime: string;
  };
  tz_id: string;
  current: {
    condition: Condition;
    feelslike_f: string;
    temp_f: string;
    precip_in: string;
    wind_dir: string;
    wind_mph: string;
    gust_mph: string;
    humidity: string;
    vis_miles: string;
    uv: string;
  };
  error: string;
  name: string;
  forecast: Forecast;
}

export interface WeatherContextState {
  citySignal: Signal<string>;
  endPointSignal: Signal<string>;
  daysSignal: Signal<string>;
  dateSignal: Signal<string>;
  responseSignal: Signal<Response>;
}

export const weatherContextId =
  createContextId<WeatherContextState>("weatherContext");

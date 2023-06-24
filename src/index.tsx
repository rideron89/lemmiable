import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import "./i18n";

import dayjs from "dayjs";
import * as relativeTime from "dayjs/plugin/relativeTime";
import * as timezone from "dayjs/plugin/timezone";
import * as utc from "dayjs/plugin/utc";
// https://day.js.org/docs/en/customization/relative-time
dayjs.extend(relativeTime, {
  thresholds: [
    { l: "s", r: 1 },
    { l: "m", r: 1 },
    { l: "mm", r: 59, d: "minute" },
    { l: "h", r: 1 },
    { l: "hh", r: 18, d: "hour" },
    { l: "d", r: 1 },
    { l: "dd", r: 29, d: "day" },
    { l: "M", r: 1 },
    { l: "MM", r: 11, d: "month" },
    { l: "y", r: 1 },
    { l: "yy", d: "year" }
  ],
})
dayjs.extend(timezone)
dayjs.extend(utc)

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <React.Suspense fallback="loading">
      <App />
    </React.Suspense>
  </React.StrictMode>
);

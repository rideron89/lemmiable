import { createContext } from "react";
import { loadSettingsFromLocalStorage } from "../utility";

export const SettingsContext = createContext(loadSettingsFromLocalStorage())

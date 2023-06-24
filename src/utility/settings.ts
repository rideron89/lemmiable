export interface AppSettings {
  hostname: string;
}

export const defaultAppSettings: AppSettings = {
  hostname: "https://voyager.lemmy.ml"
}

export function loadSettingsFromLocalStorage(): AppSettings {
  try {
    const raw = localStorage.getItem("lemmiable_settings") ?? ""
    if (!raw) {
      return defaultAppSettings
    }
    const settings = JSON.parse(localStorage.getItem("lemmiable_settings") ?? "")
    return settings
  } catch (error) {
    console.warn("couldn't load settings:", error)
    return defaultAppSettings
  }
}

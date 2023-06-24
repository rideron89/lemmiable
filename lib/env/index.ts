/**
 * Returns true when the `APP_ENV` env var equals "app".
 */
export function isApp(): boolean {
  return process.env.APP_ENV === "app"
}

/**
 * Returns true when the `APP_ENV` env var equals anything other than "app".
 */
export function isDev(): boolean {
  return !isApp()
}

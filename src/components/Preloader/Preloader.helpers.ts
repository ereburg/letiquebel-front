export function isPreloaderEnabled() {
  const isEnabledEnv = process.env.NEXT_PUBLIC_SPLASHSCREEN_ENABLED;
  return isEnabledEnv?.toLowerCase() === 'true' || isEnabledEnv === '1';
}

const queryKeys = {
  AUTH: 'auth',
  GET_ACCESS_TOKEN: 'getAccessToken',
  GET_PROFILE: 'getProfile',
  GET_FLIGHT: 'getFlight',
  GET_MODEL: 'getModel',
} as const;

const storageKeys = {
  REFRESH_TOKEN: 'refreshToken',
  ACCESS_TOKEN: 'accessToken',
  THEME_MODE: 'themeMode',
  THEME_SYSTEM: 'themeSystem',
} as const;

export {queryKeys, storageKeys};

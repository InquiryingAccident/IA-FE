const authNavigations = {
  AUTH_HOME: 'AuthHome',
  AUTH_LOGIN: 'AuthLogin',
  AUTH_SIGNUP: 'AuthSignup',
} as const;

const mainTabNavigations = {
  MAINTAB_HOME: 'MainTabHome',
  MAINTAB_SEARCH: 'MainTabSearch',
  MAINTAB_ADD: 'MainTabAdd',
} as const;

export {authNavigations, mainTabNavigations};

const authNavigations = {
  AUTH_HOME: 'AuthHome',
  AUTH_LOGIN: 'AuthLogin',
  AUTH_SIGNUP: 'AuthSignup',
} as const;

const mainTabNavigations = {
  MAINTAB_HOME: 'MainTabHome',
  MAINTAB_SEARCH: 'MainTabSearch',
  MAINTAB_BOOKMARK: 'MainTabBookmark',
} as const;

const tabHomeNavigations = {
  TAB_HOME: 'TabHome',
} as const;

const tabSearchNavigations = {
  TAB_SEARCH: 'TabSearchHome',
  TAB_SEARCH_ACCIDENTLIST: 'TabSearchAccidentList',
} as const;

const tabBookmarkNavigations = {
  TAB_BOOKMARK: 'TabBookmarkHome',
} as const;

export {
  authNavigations,
  mainTabNavigations,
  tabHomeNavigations,
  tabSearchNavigations,
  tabBookmarkNavigations,
};

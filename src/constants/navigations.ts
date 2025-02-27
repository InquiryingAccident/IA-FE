const authNavigations = {
  AUTH_HOME: 'AuthHome',
  AUTH_LOGIN: 'AuthLogin',
  AUTH_SIGNUP: 'AuthSignup',
} as const;

const mainTabNavigations = {
  MAINTAB_HOME: 'MainTabHome',
  MAINTAB_SEARCH: 'MainTabSearch',
  MAINTAB_BOOKMARK: 'MainTabBookmark',
  MAINTAB_USER: 'MainTabUser',
} as const;

const tabHomeNavigations = {
  TAB_HOME: 'TabHome',
} as const;

const tabSearchNavigations = {
  TAB_SEARCH: 'TabSearchHome',
  TAB_SEARCH_ACCIDENTLIST: 'TabSearchAccidentList',
  TAB_SEARCH_IDENT: 'TabSearchIdent',
} as const;

const tabBookmarkNavigations = {
  TAB_BOOKMARK: 'TabBookmarkHome',
} as const;

const tabUserNavigations = {
  TAB_USER: 'TabUserHome',
} as const;

export {
  authNavigations,
  mainTabNavigations,
  tabHomeNavigations,
  tabSearchNavigations,
  tabBookmarkNavigations,
  tabUserNavigations,
};

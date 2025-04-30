import useThemeStore from '@/store/useThemeStore';
import {ThemeMode} from '@/types';
import {getAsyncStorage, setAsyncStorage} from '@/utils';
import {useEffect} from 'react';
import {useColorScheme} from 'react-native';

function useThemeStorage() {
  const systemTheme = useColorScheme();
  const {theme, isSystem, setTheme, setSystemTheme} = useThemeStore();

  const setMode = async (mode: ThemeMode) => {
    await setAsyncStorage('themeMode', mode);
    setTheme(mode);
  };

  const setSystem = async (flag: boolean) => {
    await setAsyncStorage('themeSystem', flag);
    setSystemTheme(flag);
  };

  useEffect(() => {
    async () => {
      const mode = (await getAsyncStorage('themeMode')) ?? 'light';
      const systemMode = (await getAsyncStorage('themeSystem')) ?? 'false';
      const newMode = systemMode ? systemTheme : mode;
      setTheme(mode);
      setSystemTheme(systemMode);
    };
  }, [setTheme, setSystemTheme, systemTheme]);

  return {theme, isSystem, setMode, setSystem};
}

export default useThemeStorage;

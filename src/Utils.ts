import { useCallback, useState } from 'react';

// Simplified version of https://usehooks-ts.com/react-hook/use-local-storage
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const readFromLocalStorage = useCallback(() => {
    const serialized = window?.localStorage.getItem(key);
    return serialized ? JSON.parse(serialized) : initialValue;
  }, [key, initialValue]);
  const [stateValue, setStateValue] = useState(readFromLocalStorage);
  const setValue = useCallback((newValue: T) => {
    window?.localStorage.setItem(key, JSON.stringify(newValue));
    setStateValue(newValue);
  }, [key]);
  return [stateValue, setValue];
};
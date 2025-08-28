import { useState } from 'react';

/**
 * useLocalStorage
 * Simple hook to persist state to localStorage.
 * Key: string localStorage key
 * initialValue: default value used when nothing exists
 */
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      // If parsing fails, fallback to initial
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      // fail silently (localStorage full/disabled)
      console.warn('Failed to write localStorage', err);
    }
  };

  return [storedValue, setValue];
};

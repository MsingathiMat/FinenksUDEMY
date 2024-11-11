"use client"
// MtLocalStorage.ts
export const MtLocalStorage = {
    
  // Key for storing song data
  songKey: 'CoolBoxSong',

  // Save data to localStorage
  set: <T>(value: T): void => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem("CoolBoxSong", JSON.stringify(value));
    }
  },

  // Retrieve data from localStorage
  get: <T>(): T | null => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const value = window.localStorage.getItem("CoolBoxSong");

      return value ? (JSON.parse(value) as T) : null;
    }
    return null;
  },

  // Remove data from localStorage
  remove: (): void => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem("CoolBoxSong");
    }
  },

  // Clear previous value before setting a new one
  clearAndSet: <T>(value: T): void => {
    MtLocalStorage.remove(); // Clear previous value
    MtLocalStorage.set(value); // Set new value
  },
  };
  
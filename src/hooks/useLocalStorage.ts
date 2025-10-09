import { useEffect, useState } from "react";

function useLocalStorage<T extends Record<string, any>>(
  key: string,
  initialValue: T
) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn("Error reading from localStorage", error);
      return initialValue;
    }
  });

  useEffect(() => {
    const safeValue = { ...value };
    if ("password" in safeValue) {
      delete safeValue.password;
    }

    try {
      localStorage.setItem(key, JSON.stringify(safeValue));
    } catch (error) {
      console.warn("Error saving to localStorage", error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;

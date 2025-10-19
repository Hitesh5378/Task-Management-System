export const getLocalStorage = <T = unknown>(key: string): T | string | null => {
  const item = localStorage.getItem(key);

  // If nothing stored, return null
  if (item === null) return null;

  const trimmed = item.trim();
  // Handle common cases where the string "undefined" or "null" was stored
  if (trimmed === '' || trimmed === 'undefined' || trimmed === 'null') return null;

  // Try to parse JSON; if parsing fails, return the raw string so callers can handle it
  try {
    return JSON.parse(item) as T;
  } catch (err) {
    console.warn(`getLocalStorage: value for key "${key}" is not valid JSON, returning raw string.`);
    return item;
  }
};

export const setLocalStorage = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`setLocalStorage: could not store key "${key}"`, err);
  }
};

export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.warn(`removeLocalStorage: could not remove key "${key}"`, err);
  }
};



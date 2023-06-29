export const setItems = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

export const removeItems = (key) => {
  window.localStorage.removeItem(key);
};

export const getItems = (key) => {
  const data = window.localStorage.getItem(key);
  if (!data) return null;
  return JSON.parse(data);
};

export const LocalStorage = () => {
  const setItem = (key: string, item: any) => {
    return localStorage.setItem(key, JSON.stringify(item));
  };

  const getItem = (key: string) => {
    if (typeof window !== "undefined" && window.localStorage) {
      const item = localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item);
      }
    }
  };

  return { setItem, getItem };
};

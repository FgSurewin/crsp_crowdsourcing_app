export const ID = "id";
export const TOKEN = "token";
export const NICKNAME = "nickname";

export const saveLocal = (key, value) => {
  localStorage.setItem(key, value);
};
export const readLocal = (key) => {
  return localStorage.getItem(key);
};
export const deleteLocal = (key) => {
  localStorage.removeItem(key);
};

export const deleteAllLocal = () => {
  deleteLocal(ID);
  deleteLocal(TOKEN);
  deleteLocal(NICKNAME);
};

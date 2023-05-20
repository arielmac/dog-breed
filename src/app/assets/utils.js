export const API_BASE = "https://api.thedogapi.com/v1/";
export const API_KEY = "live_fQKGebgSyIvCSL41lcOefZOjMbwtsTdTzisy7KyBkC0ruA6I2gfGo3LNqp4Ln9cs";

export function debounce(func, timeout = 1000) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
import { words } from "./words.json";

export const GetRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

export const msToSec = (ms: number) => {
  return ms / 1000;
};

export const secToMin = (sec: number) => {
  return sec / 60;
};

export const msToMin = (ms: number) => {
  return secToMin(msToSec(ms));
};

export const secToMs = (sec: number) => {
  return sec * 1000;
};

export const minToSec = (min: number) => {
  return min * 60;
};

export const minToMs = (min: number) => {
  return secToMs(minToSec(min));
};

export const msToTime = (s: number) => {
  // Pad to 2 or 3 digits, default is 2
  function pad(n: number, z?: number) {
    z = z || 2;
    return ("00" + n).slice(-z);
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return pad(mins) + ":" + pad(secs);
};

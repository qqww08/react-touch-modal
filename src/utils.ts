import { Shuffle } from "./types";

export const keyValue: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export const shuffleHandler = (array: string[], sort: Shuffle): string[] => {
  switch (sort) {
    case "always":
      return array.sort(() => Math.random() - 0.5);
    case "fixed":
      return array;
    case "once":
      return array.sort(() => Math.random() - 0.5);
    default:
      return [];
  }
};

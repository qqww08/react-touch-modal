import { keyValue } from "../utils";
import { useEffect, useState } from "react";
import { Shuffle } from "../types";

interface Props {
  shuffle: Shuffle;
  keyData: string[];
}
const useShuffle = (props: Props): string[] => {
  const { shuffle, keyData } = props;
  const [keyNumber, setKeyNumber] = useState<string[]>([]);

  const alwaysShuffleHandler = () => {
    setKeyNumber(keyValue.sort(() => Math.random() - 0.5));
  };

  const shuffleHandler = () => {
    switch (shuffle) {
      case "once":
        return setKeyNumber(keyValue.sort(() => Math.random() - 0.5));
      case "fixed":
        return setKeyNumber(keyValue);
      default:
        return [];
    }
  };

  useEffect(() => {
    if (shuffle === "always") alwaysShuffleHandler();
  }, [keyData]);

  useEffect(() => {
    if (shuffle !== "always") shuffleHandler();
  }, []);

  return keyNumber;
};

export default useShuffle;

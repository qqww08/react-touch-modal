import { keyValue } from "../lib/utils";
import { useCallback, useEffect, useState } from "react";
import { Shuffle } from "../types";

interface Props {
  shuffle: Shuffle;
  keyData: string[];
}
const useShuffle = (props: Props): string[] => {
  const { shuffle, keyData } = props;
  const [keyNumber, setKeyNumber] = useState<string[]>([]);

  const alwaysShuffleHandler = useCallback(() => {
    setKeyNumber(keyValue.sort(() => Math.random() - 0.5));
  }, [keyNumber]);

  const shuffleHandler = useCallback(() => {
    switch (shuffle) {
      case "once":
        return setKeyNumber(keyValue.sort(() => Math.random() - 0.5));
      case "fixed":
        return setKeyNumber(keyValue);
      default:
        return [];
    }
  }, [keyNumber, shuffle]);

  useEffect(() => {
    if (shuffle === "always") alwaysShuffleHandler();
  }, [keyData]);

  useEffect(() => {
    if (shuffle !== "always") shuffleHandler();
  }, []);

  return keyNumber;
};

export default useShuffle;

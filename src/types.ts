export type Shuffle = "always" | "fixed" | "once";
export interface IKeypad {
  onFinish: (password: string) => void;
  count?: 4 | 5 | 6;
  className?: string;
  shuffle?: Shuffle;
  error?: string;
  message?: string;
}

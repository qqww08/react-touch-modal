import React from "react";

export type Shuffle = "always" | "fixed" | "once";
export interface IKeypad {
  onFinish: (password: string) => void;
  onPassConfirm?: (password: any) => void;
  count?: 4 | 5 | 6;
  emptyPassword?: boolean;
  className?: string;
  shuffle?: Shuffle;
  error?: string;
  messages?: string[];
  deleteAllIcon?: string | React.ReactNode;
  deleteIcon?: string | React.ReactNode;
}

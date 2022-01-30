export type TStyledDirection = {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
  height?: string;
  width?: string;
};
export interface IStyledDirection {
  left: TStyledDirection;
  right: TStyledDirection;
  bottom: TStyledDirection;
  top: TStyledDirection;
}

export const directionValue: IStyledDirection = {
  left: { left: 0, top: 0, height: "100%" },
  right: { right: 0, top: 0, height: "100%" },
  bottom: { bottom: 0, left: 0, width: "100%" },
  top: { top: 0, left: 0, width: "100%" },
};
export const drawerValue = {
  left: { right: 0, top: 0, height: "100%", width: "30px" },
  right: { left: 0, top: 0, height: "100%", width: "30px" },
  bottom: { top: 0, left: 0, width: "100%", height: "30px" },
  top: { bottom: 0, left: 0, width: "100%", height: "30px" },
};
export const directionTransform = {
  left: [{ transform: `translateX(0)` }, { transform: `translateX(-2000px)` }],
  right: [{ transform: `translateX(0)` }, { transform: `translateX(2000px)` }],
  bottom: [{ transform: `translateY(0)` }, { transform: `translateY(2000px)` }],
  top: [{ transform: `translateY(0)` }, { transform: `translateY(-2000px)` }],
};
export const scrollKeys = {
  left: "clientX",
  right: "clientX",
  bottom: "clientY",
  top: "clientY",
};
export const translateKey = {
  left: "translateX",
  right: "translateX",
  bottom: "translateY",
  top: "translateY",
};
export const offset = {
  left: "offsetWidth",
  right: "offsetWidth",
  bottom: "offsetHeight",
  top: "offsetHeight",
};
export const limitCompare = {
  left: (moveClient) => moveClient > 0,
  right: (moveClient) => moveClient < 0,
  top: (moveClient) => moveClient > 0,
  bottom: (moveClient) => moveClient < 0,
};
export const endCompare = {
  left: (moveClientY, movePoint) => moveClientY < movePoint,
  right: (moveClientY, movePoint) => moveClientY > movePoint,
  top: (moveClientY, movePoint) => moveClientY < movePoint,
  bottom: (moveClientY, movePoint) => moveClientY > movePoint,
};
export const translateValue = {
  left: -2000,
  right: 2000,
  bottom: 2000,
  top: -2000,
};

export const shuffleHandler = (array: number[], sort: boolean) => sort ? array.sort(() => Math.random() - 0.5) : array;

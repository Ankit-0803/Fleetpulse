export const random = {
  number: (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  
  boolean: (probability: number = 0.5): boolean => {
    return Math.random() > probability;
  },
  
  variation: (value: number, maxChange: number): number => {
    return value + (Math.random() - 0.5) * maxChange;
  }
};
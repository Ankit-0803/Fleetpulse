interface Coordinates {
  lat: number;
  lng: number;
}

const NYC_CENTER: Coordinates = {
  lat: 40.7128,
  lng: -74.006,
};

export const locationUtils = {
  generateRandomLocation: (): Coordinates => ({
    lat: NYC_CENTER.lat + (Math.random() - 0.5) * 0.1,
    lng: NYC_CENTER.lng + (Math.random() - 0.5) * 0.1,
  }),

  updateLocation: (current: Coordinates): Coordinates => ({
    lat: current.lat + (Math.random() - 0.5) * 0.001,
    lng: current.lng + (Math.random() - 0.5) * 0.001,
  }),

  NYC_CENTER,
};
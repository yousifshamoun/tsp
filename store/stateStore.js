import create from 'zustand';
import arbitraryInsertion from './arbitrary';
import nearestNeighbor from './nearestnei';
import nearestInsertion from './nearins';
import furthestInsertion from './furthest';
import convexHull from './convexhull';
import data from './data';
//variables
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
const types = { add: 'CHANGE_INPUT_VALUE' };
const reducer = (state, { type, by = 1 }) => {
  switch (type) {
    case types.add:
      return { caption: by };
  }
};
const red = (state, { type, by = 1 }) => {
  switch (type) {
    case types.add:
      return { delay: by };
  }
};
const handleRandom = () => {
  return Array.from({ length: 29 }).map(() => [
    Math.random() * -40 - 80,
    Math.random() * 15 + 30,
  ]);
};
const useStore = create((set, get) => ({
  caption: 'nearest neighbor',
  dispatch: (args) => set((state) => reducer(state, args)),
  setDelay: (args) => set((state) => red(state, args)),
  reset: () => set({ aniPaths: [], pts: data() }),
  setRandom: () => {
    set({ pts: handleRandom(), dist: 0, best: 0, aniPaths: [] });
  },
  aniPaths: [],
  running: false,

  dist: 0,
  color: [23, 108, 213],
  delay: 100,
  best: 0,
  pts: data(),
  setAni: async () => {
    set({ running: true });
    const points = get().pts.slice();
    const [routes, cost] =
      get().caption === 'nearest neighbor'
        ? nearestNeighbor(points)
        : get().caption === 'arbitrary insertion'
        ? arbitraryInsertion(points)
        : get().caption === 'nearest insertion'
        ? nearestInsertion(points)
        : get().caption === 'furthest insertion'
        ? furthestInsertion(points)
        : convexHull(points);

    set({ aniPaths: [] });
    set({ color: [23, 108, 213] });
    set({ dist: 0 });
    for (let i = 0; i < routes.length; i++) {
      set((state) => {
        const aniPaths = [...state.aniPaths];
        aniPaths.push(routes[i]);
        return { aniPaths };
      });
      await sleep(
        get().caption === 'nearest neighbor' ? get().delay * 0.5 : get().delay
      );
    }
    set({ dist: cost });
    set({ color: [93, 170, 80] });
    if (!get().best) {
      set({ best: get().dist });
    } else if (get().best > get().dist) {
      set({ best: get().dist });
    }
    set({ running: false });
  },
}));
export default useStore;

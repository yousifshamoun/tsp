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
//algos

// const routes = arbitraryInsertion();

//store starts
const useStore = create((set, get) => ({
  caption: 'nearest neighbor',
  dispatch: (args) => set((state) => reducer(state, args)),
  setDelay: (args) => set((state) => red(state, args)),
  // setToggled: () => set((state) => ({ toggle: !state.toggle })),
  // clearPaths: () => set({ aniPaths: [] }),

  aniPaths: [],
  dist: 0,
  points: data,
  color: [0, 176, 255],
  delay: 100,
  best: 0,
  setAni: async () => {
    const [routes, cost] =
      get().caption === 'nearest neighbor'
        ? nearestNeighbor()
        : get().caption === 'arbitrary insertion'
        ? arbitraryInsertion()
        : get().caption === 'nearest insertion'
        ? nearestInsertion()
        : get().caption === 'furthest insertion'
        ? furthestInsertion()
        : convexHull();

    set({ aniPaths: [] });
    set({ color: [0, 176, 255] });
    set({ dist: 0 });
    for (let i = 0; i < routes.length; i++) {
      set((state) => {
        const aniPaths = [...state.aniPaths];
        aniPaths.push(routes[i]);
        return { aniPaths };
      });
      await sleep(get().delay);
    }
    set({ dist: cost });
    set({ color: [93, 170, 80] });
    if (!get().best) {
      set({ best: get().dist });
    } else if (get().best > get().dist) {
      set({ best: get().dist });
    }
    console.log(get().delay);
  },
  //   setAni: async () => {
  //     set((state) => {
  //       const aniPaths = [...state.aniPaths]; // copy the array
  //       aniPaths.push({
  //         start: [-73.85835427500902, 40.56507951957753],
  //         end: [-77.54976052500858, 38.772432514145194],
  //       });
  //       return { aniPaths };
  //     });
  //     //set ends
  //     await sleep(500);
  //   },
}));
export default useStore;

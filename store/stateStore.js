import create from 'zustand';
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
import nearestNeighbor from './nearest';
const routes = nearestNeighbor();
const useStore = create((set, get) => ({
  // setToggled: () => set((state) => ({ toggle: !state.toggle })),
  // clearPaths: () => set({ aniPaths: [] }),
  aniPaths: [],
  setAni: async () => {
    for (let i = 0; i < routes.length; i++) {
      set((state) => {
        const aniPaths = [...state.aniPaths]; // copy the array
        aniPaths.push(routes[i]);
        return { aniPaths };
      });
      await sleep(100);
    }
    console.log(get().aniPaths);
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

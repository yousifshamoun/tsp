import create from 'zustand';
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
const useStore = create((set) => ({
  toggle: false,
  setToggled: () => set((state) => ({ toggle: !state.toggle })),
  aniPaths: [],
  setAni: async () => {
    set((state) => {
      const aniPaths = [...state.aniPaths]; // copy the array
      aniPaths.push({
        start: [-73.85835427500902, 40.56507951957753],
        end: [-77.54976052500858, 38.772432514145194],
      });
      return { aniPaths };
    });
    //set ends
    await sleep(500);
    set((state) => {
      const aniPaths = [...state.aniPaths]; // copy the array
      aniPaths.push({
        start: [-77.54976052500858, 38.772432514145194],
        end: [-78.91206521250587, 42.66742768420476],
      });
      return { aniPaths };
    });
  },
}));
export default useStore;

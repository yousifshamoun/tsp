import distance from './distance';
const pathCost = (path) => {
  return path
    .slice(0, -1)
    .map((point, idx) => distance(point, path[idx + 1]))
    .reduce((a, b) => a + b, 0);
};
const nearestInsertion = () => {
  const points = [
    [-73.85835427500902, 40.56507951957753],
    [-77.54976052500858, 38.772432514145194],
    [-78.91206521250587, 42.66742768420476],
    [-70.95796365000933, 42.66742768420476],
    [-80.27436990000314, 26.176558881220437],
    [-84.4052292750001, 34.108547937473524],
    [-82.55952615000031, 28.24770207922181],
    [-84.66890115000008, 30.089457425014395],
    [-89.89839333750201, 29.746655988569763],
    [-96.62202615000125, 32.640688397241334],
    [-95.3036667750014, 29.287759374472813],
    [-97.76460427500368, 30.089457425014395],
    [-101.89546365000065, 34.97727964358472],
    [-112.22261208749687, 33.23080293029681],
    [-111.38765114999953, 35.01327961148759],
    [-115.56245583750162, 36.08588188690158],
    [-118.63862771249869, 33.999320468363095],
    [-117.2323777124963, 32.97311239658548],
    [-123.12104958749816, 38.222145234071036],
    [-124.26362771250061, 41.13019627380825],
    [-120.13276833749595, 39.72528830651809],
    [-111.82710427499693, 41.13019627380825],
    [-105.2353073999977, 39.961475963760066],
    [-87.43745583749975, 41.69048709677229],
    [-93.1064011499991, 45.29144400095841],
    [-90.20601052499944, 38.772432514145194],
    [-117.27632302500142, 47.50341272285311],
    [-122.72554177499823, 45.8757982618686],
    [-122.81343240000076, 48.152468818056875],
  ];
  // from the starting point
  const path = [points.shift()];

  //
  // INITIALIZATION - go to the nearest point first
  //
  points.sort((a, b) => distance(path[0], b) - distance(path[0], a));
  path.push(points.pop());

  while (points.length > 0) {
    //
    // SELECTION - nearest point to the path
    //
    let [selectedDistance, selectedIdx] = [Infinity, null];
    for (const [freePointIdx, freePoint] of points.entries()) {
      for (const pathPoint of path) {
        const dist = distance(freePoint, pathPoint);
        if (dist < selectedDistance) {
          [selectedDistance, selectedIdx] = [dist, freePointIdx];
        }
      }
    }

    // get the next point to add
    const [nextPoint] = points.splice(selectedIdx, 1);

    //
    // INSERTION - find the insertion spot that minimizes distance
    //
    let [bestCost, bestIdx] = [Infinity, null];
    for (let i = 1; i < path.length; i++) {
      const insertionCost = pathCost([path[i - 1], nextPoint, path[i]]);
      if (insertionCost < bestCost) {
        [bestCost, bestIdx] = [insertionCost, i];
      }
    }
    path.splice(bestIdx, 0, nextPoint);
  }

  // return to start after visiting all other points
  path.push(path[0]);
  const routes = [];
  let l = 0;
  let r = 1;
  while (path.length > r) {
    routes.push({ start: path[l], end: path[r] });
    l += 1;
    r += 1;
  }
  const cost = pathCost(path);

  return [routes, cost];
};
export default nearestInsertion;

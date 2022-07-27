import distance from './distance';
const counterClockWise = (p, q, r) => {
  return (q[0] - p[0]) * (r[1] - q[1]) < (q[1] - p[1]) * (r[0] - q[0]);
};
const pathCost = (path) => {
  return path
    .slice(0, -1)
    .map((point, idx) => distance(point, path[idx + 1]))
    .reduce((a, b) => a + b, 0);
};
const convexHull = () => {
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
  const sp = points[0];

  // Find the "left most point"
  let leftmost = points[0];
  for (const p of points) {
    if (p[1] < leftmost[1]) {
      leftmost = p;
    }
  }

  const path = [leftmost];

  while (true) {
    const curPoint = path[path.length - 1];
    let [selectedIdx, selectedPoint] = [0, null];

    // find the "most counterclockwise" point
    for (let [idx, p] of points.entries()) {
      if (!selectedPoint || counterClockWise(curPoint, p, selectedPoint)) {
        [selectedIdx, selectedPoint] = [idx, p];
      }
    }

    // adding this to the hull so it's no longer available
    points.splice(selectedIdx, 1);

    // back to the furthest left point, formed a cycle, break
    if (selectedPoint === leftmost) {
      break;
    }

    // add to hull
    path.push(selectedPoint);
  }

  while (points.length > 0) {
    let [bestRatio, bestPointIdx, insertIdx] = [Infinity, null, 0];

    for (let [freeIdx, freePoint] of points.entries()) {
      // for every free point, find the point in the current path
      // that minimizes the cost of adding the point minus the cost of
      // the original segment
      let [bestCost, bestIdx] = [Infinity, 0];
      for (let [pathIdx, pathPoint] of path.entries()) {
        const nextPathPoint = path[(pathIdx + 1) % path.length];

        // the new cost minus the old cost
        const evalCost =
          pathCost([pathPoint, freePoint, nextPathPoint]) -
          pathCost([pathPoint, nextPathPoint]);

        if (evalCost < bestCost) {
          [bestCost, bestIdx] = [evalCost, pathIdx];
        }
      }

      // figure out how "much" more expensive this is with respect to the
      // overall length of the segment
      const nextPoint = path[(bestIdx + 1) % path.length];
      const prevCost = pathCost([path[bestIdx], nextPoint]);
      const newCost = pathCost([path[bestIdx], freePoint, nextPoint]);
      const ratio = newCost / prevCost;

      if (ratio < bestRatio) {
        [bestRatio, bestPointIdx, insertIdx] = [ratio, freeIdx, bestIdx + 1];
      }
    }

    const [nextPoint] = points.splice(bestPointIdx, 1);
    path.splice(insertIdx, 0, nextPoint);
  }

  // rotate the array so that starting point is back first
  const startIdx = path.findIndex((p) => p === sp);
  path.unshift(...path.splice(startIdx, path.length));

  // go back home
  path.push(sp);
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
export default convexHull;

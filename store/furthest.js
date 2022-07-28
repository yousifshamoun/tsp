import distance from './distance';
const pathCost = (path) => {
  return path
    .slice(0, -1)
    .map((point, idx) => distance(point, path[idx + 1]))
    .reduce((a, b) => a + b, 0);
};
const furthestInsertion = (points) => {
  // from the starting point
  const path = [points.shift()];

  //
  // INITIALIZATION - go to the nearest point first
  //
  points.sort((a, b) => distance(path[0], b) - distance(path[0], a));
  path.push(points.pop());

  while (points.length > 0) {
    //
    // SELECTION - furthest point from the path
    //
    let [selectedDistance, selectedIdx] = [0, null];
    for (const [freePointIdx, freePoint] of points.entries()) {
      // find the minimum distance to the path for freePoint
      let [bestCostToPath, costToPathIdx] = [Infinity, null];
      for (const pathPoint of path) {
        const dist = distance(freePoint, pathPoint);
        if (dist < bestCostToPath) {
          [bestCostToPath, costToPathIdx] = [dist, freePointIdx];
        }
      }

      // if this point is further from the path than the currently selected
      if (bestCostToPath > selectedDistance) {
        [selectedDistance, selectedIdx] = [bestCostToPath, costToPathIdx];
      }
    }
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
export default furthestInsertion;

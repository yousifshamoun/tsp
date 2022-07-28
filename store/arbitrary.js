import distance from './distance';
const pathCost = (path) => {
  return path
    .slice(0, -1)
    .map((point, idx) => distance(point, path[idx + 1]))
    .reduce((a, b) => a + b, 0);
};
const arbitraryInsertion = (points) => {
  // from the starting point
  const path = [points.shift()];

  //
  // INITIALIZATION - go to the nearest point
  //
  points.sort((a, b) => distance(path[0], b) - distance(path[0], a));
  path.push(points.pop());

  // randomly sort points - this is the order they will be added
  // to the path
  points.sort(() => Math.random() - 0.5);

  while (points.length > 0) {
    //
    // SELECTION - choose a next point randomly
    //
    const nextPoint = points.pop();

    //
    // INSERTION -find the insertion spot that minimizes distance
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
export default arbitraryInsertion;

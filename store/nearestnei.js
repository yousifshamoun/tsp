import distance from './distance';
const pathCost = (path) => {
  return path
    .slice(0, -1)
    .map((point, idx) => distance(point, path[idx + 1]))
    .reduce((a, b) => a + b, 0);
};
const nearestNeighbor = (points) => {
  const path = [points.shift()];

  while (points.length > 0) {
    points.sort(
      (a, b) =>
        distance(path[path.length - 1], b) - distance(path[path.length - 1], a)
    );

    path.push(points.pop());
  }

  path.push(path[0]);

  const routes = [];
  let l = 0;
  let r = 1;
  while (path.length > r) {
    routes.push({ start: path[l], end: path[r] }, distance(path[l], path[r]));
    l += 1;
    r += 1;
  }
  const cost = pathCost(path);

  return [routes, cost];
};
export default nearestNeighbor;

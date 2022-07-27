import React from 'react';
import MapGL from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer, LineLayer } from '@deck.gl/layers';
import useStore from '../store/stateStore';
const MAPBOX_TOKEN =
  'pk.eyJ1IjoiZm94dHJvdDM3MjEiLCJhIjoiY2w1ejBsMzNuMTkyZjNjcGdmMGthanh0ZyJ9._IkSbktADaTeWWzs249ELw'; // Set your mapbox token here

export default function Home() {
  const aniPaths = useStore((state) => state.aniPaths);
  const color = useStore((state) => state.color);
  const MALE_COLOR = [0, 176, 255];
  const FEMALE_COLOR = [234, 67, 53];

  const usTop12 = [
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

  const viewport = {
    latitude: 39.8097343,
    longitude: -98.5556199,
    zoom: 4,
  };
  const layer = [
    new ScatterplotLayer({
      id: 'scatter-plot',
      data: usTop12,
      radiusMinPixels: 5,
      getPosition: (d) => [d[0], d[1], 0],
      getColor: (d) => (d[2] === 1 ? MALE_COLOR : FEMALE_COLOR),
    }),

    new LineLayer({
      data: aniPaths,
      opacity: 0.8,
      getSourcePosition: (d) => d.start,
      getTargetPosition: (d) => d.end,
      getColor: color,
      getWidth: (d) => 3,
    }),
  ];

  return (
    <div style={{ height: '100vh', width: '78vw', position: 'relative' }}>
      <DeckGL initialViewState={viewport} controller={true} layers={layer}>
        <MapGL
          mapStyle="mapbox://styles/mapbox/light-v8"
          mapboxAccessToken={MAPBOX_TOKEN}
        />
      </DeckGL>
    </div>
  );
}

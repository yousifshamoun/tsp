import React from 'react';
import MapGL from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer, LineLayer } from '@deck.gl/layers';
import useStore from '../store/stateStore';
const MAPBOX_TOKEN =
  'pk.eyJ1IjoiZm94dHJvdDM3MjEiLCJhIjoiY2w1ejBsMzNuMTkyZjNjcGdmMGthanh0ZyJ9._IkSbktADaTeWWzs249ELw'; // Set your mapbox token here

export default function Home() {
  const toggle = useStore((state) => state.toggle);
  const aniPaths = useStore((state) => state.aniPaths);
  const MALE_COLOR = [0, 128, 255];
  const FEMALE_COLOR = [255, 0, 128];

  const flightPaths = [
    {
      start: [-73.85835427500902, 40.56507951957753],
      end: [-70.95796365000933, 42.66742768420476],
    },
    {
      start: [-70.95796365000933, 42.66742768420476],
      end: [-78.91206521250587, 42.66742768420476],
    },
    {
      start: [-78.91206521250587, 42.66742768420476],
      end: [-77.54976052500858, 38.772432514145194],
    },
    {
      start: [-77.54976052500858, 38.772432514145194],
      end: [-84.4052292750001, 34.108547937473524],
    },
    {
      start: [-84.4052292750001, 34.108547937473524],
      end: [-84.66890115000008, 30.089457425014395],
    },
    {
      start: [-84.66890115000008, 30.089457425014395],
      end: [-82.55952615000031, 28.24770207922181],
    },
    {
      start: [-82.55952615000031, 28.24770207922181],
      end: [-80.27436990000314, 26.176558881220437],
    },
    {
      start: [-80.27436990000314, 26.176558881220437],
      end: [-89.89839333750201, 29.746655988569763],
    },
    {
      start: [-89.89839333750201, 29.746655988569763],
      end: [-95.3036667750014, 29.287759374472813],
    },
    {
      start: [-95.3036667750014, 29.287759374472813],
      end: [-97.76460427500368, 30.089457425014395],
    },
    {
      start: [-97.76460427500368, 30.089457425014395],
      end: [-96.62202615000125, 32.640688397241334],
    },
    {
      start: [-96.62202615000125, 32.640688397241334],
      end: [-101.89546365000065, 34.97727964358472],
    },
    {
      start: [-101.89546365000065, 34.97727964358472],
      end: [-105.2353073999977, 39.961475963760066],
    },
    {
      start: [-105.2353073999977, 39.961475963760066],
      end: [-111.82710427499693, 41.13019627380825],
    },
    {
      start: [-111.82710427499693, 41.13019627380825],
      end: [-115.56245583750162, 36.08588188690158],
    },
    {
      start: [-115.56245583750162, 36.08588188690158],
      end: [-118.63862771249869, 33.999320468363095],
    },
    {
      start: [-118.63862771249869, 33.999320468363095],
      end: [-117.2323777124963, 32.97311239658548],
    },
    {
      start: [-117.2323777124963, 32.97311239658548],
      end: [-112.22261208749687, 33.23080293029681],
    },
    {
      start: [-112.22261208749687, 33.23080293029681],
      end: [-111.38765114999953, 35.01327961148759],
    },
    {
      start: [-111.38765114999953, 35.01327961148759],
      end: [-120.13276833749595, 39.72528830651809],
    },
    {
      start: [-120.13276833749595, 39.72528830651809],
      end: [-123.12104958749816, 38.222145234071036],
    },
    {
      start: [-123.12104958749816, 38.222145234071036],
      end: [-124.26362771250061, 41.13019627380825],
    },
    {
      start: [-124.26362771250061, 41.13019627380825],
      end: [-122.72554177499823, 45.8757982618686],
    },
    {
      start: [-122.72554177499823, 45.8757982618686],
      end: [-122.81343240000076, 48.152468818056875],
    },
    {
      start: [-122.81343240000076, 48.152468818056875],
      end: [-117.27632302500142, 47.50341272285311],
    },
    {
      start: [-117.27632302500142, 47.50341272285311],
      end: [-93.1064011499991, 45.29144400095841],
    },
    {
      start: [-93.1064011499991, 45.29144400095841],
      end: [-87.43745583749975, 41.69048709677229],
    },
    {
      start: [-87.43745583749975, 41.69048709677229],
      end: [-90.20601052499944, 38.772432514145194],
    },
    {
      start: [-90.20601052499944, 38.772432514145194],
      end: [-73.85835427500902, 40.56507951957753],
    },
  ];
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
      // data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/examples/scatterplot/manhattan.json',
      radiusScale: 10,
      radiusMinPixels: 8,
      getPosition: (d) => [d[0], d[1], 0],
      getColor: (d) => (d[2] === 1 ? MALE_COLOR : FEMALE_COLOR),
    }),

    new LineLayer({
      // id: 'flight-paths',
      data: aniPaths,
      // data: flightPaths,
      opacity: 0.8,
      getSourcePosition: (d) => d.start,
      getTargetPosition: (d) => d.end,
      getColor: MALE_COLOR,
      getWidth: (d) => 5,
    }),
  ];

  return (
    <div style={{ height: '100vh', width: '78vw', position: 'relative' }}>
      <DeckGL
        initialViewState={viewport}
        controller={true}
        //toggle initially false
        layers={toggle ? layer : layer[0]}
      >
        <MapGL
          mapStyle="mapbox://styles/mapbox/light-v8"
          mapboxAccessToken={MAPBOX_TOKEN}
        />
      </DeckGL>
    </div>
  );
}

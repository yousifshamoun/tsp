import React from 'react';
import MapGL from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer, LineLayer } from '@deck.gl/layers';
import useStore from '../store/stateStore';
const MAPBOX_TOKEN =
  'pk.eyJ1IjoiZm94dHJvdDM3MjEiLCJhIjoiY2w1ejBsMzNuMTkyZjNjcGdmMGthanh0ZyJ9._IkSbktADaTeWWzs249ELw'; // Set your mapbox token here

export default function Home() {
  const aniPaths = useStore((state) => state.aniPaths);
  const pts = useStore((state) => state.pts);
  const color = useStore((state) => state.color);
  const POINT_COLOR = [234, 67, 53];

  const viewport = {
    latitude: 39.8097343,
    longitude: -98.5556199,
    zoom: 4,
  };
  const layer = [
    new ScatterplotLayer({
      id: 'scatter-plot',
      data: pts,
      radiusMinPixels: 5,
      getPosition: (d) => [d[0], d[1], 0],
      getColor: (d) => POINT_COLOR,
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

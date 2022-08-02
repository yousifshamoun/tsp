import React from 'react';
import MapGL from 'react-map-gl';
import Box from '@mui/material/Box';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer, LineLayer } from '@deck.gl/layers';
import useStore from '../store/stateStore';

export default function Home() {
  const aniPaths = useStore((state) => state.aniPaths);
  const pts = useStore((state) => state.pts);
  const color = useStore((state) => state.color);
  const POINT_COLOR = [234, 67, 53];

  const viewport = {
    latitude: 40,
    longitude: -89,
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
    <Box sx={{ height: '100%', width: '100%', position: 'absolute' }}>
      <DeckGL initialViewState={viewport} controller={true} layers={layer}>
        <MapGL
          mapStyle="mapbox://styles/mapbox/light-v8"
          mapboxAccessToken={`${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
        />
      </DeckGL>
    </Box>
  );
}

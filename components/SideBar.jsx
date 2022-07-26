import React, { useState } from 'react';
import { MdCardTravel } from 'react-icons/md';
import { AiFillGithub } from 'react-icons/ai';
import Link from 'next/link';
import useStore from '../store/stateStore';
import AlgoView from './AlgoView';
import Map from './MapPlot';
const SideBar = () => {
  const { dist, best } = useStore();
  const [Started, setStarted] = useState(false);
  return (
    <div className="flex flex-col p-[16px] ">
      <div className="w-[380px] h-[50px] gap-10">
        <div>
          <div
            className="flex items-center gap-2 p-3 
            justify-center xl:justify-start font-semibold
            border-b-2"
          >
            <p className="text-2xl ">
              <MdCardTravel />
            </p>
            <span className="text-xl">TSP Visualizer</span>
            <div className="pl-10  cursor-pointer">
              <a
                rel="noopener noreferrer"
                target="_blank"
                href="https://github.com/yousifshamoun/tsp"
              >
                <AiFillGithub className="text-xl" />
              </a>
            </div>
          </div>
          <div
            className="p-3 text-gray-500 font-semibold 
          text-sm border-b-2"
          >
            Visualize algorithms for the traveling salesman problem. Use the
            algorithms below to find the shortest possible route between all
            selected points.
          </div>
          <div
            className="p-3 flex justify-between text-gray-500 font-semibold 
          text-sm "
          >
            CURRENT PATH:
            <span className="text-gray-800">
              {dist ? dist.toFixed(2) : ''} KM
            </span>
          </div>
          <div
            className="p-3 flex justify-between text-gray-500 font-semibold 
          text-sm "
          >
            BEST PATH:
            <span className="text-gray-800">
              {best ? best.toFixed(2) : ''} KM
            </span>
          </div>
          <AlgoView />
        </div>
      </div>
    </div>
  );
};

export default SideBar;

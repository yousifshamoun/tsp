import React, { useState } from 'react';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { AiFillFastForward } from 'react-icons/ai';
import { IoMdRefresh } from 'react-icons/io';
import useStore from '../store/stateStore';
import Delay from './Delay';
const AlgoView = () => {
  const setAni = useStore((state) => state.setAni);
  const clearPaths = useStore((state) => state.clearPaths);
  // const clearPaths = useStore((state) => state.clearPaths);
  const setToggled = useStore((state) => state.setToggled);
  const topics = [
    {
      name: 'nearest neighbor',
    },
    {
      name: 'arbitrary insertion',
    },
    {
      name: 'nearest insertion',
    },
    {
      name: 'furthest insertion',
    },
    {
      name: 'convex hull',
    },
    {
      name: 'simulated annealing',
    },
  ];
  //states
  const [started, setStarted] = useState(true);
  return (
    <div
      className="border-2 border-[#00819E] w-[380px] h-[350px] rounded p-3
    "
    >
      <div className="text-gray-500 font-semibold mt-2">ALGORITHM</div>
      <select
        className="mt-2 w-full outline-none border-2 border-gray-200 text-md capitalize 
            p-2 rounded cursor-pointer
            hover:border-black"
      >
        {topics.map((topic) => (
          <option key={topic.name} value={topic.name}>
            {topic.name}
          </option>
        ))}
      </select>
      <div className="text-gray-500 font-semibold mt-4 mb-2">CONTROLS</div>
      <div
        className="flex justify-center items-center 
      rounded w-full border-2 h-[45px] border-[#00819E]"
      >
        <span
          onClick={() => {
            setStarted((prev) => !prev);
            // clearPaths();
            setAni();
          }}
          className="text-2xl cursor-pointer w-[33%] h-full items-center flex 
            justify-center border-r-2 border-[#00819E]"
        >
          {started ? (
            <BsFillPlayFill color="#00819E" />
          ) : (
            <BsFillPauseFill color="#00819E" />
          )}
        </span>

        <span
          className={`text-2xl  w-[33%] h-full items-center flex 
        justify-center border-r-2 border-[#00819E] ${
          !started && 'cursor-pointer'
        }`}
        >
          {started ? (
            <AiFillFastForward color="gray" />
          ) : (
            <AiFillFastForward color="#00819E" />
          )}
        </span>
        <span className="text-xl cursor-pointer w-[33%] flex justify-center">
          <IoMdRefresh color="#00819E" />
        </span>
      </div>
      <Delay />
    </div>
  );
};

export default AlgoView;

import React from 'react';
import { AiFillFastForward } from 'react-icons/ai';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { IoMdRefresh } from 'react-icons/io';

const Points = () => {
  return (
    <>
      <div className="text-gray-500 font-semibold mt-4 mb-2">CONTROLS</div>
      <div
        className="flex justify-center items-center 
      rounded w-full border-2 h-[45px] border-[#00819E]"
      >
        <span
          className="text-2xl cursor-pointer w-[33%] h-full items-center flex 
            justify-center border-r-2 border-[#00819E]"
        >
          <BsFillPlayFill color="#00819E" />
        </span>

        <span
          className={`text-2xl  w-[33%] h-full items-center flex 
        justify-center border-r-2 border-[#00819E] 
        }`}
        >
          <AiFillFastForward color="gray" />
        </span>
        <span className="text-xl cursor-pointer w-[33%] flex justify-center">
          <IoMdRefresh color="#00819E" />
        </span>
      </div>
    </>
  );
};

export default Points;

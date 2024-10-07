import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "../redux/movieSlice";
import * as React from "react";
import VideoBackground from "./VideoBackground";
import { FaWindowClose } from "react-icons/fa";

export default function MovieDialog() {
  const { open } = useSelector((store) => store.movie);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setOpen(false));
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center  justify-center z-50 ">
          {/* Overlay to darken the background */}
          <div className="fixed inset-0 bg-black opacity-75 " onClick={handleClose}></div>

          {/* Dialog box */}
          <div className="relative w-[90%]  sm:w-[70%]  bg-white z-40 p-4 rounded-md">
            {/* Close Button */}
            
            <div className="w-full flex justify-between">
              <p> Author: Deepak kumar</p>
              <FaWindowClose
                size="50px"
                onClick={handleClose}
                className="text-red-700 hover:cursor-pointer"
              />
            </div>

            {/* Video Content */}
            <VideoBackground videoCommingFrom={true} />
          </div>
        </div>
      )}
    </>
  );
}

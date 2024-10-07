import React from 'react'
import { CiPlay1 } from "react-icons/ci";
import { CiCircleInfo } from "react-icons/ci";
import { useSelector } from 'react-redux';

const VideoTitle = () => {
  const currSelectedMovie=useSelector(store=>store.movie.currSelectedMovie)
  return (
    <div className='absolute pl-2 sm:pl-8 h-full sm:h-3/4  w-[100vw] text-white pt-[18%]  '>
       
       <div className='w-3/4 text-xs sm:w-1/2 lg:w-1/4 '>
       <h1 className='sm:text-3xl font-bold'>{currSelectedMovie.title}</h1>
       <p className='text-xs sm:text-base'>{currSelectedMovie.overview.slice(0,90)}</p>
       </div>
       <div className='flex gap-2 mt-2 sm:mt-8'>
        <button className='px-4 sm:py-2 py-1 flex items-center gap-1 bg-white text-black rounded-md hover:bg-opacity-60'><CiPlay1  /><span>Play</span></button>
        <button className='px-4 sm:py-2 py-1 flex items-center gap-1 bg-white text-black rounded-md hover:bg-opacity-60'><CiCircleInfo /><span>Show more</span></button>
       
       </div>
    </div>
  )
}

export default VideoTitle
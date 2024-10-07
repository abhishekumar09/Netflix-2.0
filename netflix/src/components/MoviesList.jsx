import React from 'react'
import MovieCard from './MovieCard'

const MoviesList = ({title,movies,search=false}) => {

  return (
    <div className='w-full'>
       <h1 className={`text-xl sm:text-3xl text-center font-bold ${search===true?"text-black":"text-white"} mb-6`}>{title}</h1> 
       <div className={`${search===true?"flex-wrap":"overflow-x-auto scrollbar-hide"} cursor-pointer flex  w-full`}>
         <div className={`flex ${search===true?"flex-wrap justify-center":""}  items-center  w-full`}>
            {movies&&
            movies.map(movie=>(<MovieCard key={movie.id} imgUrl={movie.poster_path} title={movie.title} overview={movie.overview} id={movie.id}/>))
            }
            
         </div>
       </div>
    </div>
  )
}

export default MoviesList
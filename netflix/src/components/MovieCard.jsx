import React from 'react'
import { options, Tmbd_Base_Url } from '../utils/constant'

import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setCurrentSelectedMovie, setOpen } from '../redux/movieSlice'

const MovieCard = ({imgUrl,title,overview,id}) => {
    const dispatch=useDispatch()
    if(imgUrl===null) return;
    const handleCardClick=async ()=>{
        try{
         const res=await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`,options)
         if(res.status===200){
            const trailer=res.data.results.filter(item=>item.type=='Trailor')
            const key=trailer.length==0?res.data.results[0].key:trailer[0].key;
            dispatch(setCurrentSelectedMovie({id,title,overview,key}));
            dispatch(setOpen(true));
         }
        }catch(err){
         console.log(err)
        }
    }
  return (
    <div className='w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 shrink-0 p-2 border-gray-200 border-solid border-2 ' onClick={handleCardClick}>
        <img src={`${Tmbd_Base_Url}/${imgUrl}`} alt="moviecard" className='object-cover  shadow-lg shadow-black w-full  '/>
    </div>
  )
}

export default MovieCard
import { useSelector } from "react-redux";


const VideoBackground = ({videoCommingFrom=false}) => {
  const key=useSelector(store=>store.movie.currSelectedMovie.key)

 

  return (
    <div className="overflow-hidden ">
      
        <iframe
          className={`${videoCommingFrom?"w-[100%]":"w-screen "} aspect-video`}
          src={`https://www.youtube.com/embed/${key}?si=kXezTBM1k3a_VBr-&autoplay=1&mute=1&&cc_load_policy=0&&showinfo=0&rel=0&loop=1&playlist=${key}`}
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      
    </div>
  );
};

export default VideoBackground;

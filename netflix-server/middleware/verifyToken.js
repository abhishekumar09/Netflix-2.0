import  jwt from 'jsonwebtoken'
export const verifytoken=async(req,res,next)=>{
    try{
        console.log("verifying..")
        const token=req.cookies.jwt;
        if(!token){ 
            console.log("not able to find cookie")
            return res.status(401).json({success:false,message:"cookies not found !"})
        }
        console.log("cookie got !")
            jwt.verify(token,process.env.JWT_KEY,(err,payload)=>{
        if(err){
            console.log("err")
            return res.status(401).json({success:false,message:"user not authenticated"});
        }
        
        req.userId=payload.id
       console.log("passed to nxt")
        return next();
        })
    }catch(err){
        console.log(err);
        return res.status(500).json("server internal error")
    }
}
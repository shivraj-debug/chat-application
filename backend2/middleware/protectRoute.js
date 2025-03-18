import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

const protectRoute=async (req,res,next)=>{
    try{
    const token=req.cookies.jwt;
    
    if(!token){
        return res.status(401).json({error:"no token provided"});
    }

    const decoded=jwt.verify(token,process.env.JWT_SECRET);

    if(!decoded){
        return res.status(401).json({error:"token is invalid"});
    }

    const user=await User.findById(decoded.userId).select("-password");

    if(!user){
        return res.status(404).json({error:"user not found"})
    }
    
    req.user=user;
 
    next();

   }catch(err){
    console.log("error in protesRoute:",err.message);
    res.status(500).json({err:"internal in protected route server error"});
   }
}

export default protectRoute;
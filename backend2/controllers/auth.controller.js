import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import generateToken from "../utils/jwttoken.js"
 
 export const signup= async (req,res) => {
      try{
         const {fullName,username,password,confirmPassword,gender}=req.body;
   
         if(password !== confirmPassword){
            return res.status(400).json({error:"password don't matched backend side"});
         }

         const user=await User.findOne({username});
         // console.log(user);

         if(user){
            return res.status(400).json({error:"username already exists"});
         }

         //hash password here
         const salt = await bcrypt.genSalt(10);
		   const hashedPassword = await bcrypt.hash(password, salt);

         const boyprofilepic=`https://avatar.iran.liara.run/public/boy?username=${username}`;
         const girlprofilepic=`https://avatar.iran.liara.run/public/girl?username=${username}`;

         const newuser=new User({
            fullName,
            username,
            password:hashedPassword,
            gender,
            profilePic : gender==="male" ? boyprofilepic : girlprofilepic
         });    
         // console.log(newuser)
         
         if(newuser){
            await newuser.save()

         res.status(201).json({
            _id:newuser._id,
            fullName:newuser.fullName,
            username:newuser.username,
            profilePic:newuser.profilePic,
            
         });
      }else{
         res.status(400).json({error:"invalid user data"});
      }
   }catch(error){
         console.log("error in signup controller",error.message);
         res.status(500).json({error:"internal server error"})
      }
 };

 export const login= async (req,res)=>{
      try{
         const {username,password}=req.body;

         const user=await User.findOne({username})
         const ispassword=await bcrypt.compare(password,user?.password || ""); //user?.password means if user exist then fetch it password else empty string

         if(!user || !ispassword){
            return res.status(400).json({error:"Invalid credentials"});
         }

         generateToken(user._id,res);

         res.status(201).json({
            _id: user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic,
            
         });

      }catch(err){
         console.log("error in login controller",err.message);
         res.status(500).json({err:"internal server error"})
      }
 };

 export const logout=(req,res)=>{
    try{
      //bhai logout ke liye mujhe jo user abhi login h uska data chahiye jo ki hame cookies se hi milega
       res.cookie("jwt" , "" , {
         maxAge: 0,         // Expire the cookie immediately
       });
       console.log(jwt);
       res.status(200).json({message:"logged out successfully"})

    }catch(err){
      console.log("error in logout controller",err.message);
      res.status(500).json({err:"internal server error"});
    }
 };

 //res: This is the response object provided by Express.js in the route handler. It is used to send a response back to the client.
 //.status(500): This method sets the HTTP status code of the response to 500. In HTTP, the status code 500 signifies an "Internal Server Error," which indicates that the server encountered an unexpected condition that prevented it from fulfilling the request..status(500): This method sets the HTTP status code of the response to 500. In HTTP, the status code 500 signifies an "Internal Server Error," which indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.
 //.json({ err: "internal server error" }): This method sends a JSON response. The argument passed to .json is an object, { err: "internal server error" }, which will be serialized into a JSON string and sent as the response body.

// err: This is a key in the JSON object.
// "internal server error": This is the value associated with the err key, providing a message that describes the error.

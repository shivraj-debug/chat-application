import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    confirmPassword:{
        type:String,
        // required:true,
        minlength:6
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    profilePic:{
        type:String,
        default:" "
    },
},{timestamps:true})

// Add an index for the `name` field
userSchema.index({ fullName: 1 }); // 

const User=mongoose.model("User",userSchema);

export default User;
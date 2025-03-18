import User from "../models/user.model.js";

export const getUsersForSidebar= async (req,res)=>{
    try{

         const loggedUserId=req.user._id; //here id general term but _id is key of document

         const alluser=await User.find({_id:{$ne: loggedUserId}}).select("-password") //it will find all user except loggedUser and password will not return 

         res.status(200).json(alluser);

    }catch(err){
        console.log("error in getusersidebar",err.message);
        res.status(500).json({err:"internal server error"});
    }
}

export const getSearchUser = async (req, res) => {
    try {
        const { name } = req.query; // Extract the 'name' query parameter
        if (!name || name.trim() === "") {
            return res.status(400).json({ message: "Search term is required" });
        }

        // Search for users whose 'name' field matches the query (case-insensitive)
        const users = await User.find({
            fullName: { $regex: name, $options: "i" } // 'i' for case-insensitivity
        }).limit(10); // Limit the number of results to 10


        if (users.length === 0) {
            return res.status(404).json({ message: "No users found!" });
        }

        res.status(200).json(users); // Send the results back to the client
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
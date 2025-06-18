import User from "../models/user.model.js";
import Group from "../models/group.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedUserId = req.user._id; 

    const alluser = await User.find({ _id: { $ne: loggedUserId } }).select(
      "-password"
    ); //it will find all user except loggedUser and password will not return

    const userGroups = await Group.find({ 'members.user': loggedUserId })
      .populate('members.user', 'fullName avatar description')
      .populate('createdBy', 'username email avatar')
      .sort({ updatedAt: -1 });

      // console.log('groups:', userGroups);

    res.status(200).json({
      users: alluser,
      groups: userGroups,
    });
  } catch (err) {
    console.log("error in getusersidebar", err.message);
    res.status(500).json({ err: "internal server error" });
  }
};

export const getSearchUser = async (req, res) => {
  try {
    const { name } = req.query; // Extract the 'name' query parameter
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Search term is required" });
    }

    // Search for users whose 'name' field matches the query (case-insensitive)
    const users = await User.find({
      fullName: { $regex: name, $options: "i" }, // Case-insensitive name search
    })
      .select("fullName username profilePic") // Select only needed fields
      .where("_id")
      .ne(req.user._id) // Exclude current user
      .sort({ fullName: 1 }) // Alphabetical order
      .limit(10); // Limit to 10 results

    //      const users = await User.find({
    //   $and: [
    //     { _id: { $ne: req.user.userId } },
    //     {
    //       $or: [
    //         { username: { $regex: q, $options: 'i' } },
    //         { email: { $regex: q, $options: 'i' } }
    //       ]
    //     }
    //   ]
    // })
    // .select('fullName')
    // .limit(10);

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found!" });
    }

    res.status(200).json(users); // Send the results back to the client
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const postProfile = async (req, res) => {
    try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'image' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    res.json({
      message: 'Image uploaded successfully!',
      url: result.secure_url,
      public_id: result.public_id
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
}

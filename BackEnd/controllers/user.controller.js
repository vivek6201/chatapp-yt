import User from "../models/user.model.js";
export const getAllUsers = async (req, res) => {
  try {
    const loggedinUser = req.user._id;
    const filteredUser = await User.find({ _id: { $ne: loggedinUser } }).select(
      "-password"
    ); // iska mtlb loggedin user ko chorr k sab user aur unka password nhi do.
    res.status(200).json(filteredUser);
  } catch (error) {
    console.log("Error in getAllUsers: ", error);
    res.status(500).json({ error: error.message });
  }
};

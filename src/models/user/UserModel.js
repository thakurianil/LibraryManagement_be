import UserSchema from "./UserSchema.js";

// create user function
export const createNewUser = (userObj) => {
  return UserSchema(userObj).save();
};

// get user by email
export const getUserByEmail = (email) => {
  return UserSchema.findOne({ email });
};

// get user by id
export const getUserById = (id) => {
  return UserSchema.findById(id);
};

// update user
export const updateUser = async (filter, obj) => {
  return await UserSchema.findOneAndUpdate(filter, obj);
};

// delete function

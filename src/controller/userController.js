import { createUsersService, deleteUsersService, getAllUsersService, getUsersByIdService, updateUsersService } from "../model/userModel.js";

// Standardized response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
}
// Create new user
export const createUser = async (req, res, next) => {
  // Retrive information from body
  const { name, email } = req.body;

  try {
    // Create user
    const newUser = await createUsersService(name, email);
    // Handle response function
    handleResponse(res, 201, "User created successfully", newUser);
  } catch (err) {
    // Middlewares error handling
    next(err);
  }
}
// Get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await getAllUsersService();

    if (!users) return handleResponse(res, 400, "User not found in db");

    handleResponse(res, 200, "User fetched successfully", users);
  } catch (err) {
    next(err)
  }
}

// Get all users by id
export const getUserById = async (req, res, next) => {
  try {
    const users = await getUsersByIdService(req.params.id);

    if (!users) return handleResponse(res, 404, "User id not found in db");

    handleResponse(res, 200, "User fetched successfully", users);
  } catch (err) {
    next(err)
  }
}

// Update users
export const updateUser = async (req, res, next) => {
  const { name, email } = req.body;
  try {
    const users = await updateUsersService(req.params.id, name, email);

    if (!users) return handleResponse(res, 404, "User update not success");

    handleResponse(res, 200, "User updated successfully", users);
  } catch (err) {
    next(err)
  }
}

// Delete users
export const deleteUser = async (req, res, next) => {
  try {
    const users = await deleteUsersService(req.params.id);

    if (!users) return handleResponse(res, 404, "User delete not success");

    handleResponse(res, 300, "User deleted successfully", users);
  } catch (err) {
    next(err)
  }
}
import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controller/userController.js";

const router = express.Router();

router.get("/user", getAllUsers);
router.post("/user", createUser);
router.get("/user/:id", getUserById);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", updateUser);  


export default router;
import express, { Router } from "express";
import dotenv from "dotenv";
import {
    signup,
    googleAuth,
    updateUserDetails,
    updateUserEmail,
    deleteUser,
} from "../controllers/userController";
import checkIfAuthenticated from "../middlewares/auth";

dotenv.config();

const router: Router = express.Router();

router.post("/register", signup);
router.post("/google", googleAuth);
router.put("/:id", checkIfAuthenticated, updateUserDetails);
router.put("/update-email/:id", checkIfAuthenticated, updateUserEmail);
router.delete("/:id", checkIfAuthenticated, deleteUser);

export { router as userRouter };

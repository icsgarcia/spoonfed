import { UserModel } from "../models/userModel";
import { Request, Response } from "express";
import admin from "../configs/firebase";

export const signup = async (req: Request, res: Response): Promise<any> => {
    const { username, email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.json({ msg: "User already exists!" });
        }

        const userDetails = await admin.auth().createUser({
            displayName: username,
            email: email,
            password: password,
        });

        const saveUser = new UserModel({
            uid: userDetails.uid,
            username,
            email,
        });

        await saveUser.save();

        res.json({ msg: "User created successfully" });
    } catch (error) {
        res.json({ error });
    }
};

export const googleAuth = async (req: Request, res: Response): Promise<any> => {
    const { uid, username, email } = req.body;
    try {
        const user = await UserModel.findOne({ uid });
        if (user) {
            return res.json({ msg: "User logging in..." });
        }

        const saveUser = new UserModel({
            uid,
            username,
            email,
        });

        await saveUser.save();

        res.json({ msg: "User created successfully, logging in..." });
    } catch (error) {
        res.json({ error });
    }
};

export const updateUserDetails = async (
    req: Request,
    res: Response
): Promise<any> => {
    const { id } = req.params;
    const { firstName, lastName, email, image } = req.body;

    try {
        await admin.auth().updateUser(id, {
            email,
            displayName: `${firstName} ${lastName}`,
            photoURL: image,
        });

        const updatedUser = await UserModel.findOneAndUpdate(
            { uid: id },
            {
                username: `${firstName} ${lastName}`,
                email,
                profilePicture: image,
            },
            { new: true }
        );

        res.json({ msg: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.log(error);
    }
};

export const updateUserEmail = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { newEmail } = req.body;

    try {
        await admin.auth().updateUser(id, {
            email: newEmail,
        });

        const updatedEmail = await UserModel.findOneAndUpdate(
            { uid: id },
            { email: newEmail },
            { new: true }
        );
        res.json({
            msg: "User's password updated successfully",
            user: updatedEmail,
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await admin.auth().deleteUser(id);

        await UserModel.findOneAndDelete({ uid: id });

        res.json({ msg: "User deleted successfully" });
    } catch (error) {
        console.log(error);
    }
};

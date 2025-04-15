import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    uid: {
        type: String,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    googleId: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId }],
});

export const UserModel = mongoose.model("users", UserSchema);

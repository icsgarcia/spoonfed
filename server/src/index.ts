import express, { Express } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users";
import { recipesRouter } from "./routes/recipes";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 3002;
const MONGODB_URI = process.env.MONGODB_URI as string;

const app: Express = express();
app.use(express.json());
app.use(
    cors({
        origin: "https://spoonfed-jr3xykhfd-ivancsgarcias-projects.vercel.app/",
        credentials: true,
    })
);

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

if (MONGODB_URI === "") {
    console.error("MONGODB_URI is not set");
} else {
    mongoose.connect(MONGODB_URI).then(() => {
        console.log("Connected to MongoDB");
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

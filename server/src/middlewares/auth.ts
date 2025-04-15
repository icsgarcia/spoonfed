import { Request, Response, NextFunction } from "express";
import admin from "../configs/firebase";

interface AuthRequest extends Request {
    authToken: string | null;
    authId: string;
}

const getAuthToken = (req: Request, res: Response, next: NextFunction) => {
    const authReq = req as AuthRequest;
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        authReq.authToken = req.headers.authorization.split(" ")[1];
    } else {
        authReq.authToken = null;
    }
    next();
};

const checkIfAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const authReq = req as AuthRequest;

    if (
        req.path === "/public-recipes" ||
        req.path === "/fetch-public-recipes"
    ) {
        return next();
    }

    getAuthToken(req, res, async () => {
        try {
            const { authToken } = authReq;
            if (authToken === null) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            const userInfo = await admin.auth().verifyIdToken(authToken);
            authReq.authId = userInfo.uid;
            next();
        } catch (error) {
            res.status(401).json({ error: `Error verifying token: ${error}` });
        }
    });
};

export default checkIfAuthenticated;

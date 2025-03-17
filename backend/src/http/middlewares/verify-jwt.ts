import { env } from "@/env";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface JwtPayload {
    sub: string;
}

export function verifyJwt(req: Request, res: Response, next: NextFunction): void {
    const token =
        req.cookies?.refreshToken || req.headers.authorization?.split(" ")[1];

    if (!token) {
        res
            .status(401)
            .json({ message: "Unauthorized. Token is missing." });
        return;
    }

    try {
        const decoded = jwt.verify(
            token,
            env.JWT_SECRET!
        ) as JwtPayload;
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid or expired token." });
        return;
    }
}

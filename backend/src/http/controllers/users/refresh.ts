import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "@/env";

export async function refresh(request: Request, response: Response): Promise<void> {
  try {
    const refreshTokenFromCookie = request.cookies?.refreshToken;

    if (!refreshTokenFromCookie) {
      response.status(401).send({ message: "Refresh token is missing" });
      return;
    }

    const decoded = jwt.verify(refreshTokenFromCookie, env.JWT_SECRET) as {
      sub: string;
    };

    const { sub } = decoded;

    const token = jwt.sign(
      { },
      env.JWT_SECRET,
      { subject: sub, expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { },
      env.JWT_SECRET,
      { subject: sub, expiresIn: "7d" }
    );

    response.cookie("refreshToken", refreshToken, {
      path: "/",
      secure: true,
      sameSite: "strict",
      httpOnly: true,
    });

    response.status(200).send({ token });
    return;
  } catch (error) {
    response.status(401).send({ message: "Invalid refresh token" });
    return;
  }
}

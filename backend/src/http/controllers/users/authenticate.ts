import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";
import { authenticateBodySchema } from "@/use-cases/schemas/authenticateBodySchema";
import { env } from "@/env";

export async function authenticate(request: Request, response: Response): Promise<void> {
    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
        const authenticateUseCase = makeAuthenticateUseCase();
        const { user } = await authenticateUseCase.execute({ email, password });

        const token = jwt.sign({ sub: user.id }, env.JWT_SECRET, {
            expiresIn: "1h",
        });

        const refreshToken = jwt.sign({}, env.JWT_SECRET, {
            subject: user.id.toString(),
            expiresIn: "7d",
        });

        response.cookie("refreshToken", refreshToken, {
            path: "/",
            secure: true,
            sameSite: "strict",
            httpOnly: true,
        });

        response.status(200).send({ token });
        return;
    } catch (err) {
        if (err instanceof InvalidCredentialsError) {
            response.status(400).send({ message: err.message });
            return;
        }

        console.error("🔥 Unexpected authentication error:", err);
        response.status(500).send({ message: "Internal server error" });
        return;
    }
}

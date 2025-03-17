import { Request, Response, NextFunction } from "express";
import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";
import { registerBodySchema } from "@/use-cases/schemas/registerBodySchema";

export async function register(
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { name, email, password } = registerBodySchema.parse(
            request.body
        );

        const registerUseCase = makeRegisterUseCase();

        await registerUseCase.execute({ name, email, password });

        response.status(201).send();

        return;
    } catch (err) {
        if (err instanceof UserAlreadyExistsError) {
            response.status(409).send({ message: err.message });
            return;
        }

        next(err);
    }
}

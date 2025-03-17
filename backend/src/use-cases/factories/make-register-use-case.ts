import { SequelizeUsersRepository } from "@/repositories/sequelize/sequelize-users-repository";
import { RegisterUseCase } from "../register";

export function makeRegisterUseCase() {
    const usersRepository = new SequelizeUsersRepository();
    const registerUseCase = new RegisterUseCase(usersRepository);

    return registerUseCase;
}

import { SequelizeUsersRepository } from "@/repositories/sequelize/sequelize-users-repository";
import { GetUserProfileUseCase } from "../get-user-profile";

export function makeGetUserProfileUseCase() {
    const usersRepository = new SequelizeUsersRepository();
    const useCase = new GetUserProfileUseCase(usersRepository);

    return useCase;
}

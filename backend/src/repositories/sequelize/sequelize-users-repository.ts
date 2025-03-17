import { UserModel } from "@/models/User";
import { UsersRepository } from "../users-repository";

export class SequelizeUsersRepository implements UsersRepository {
  async findById(id: string) {
    return await UserModel.findByPk(id);
  }

  async findByEmail(email: string) {
    return await UserModel.findOne({ where: { email } });
  }

  async create(data: { email: string; name: string; password: string }) {
    return await UserModel.create(data);
  }
}

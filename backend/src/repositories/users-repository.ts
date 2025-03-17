import type { User } from "@/models/User";

export interface UsersRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(data: {
        name: string;
        email: string;
        password: string;
    }): Promise<User>;
}

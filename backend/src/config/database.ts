import { env } from "@/env";
import { UserModel } from "@/models/User";
import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize(env.DATABASE_URL, {
    dialect: "postgres",
    logging: env.NODE_ENV === "dev",
    models: [UserModel]
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('👍 Connection has been established successfully.');
    } catch (error) {
        console.error('❌ Unable to connect to the database:', error);
    }
};

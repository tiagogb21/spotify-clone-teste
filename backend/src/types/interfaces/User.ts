import type { Optional } from "sequelize";

export interface User {
    id?: string;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserCreationAttributes
    extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> {}

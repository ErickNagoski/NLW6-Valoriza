import { getCustomRepository } from "typeorm";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UsersRepositories } from "../repositories/UsersRepositories";


interface IAuthenticateRequeste {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequeste) {
        const usersRepositories = getCustomRepository(UsersRepositories);


        const user = await usersRepositories.findOne({
            email
        });

        if (!user) {
            throw new Error("Email/Password incorrect")
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error("Email/Password incorrect");
        }

        const token = sign(
            {
            email: user.email
        }, "dd2bf38db13edaa617d87307c7b88fa6",{
            subject :user.id,
            expiresIn: "1d"
        }
    );

    return token;
    }
}

export { AuthenticateUserService };
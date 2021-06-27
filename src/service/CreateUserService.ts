import {getCustomRepository} from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories"
import {hash} from "bcryptjs";

interface IUserRequesty{
    name:string;
    email:string;
    admin?:boolean;
    password:string;
}

class CreateUserService{
    async execute({name,email,admin = false,password}){
        const usersRepository = getCustomRepository (UsersRepositories);

        if(!email){
            throw new Error("Email incorrect")
        }

        const passwordHash = await hash(password, 8);

        const userAlredyExists = await usersRepository.findOne({
            email
        });

        if(userAlredyExists){
            throw new Error("User alredy exists")
        }

        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash,
        })

        await usersRepository.save(user);

        return user;

    }

}

export {CreateUserService}
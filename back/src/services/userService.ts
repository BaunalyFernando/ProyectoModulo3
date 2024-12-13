import { UserRegisterDTO } from "../dtos/UserDTO";
import { IUser } from "../interfaces/IUsers";
import { createCredentialService } from "./credentialService";

const users: IUser[] = [
    {
        id: 1,
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        birthdate: new Date("1990-05-15"),
        nDni: "12345678",
        credentialsId: "cred001",
    },
    {
        id: 2,
        name: "Bob Smith",
        email: "bob.smith@example.com",
        birthdate: new Date("1985-09-10"),
        nDni: "87654321",
        credentialsId: "cred002",
    },
];

export const getUsersService = (): IUser[] => {
     return users;
}

export const getUserByIdService = (id: number): IUser | null => {
    if(!id){
        throw new Error("Missing id");
    }

    const userFound = users.find((user: IUser) => user.id === id);

    return userFound ? userFound : null;
}

export const createUserService = (user: UserRegisterDTO): void => {
    if(!user.name || !user.email || !user.birthdate || !user.nDni || !user.password || !user.username){
        throw new Error("Missing user data");
    }

    const createCredentials = createCredentialService({
        username: user.username,
        password: user.password
    });

     if(!createCredentials){
         throw new Error("Error creating credentials");
     }

    const newUser: IUser = {
        id: users.length + 1,
        name: user.name,
        email: user.email,
        birthdate: user.birthdate,
        nDni: user.nDni,
        credentialsId: createCredentials.toString()
        };
     

        users.push(newUser);
    
    
}
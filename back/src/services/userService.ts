import { AppDataSource, UserModel } from "../config/data-source";
import { UserDTO, UserRegisterDTO } from "../dtos/UserDTO";
import { Credential } from "../entities/Credential.entity";
import { User } from "../entities/User.entity";
import { createCredentialService } from "./credentialService";


export const getUsersService = async (): Promise<UserDTO[]> => {

    const usersFound: User[] = await UserModel.find();

     return usersFound;
}

export const getUserByIdService = async (id: number): Promise<UserDTO | null> => {
    if(!id){
        throw new Error("Missing id");
    }

    const userFound = await UserModel.findOne({ where: { id }
    });

    if(!userFound){
        throw new Error("User not found");
    }

    return userFound;
}

export const createUserService = async (user: UserRegisterDTO): Promise<User> => {
    const result = await AppDataSource.transaction(async (entityManager) => {
      const userCredential: Credential = await createCredentialService(
        entityManager,
        user.username,
        user.password
      );
      const newUser: User = entityManager.create(User, {
        name: user.name,
        email: user.email,
        birthdate: user.birthdate,
        nDni: user.nDni,
        credentials: userCredential,
      });
  
      return await entityManager.save(newUser);
    });
  
    return result;
  };
import { AppDataSource, CredentialModel, UserModel } from "../config/data-source";
import { UserDTO, UserLoginSucessDto, UserRegisterDTO } from "../dtos/UserDTO";
import { Credential } from "../entities/Credential.entity";
import { User } from "../entities/User.entity";
import { CustomError } from "../utils/customError";
import { createCredentialService, validateCredentialService } from "./credentialService";


export const getUsersService = async (): Promise<UserDTO[]> => {

    const usersFound: User[] = await UserModel.find();

     return usersFound;
}

export const getUserByIdService = async (id: number): Promise<UserDTO | null> => {
    if(!id){
        throw new CustomError(404,"Missing id");
    }

    const userFound = await UserModel.findOne({ where: { id },
        relations: ["appointments"]
    });

    if(!userFound){
        throw new CustomError(404,"User not found");
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

export const loginUserService = async (username: string, password: string): Promise<UserLoginSucessDto> => {

    const credentialId: number  = await validateCredentialService(username, password);

   const userFound: User | null = await UserModel.findOne({ where: { credentials: {
      id: credentialId 
    }
  }})


  return {
    login: true,
    user: {
      id: userFound?.id ?? 0,
      name: userFound?.name ?? "",
      email: userFound?.email ?? "",
      birthdate: userFound?.birthdate ?? new Date(),
      nDni: userFound?.nDni ?? 0
    }
  }

    
}
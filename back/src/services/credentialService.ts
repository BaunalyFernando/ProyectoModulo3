import { EntityManager } from 'typeorm';
import { CredentialModel } from '../config/data-source';
import { Credential } from '../entities/Credential.entity';
import { ICredentials } from '../interfaces/ICredentials';
import { CustomError } from '../utils/customError';

const credential: ICredentials[] = [
    {
        id: 1,
        username: "admin",
        password: "admin"
    }
] 

let id: number = 1;

export const createCredentialService: (entityManager: EntityManager, a: string, b:string) => Promise<Credential> = async (entityManager: EntityManager, username: string, password: string): Promise<Credential> => {

    if(!username){
        throw new CustomError(400, "Missing username");
    }

    if(!password){
        throw new CustomError(400,"Missing password");
    }

    const credentials: Credential = entityManager.create(Credential, {
      username,
      password,
    })
  
    return await entityManager.save(credentials);
  
   
  };

export const validateCredentialService = async (username: string, password: string): Promise<number> => {

    if(!password && !username){
        throw new CustomError(400, "Missing credentials");
    }


    const credentialFound: Credential | null = await CredentialModel.findOne(
        { where: { username: username, password: password },
        relations: ["user"]
        });

    if(!credentialFound){
        throw new CustomError(400, "Invalid credentials");
    }
    

    return credentialFound.id;
}
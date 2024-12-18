import { EntityManager } from 'typeorm';
import { CredentialModel } from '../config/data-source';
import { Credential } from '../entities/Credential.entity';
import { ICredentials } from '../interfaces/ICredentials';

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
        throw new Error("Missing username");
    }

    if(!password){
        throw new Error("Missing password");
    }

    const credentials: Credential = entityManager.create(Credential, {
      username,
      password
    })
  
    return await entityManager.save(credentials);
  
   
  };

export const validateCredentialService = async (username: string, password: string): Promise<Credential | null> => {

    if(!password && !username){
        throw new Error("Missing credentials");
    }


    const credentialFound = await CredentialModel.findOne({ where: { username: username, password: password }
        });

    if(!credentialFound){
        throw new Error("Invalid credentials");
    }
    

    return credentialFound;
}
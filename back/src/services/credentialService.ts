import { CredentialCreateDTO } from '../dtos/CredentialDTO';
import { ICredentials } from '../interfaces/ICredentials';

const credential: ICredentials[] = [
    {
        id: 1,
        username: "admin",
        password: "admin"
    }
] 

let id: number = 1;

export const createCredentialService: (a:string, b:string) => Promise<number> = async (username: string, password: string): Promise<number> => {

    if(!password && !username){
        throw new Error("Missing credentials");
    }

   const newCredential: ICredentials = {
        id,
        username,
        password
        };

    credential.push(newCredential);
    id++;

    return newCredential.id;
}

export const validateCredentialService = async (username: string, password: string): Promise<number | null> => {

    if(!password && !username){
        throw new Error("Missing credentials");
    }

    const usernameFound: ICredentials | undefined = credential.find((cred: ICredentials) => cred.username === username);

    if(!usernameFound){
        throw new Error("Invalid username");
    }

    const passwordFound: ICredentials | undefined = credential.find((cred: ICredentials) => cred.password === password);

    if(!passwordFound){
        throw new Error("Invalid username or password");

    }

    return usernameFound.id;
}
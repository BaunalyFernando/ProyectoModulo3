import { CredentialCreateDTO } from '../dtos/CredentialDTO';
import { ICredentials } from '../interfaces/ICredentials';

const credential: ICredentials[] = [
    {
        id: 1,
        username: "admin",
        password: "admin"
    }
] 

export const createCredentialService = (credentials: CredentialCreateDTO): number => {

    if(!credentials.password && !credentials.username){
        throw new Error("Missing credentials");
    }

   const newCredential: ICredentials = {
        id: credential.length + 1,
        username: credentials.username,
        password: credentials.password
        };

    credential.push(newCredential);

    return newCredential.id;
}

export const validateCredentialService = (credentials: CredentialCreateDTO): number | null => {

    if(!credentials.password && !credentials.username){
        throw new Error("Missing credentials");
    }

    const foundCredential = credential.find(
        (cred: ICredentials) =>
            cred.username === credentials.username &&
            cred.password === credentials.password
    );

    
    return foundCredential ? foundCredential.id : null;
}
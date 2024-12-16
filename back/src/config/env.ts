import "dotenv/config";


export const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
export const PASSWORD: string =  process.env.PASSWORD ? process.env.PASSWORD : "admin";

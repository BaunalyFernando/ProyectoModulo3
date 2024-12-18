import { Request, Response, NextFunction } from "express";
import { getUserByIdService } from "../services/userService";


export const validateUserIdMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
        res.status(400).json({ message: "Invalid or missing user ID" });
        return;
    }

    next();
};


export const validateUserRegisterMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { name, email, birthdate, nDni, username, password } = req.body;

    if (!name || !email || !birthdate || !nDni || !username || !password) {
        res.status(400).json({ message: "Missing user registration data" });
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!emailRegex.test(email)) {
        res.status(400).json({ message: "Invalid email format" });
        return;
    }

    if (!birthdateRegex.test(birthdate)) {
        res.status(400).json({ message: "Invalid birthdate format. Use YYYY-MM-DD" });
        return;
    }

    next();
};

export const validateUserLoginMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ message: "Missing login credentials" });
        return;
    }

    next();
};


export const checkUserExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
        const user = await getUserByIdService(Number(id));
        if (!user) {
            res.status(404).json({ message: `User with ID ${id} not found` });
            return;
        }

       
        (req as any).user = user;
        next();
    } catch (error) {
        res.status(400).json({
            message: "Error fetching user",
            data: error instanceof Error ? error.message : "unknown error",
        });
    }
};

import { Request, Response, NextFunction } from "express";
import { getAppointmentByIdService } from "../services/appointmentService";


export const validateIdMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
        res.status(400).json({ message: "Invalid or missing ID" });
        return;
    }

    next();
};


export const validateAppointmentDataMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const { date, time, userId } = req.body;

    if (!date || !time || !userId) {
        res.status(400).json({ message: "Missing appointment data (date, time, or userId)" });
        return;
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/; 
    const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/; 

    if (!dateRegex.test(date) || !timeRegex.test(time)) {
        res.status(400).json({ message: "Invalid date or time format" });
        return;
    }

    next();
};

export const checkAppointmentExistsMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
        const appointment = await getAppointmentByIdService(Number(id));
        if (!appointment) {
            res.status(404).json({ message: `Appointment with ID ${id} not found` });
            return;
        }

        
        (req as any).appointment = appointment;
        next();
    } catch (error) {
        res.status(400).json({
            message: "Error fetching appointment",
            data: error instanceof Error ? error.message : "unknown error",
        });
    }
};


import { Request, Response, NextFunction } from "express"

export const catchErrors = <Params, ResBody, ReqBody> (controller: (req: Request<Params, ResBody, ReqBody>, res: Response,next: NextFunction) => Promise<void>) => {

    return (req:Request<Params, ResBody, ReqBody>, res:Response, next: NextFunction) => {
        controller(req, res, next)
        .catch(error => next(error))
    }
}

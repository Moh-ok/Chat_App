import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { Types } from "mongoose";

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
}

export interface AuthenticatedRequest extends Request {
  user?: IUser & { _id: Types.ObjectId };
}

export const isAuth = async(req: AuthenticatedRequest, res: Response, next: NextFunction)
: Promise<void> => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            res.status(401).json({
                message: "Please Login - No Auth header"
            })
            return
        }

        const token = authHeader.split(" ")[1]
        
            if (!token) {
            throw new Error("Token missing");
            }
        
            const decodedValue = jwt.verify(
                token,
                process.env.JWT_SECRET as string
            ) as JwtPayload;
        
            if (!decodedValue || !decodedValue.user){
                res.status(401).json({
                  message: "Invalid token",
            });
             return;
            }
        
            req.user = decodedValue.user;
        
            next();
    } catch (error) {
        res.status(401).json({
            message: "Please Login - JWT error",
        });
    }
};

export default isAuth;
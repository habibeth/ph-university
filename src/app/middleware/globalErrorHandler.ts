import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong!"

    return res.status(statusCode).json({
        success: false,
        message,
        error: err
    })
}
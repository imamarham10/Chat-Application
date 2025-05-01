import { Response } from "express";
import { STATUS_CODES } from "../enums/status_codes";
interface ApiResponse {
    statusCode: number;
    message: string;
    data: unknown;
}

class ResponseUtil {
    private static initApiResponse(): ApiResponse {
        return {
            statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: "Unknown error",
            data: null,
        };
    }

    public static sendResponse(
        res: Response,
        statusCode: number,
        message: string,
        data: unknown,
    ): Response {
        const apiResponse = this.initApiResponse();
        apiResponse.statusCode = statusCode;
        apiResponse.message = message;
        apiResponse.data = data;
        return res.status(statusCode).json(apiResponse);
    }

    public static getCreatedResponse(res: Response, message: string, data: unknown): Response {
        return this.sendResponse(res, STATUS_CODES.CREATED, message, data); // 201 - Created
    }

    public static getBadRequestResponse(res: Response, message: string, data: unknown): Response {
        return this.sendResponse(res, STATUS_CODES.BAD_REQUEST, message, data); // 400 - Bad Request
    }

    public static getOkResponse(res: Response, message: string, data: unknown): Response {
        return this.sendResponse(res, STATUS_CODES.SUCCESS, message, data); // 200 - OK
    }

    public static getUnauthorizedResponse(res: Response, message: string, data: unknown): Response {
        return this.sendResponse(res, STATUS_CODES.UNAUTHORIZED, message, data); // 401 - Unauthorized
    }

    public static getConflictResponse(res: Response, message: string, data: unknown): Response {
        return this.sendResponse(res, STATUS_CODES.CONFLICT, message, data); // 409 - Conflict
    }

    public static getNotFoundResponse(res: Response, message: string, data: unknown): Response {
        return this.sendResponse(res, STATUS_CODES.NOT_FOUND, message, data); // 404 - Not Found
    }

    public static getInternalServerErrorResponse(
        res: Response,
        message: string,
        data: unknown,
    ): Response {
        return this.sendResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, message, data); // 500 - Internal Server Error
    }
}

export { ResponseUtil };

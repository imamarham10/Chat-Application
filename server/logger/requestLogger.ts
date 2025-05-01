import { isNullEmptyOrUndefined } from "../src/utils/global_utils"
import { Request } from "express";
interface LogRequestParams{
    req: Request;
    error?: unknown;
    data?: unknown;
}
export const logRequest = ({req, error, data}: LogRequestParams) => {
    if(isNullEmptyOrUndefined(error)){
        console.log(`Response from ${req.url} API: ${JSON.stringify(data)}`);
    }else{
        console.error(`Error from ${req.url} API: ${JSON.stringify(error)}`);
    }
}

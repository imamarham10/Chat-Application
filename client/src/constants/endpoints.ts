const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const VERIFY_USER = BACKEND_URL + "/auth/verify";
export const REGISTER_USER = BACKEND_URL + "/auth/register";
export const LOGIN_USER = BACKEND_URL + "/auth/login";
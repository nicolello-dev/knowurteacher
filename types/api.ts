import { NextApiResponse } from "next";

export interface APIResponse<T = any> extends NextApiResponse {
    success: boolean,
    data: T,
    error: string | null
}
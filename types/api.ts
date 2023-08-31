export interface APIResponse<T = any> {
    success: boolean,
    data: T | null,
    message: string | null
}
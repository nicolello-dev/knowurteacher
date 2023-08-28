export interface APIResponse<T = any> {
    success: boolean,
    data: T | null,
    error: string | null
}
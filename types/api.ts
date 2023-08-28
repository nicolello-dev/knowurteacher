export interface APIResponse<T = any> {
    success: boolean,
    data: T,
    error: string | null
}
import axios, { type AxiosRequestConfig } from 'axios'

type ApiProblem = {
    detail?: string
    message?: string
}

const apiClient = axios.create({
    withCredentials: true,
    headers: { Accept: 'application/json' },
})

async function request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
        const response = await apiClient.request<T>(config)
        return response.data
    } catch (error) {
        if (axios.isAxiosError<ApiProblem>(error)) {
            const problem = error.response?.data
            const message = problem?.detail ?? problem?.message
            throw new Error(message ?? 'Impossible de joindre le serveur.')
        }

        throw error
    }
}

export function apiGet<T>(url: string) {
    return request<T>({ method: 'GET', url })
}

export function apiPost<TResponse, TBody>(url: string, body: TBody) {
    return request<TResponse>({ method: 'POST', url, data: body })
}

export function apiPostEmpty<TResponse>(url: string) {
    return request<TResponse>({ method: 'POST', url })
}

export function apiPut<TResponse, TBody>(url: string, body: TBody) {
    return request<TResponse>({ method: 'PUT', url, data: body })
}

export function apiPatch<TResponse, TBody>(url: string, body: TBody) {
    return request<TResponse>({ method: 'PATCH', url, data: body })
}

export function apiDelete<TResponse>(url: string) {
    return request<TResponse>({ method: 'DELETE', url })
}
import { apiGet, apiPost, apiPostEmpty } from '../lib/api'
import type { LoginRequest, User } from '../types/user'

export const authApi = {
    login: (credentials: LoginRequest) => apiPost<User, LoginRequest>('/api/auth/login', credentials),
    currentUser: () => apiGet<User>('/api/auth/me'),
    logout: () => apiPostEmpty<void>('/api/auth/logout'),
}
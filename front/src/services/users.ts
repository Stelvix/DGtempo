import { apiPost } from '../lib/api'
import type { CreateUserRequest, User } from '../types/user'

export const usersApi = {
    create: (user: CreateUserRequest) => apiPost<User, CreateUserRequest>('/api/users', user),
}
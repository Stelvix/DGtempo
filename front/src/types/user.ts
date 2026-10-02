export type User = {
    id: number
    username: string
    email: string
    role: string
}

export type LoginRequest = {
    email: string
    password: string
}

export type CreateUserRequest = {
    username: string
    email: string
    password: string
}
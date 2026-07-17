export interface AuthUser {
  id: string
  username: string
}

export interface LoginResponse {
  user: AuthUser
  token: string
}

export interface LoginPayload {
  username: string
  password: string
}
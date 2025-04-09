

interface UserIdentifier {
  id: string
  roleId: string
  email: string
  username: string
  password: string
}

interface UserProfile {
  id: string
  alias: string
  firstname: string
  lastname: string
  avatarUrl: string
  birthdate: Date
}

interface UserSecurity {
  id: string
  isEmailVerified: boolean
  twoFactorAuth: boolean
  lastLogin: Date
}

export type { UserIdentifier, UserProfile, UserSecurity }

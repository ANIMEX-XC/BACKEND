import jwt from 'jsonwebtoken'
import { APP_CONFIGS } from '../configs'

export interface JwtPayloadTypes {
  userId: string
  userRole: 'user' | 'admin' | 'superAdmin'
}

export const generateAccessToken = (user: JwtPayloadTypes): any => {
  return jwt.sign(user, APP_CONFIGS.secret.token ?? '')
}

export const verifyAccessToken = (token: string): any => {
  try {
    return jwt.verify(token, APP_CONFIGS.secret.token ?? '')
  } catch {
    return false
  }
}

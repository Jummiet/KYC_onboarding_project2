import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' })
}

export function verifyToken(token: string): any {
  return jwt.verify(token, JWT_SECRET)
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export function isOTPExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt
}

export function getOTPExpiryTime(): Date {
  const expiryTime = new Date()
  expiryTime.setMinutes(expiryTime.getMinutes() + 10) // 10 minutes
  return expiryTime
}
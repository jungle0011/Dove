import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-key-123';
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

// Create JWT token
export function createToken(username: string): string {
  return sign({ username }, JWT_SECRET, { expiresIn: '1d' });
}

// Verify JWT token
export function verifyToken(token: string): { username: string } | null {
  try {
    return verify(token, JWT_SECRET) as { username: string };
  } catch (error) {
    return null;
  }
}

// Validate admin credentials
export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

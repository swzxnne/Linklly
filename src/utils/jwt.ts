import jwt from 'jsonwebtoken';

const JWT_SECRET = "1234567890qwertyuiopasdfghjkl"

export const signToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1hr' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};
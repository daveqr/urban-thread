import jwt from "jsonwebtoken";

// TODO: Use environment variable for the secret key
const secretKey = "the_secret_key";

export interface TokenPayload {
  userId: string;
  username: string;
}

function generateToken(payload: TokenPayload, expiresIn = "1h"): string {
  return jwt.sign(payload, secretKey, { expiresIn: expiresIn });
}

export { generateToken };

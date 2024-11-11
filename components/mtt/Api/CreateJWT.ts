import { getEnv } from './helpers/getEnv';

import { SignJWT,JWTPayload } from 'jose';


const secret = new TextEncoder().encode(getEnv("JWT_SECRET",undefined));


export async function CreateJWT(payload: JWTPayload,period?:number) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(period?period:"2h")
    .sign(secret);
  return token;
}



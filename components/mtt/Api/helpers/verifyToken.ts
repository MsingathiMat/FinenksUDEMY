import { jwtVerify } from "jose";
import { getEnv } from "./getEnv";

const secret = new TextEncoder().encode(getEnv("JWT_SECRET",undefined));

export const verifyToken = async <T>(token: string):Promise<T | null> => {
  if (!token || !secret) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as T;
  } catch (err) {
    console.log(err)
    return null;
  }
};

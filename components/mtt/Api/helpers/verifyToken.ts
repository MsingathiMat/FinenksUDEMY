import { jwtVerify } from "jose";
import { getEnv } from "./getEnv";

const secret = new TextEncoder().encode(getEnv("JWT_SECRET",undefined));

export const verifyToken = async (token: string) => {
  if (!token || !secret) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
};

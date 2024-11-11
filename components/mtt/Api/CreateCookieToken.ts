
import { NextResponse } from 'next/server';

import { JWTPayload } from 'jose';
import { CreateJWT } from './CreateJWT';

export async function CreateCookieToken<T extends JWTPayload>(sessionUser: T) {

  const token = await CreateJWT(sessionUser);
  const response = NextResponse.json({ success: true, status: 200 });

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 120 * 60, 
    path: '/',
  });

  return response;
}

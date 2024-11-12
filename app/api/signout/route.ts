
   

   import { NextResponse } from "next/server";

   export async function GET(request: Request) {
       // Parse the URL to extract the query parameters
       const url = new URL(request.url);
       const redirectTo = url.searchParams.get('redirectTo') || '/signin';
   
       // Redirect to the specified path or to the root if not provided
       const baseUrl = new URL(request.url).origin;
       const response = NextResponse.redirect(new URL(redirectTo, baseUrl));
   
       // Set the cookie
       response.cookies.set('token', "##", {
           httpOnly: true, // Ensures the cookie is not accessible via JavaScript
           secure: process.env.NODE_ENV === 'production', // Use Secure cookies in production
           maxAge: 60 * 60, // 1 hour
           path: '/',
       });
   
      
       return response;
   }
   

          
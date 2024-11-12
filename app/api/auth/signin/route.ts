
   
   import { NextRequest, NextResponse } from "next/server";
   import bcryptjs from "bcryptjs";
import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";
import { CreateCookieToken } from "@/components/mtt/Api/CreateCookieToken";
import { ActiveUserType } from "@/components/mtt/Types/MttTypes";
  
   export async function POST(request: NextRequest) {
     try {
       const data = await request.json();
   
       const email = data.email as string;
       const password = data.password as string;
   
   
       if (!email || !password) {
         return NextResponse.json(
           { error: "Email and password are required" },
           { status: 400 }
         );
       }
   
      //  Find the user by email
       const ExistingUser = await SingletonPrisma.users.findFirst({ where: { email } });
   
       if (!ExistingUser) {
         return NextResponse.json(
           { error: "Invalid email or password" },
           { status: 401 }
         );
       }
   
       // Compare the provided password with the hashed password in the database
       const isMatch = await bcryptjs.compare(
         password.trim(),
         ExistingUser?.password?.trim() ?? ""
       );
   
       if (!isMatch) {
         return NextResponse.json(
           { error: "Invalid email or password" },
           { status: 401 }
         );
       }
   
     
     const CookieTokenResponse = await CreateCookieToken<ActiveUserType >({
       activeName:ExistingUser.name as string,
       activeEmail: ExistingUser.email as string,
       activeImagePath:ExistingUser.ProfileImage as string,
       activeId:ExistingUser.UserId,
       activeRole:ExistingUser.role
     })
     

     

     return CookieTokenResponse
     } catch (error) {
       console.error("Error logging in:", error);
       return NextResponse.json(
         { error: "Internal Server Error" },
         { status: 500 }
       );
     }
   }
   
   
   
   
   
             
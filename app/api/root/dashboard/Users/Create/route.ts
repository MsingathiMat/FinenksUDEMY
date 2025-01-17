

import bcryptjs from "bcryptjs";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import uuid4 from "uuid4";
import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";
import { CreateCookieToken } from "@/components/mtt/Api/CreateCookieToken";
import GetCompanyData from "@/components/mtt/Api/helpers/GetCompanyData";

export const POST = async (req: NextRequest) => {
  const data = await req.formData();
  const name = data.get("name") as string | null;
  const password = data.get("password") as string | null;
  const email = data.get("email") as string | null;
  const role = data.get("role") as string | null;

  if (!name || !email || !password || !role)  {
    return NextResponse.json({
      error: "Name, email, password, and image must be supplied",
    });
  }

  const CompanyData = await GetCompanyData();
  if (!CompanyData) {
    return NextResponse.json({ message: "Unrecognized Company", status: 400 });
  }

  const filePath="/me.png"
  const UserExist = await SingletonPrisma.users.findUnique({ where: { email } });

  if (UserExist) {
    return NextResponse.json({ error: "User exists", status: 500 });
  }

  const UserPassword = await bcryptjs.hash(password, 10);

  const ExistingUser = await SingletonPrisma.users.create({
    data: {
      name,
      email,
      password: UserPassword,
      ProfileImage: filePath,
      role : role as "ADMIN" | "USER",
      CompanyId:CompanyData.CompanyId
    },
  });

  if (!ExistingUser) {
    return NextResponse.json({ message: "User not created", status: 500 });
  }

  const CookieTokenResponse = await CreateCookieToken<ActiveUserType>({

    activeName:ExistingUser.name as string,
    activeEmail: ExistingUser.email as string,
    activeImagePath:ExistingUser.ProfileImage as string,
    activeId:ExistingUser.UserId,
    activeRole:ExistingUser.role,
    company:ExistingUser.CompanyId
  })
  
  return CookieTokenResponse

  return NextResponse.json({ message: "User created successfully", status: 200 });
};

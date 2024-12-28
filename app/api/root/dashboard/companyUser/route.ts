// import bcryptjs from "bcryptjs";
// import axios from "axios";
// import { NextRequest, NextResponse } from "next/server";
// import uuid4 from "uuid4";
// import SingletonPrisma from "@/components/mtt/Api/Prisma/singleton";
// import { CreateCookieToken } from "@/components/mtt/Api/CreateCookieToken";


// export const POST = async (req: NextRequest) => {
//   const data = await req.formData();

//   const name = data.get("name") as string | null;
//   const password = data.get("password") as string | null;
//   const email = data.get("email") as string | null;
//   const ProfileImage = data.get("ProfileImage") as File | null;

//   if (!name || !email || !ProfileImage || !password) {
//     return NextResponse.json({
//       error: "Name, email, password, and image must be supplied",
//     });
//   }

//   const FileName = ProfileImage.name;
//   const fileExtension = FileName.split(".").pop();

//   const Imagename = uuid4();
//   const formData = new FormData();

//   formData.append("file", ProfileImage, `${Imagename}.${fileExtension}`);

//   let filePath = null;
//   try {
//     const response = await axios.post<{ file: string }>(
//       "https://countent.codeddesign.org.za",
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     if (response.status === 200) {
//       filePath = `https://countent.codeddesign.org.za/uploads/images/${Imagename}.${fileExtension}`;
//     } else {
//       return NextResponse.json({
//         error: `Upload failed with status code: ${response.status}`,
//       });
//     }
//   } catch (error: any) {
//     // Handle error cases
//     if (error.response) {
//       // Server responded with a status other than 2xx
//       return NextResponse.json({
//         error: error.response.data || "Upload failed with server error",
//       });
//     } else if (error.request) {
//       // Request was made but no response was received
//       return NextResponse.json({
//         error: "No response received from the server",
//       });
//     } else {
//       // Something else happened while setting up the request
//       return NextResponse.json({
//         error: "An error occurred during the request",
//       });
//     }
//   }

//   if (!filePath) {
//     return NextResponse.json({ error: "No file path", status: 500 });
//   }

//   const UserExist = await SingletonPrisma.users.findUnique({
//     where: { email },
//   });

//   if (UserExist) {
//     return NextResponse.json({ error: "user exists", status: 500 });
//   }

//   const UserPassword = await bcryptjs.hash(password, 10);

//   const ExistingUser = await SingletonPrisma.users.create({
//     data: {
//       name,
//       email,
//       password: UserPassword,
//       ProfileImage: filePath,
//     },
//   });

//   if (!ExistingUser) {
//     return NextResponse.json({ message: "User not created", status: 500 });
//   }

//   const CookieTokenResponse = await CreateCookieToken<ActiveUserType>({
//     activeName: ExistingUser.name as string,
//     activeEmail: ExistingUser.email as string,
//     activeImagePath: ExistingUser.ProfileImage as string,
//     activeId: ExistingUser.UserId,
//     activeRole: ExistingUser.role,
//   });

//   return CookieTokenResponse;
// };

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


  const CompanyId = await  GetCompanyData()


if(!CompanyId){
  return NextResponse.json({ message: "Unrecognized Company", status: 400 });
}


  if (!name || !email || !password) {
    return NextResponse.json({
      error: "Name, email, password, and image must be supplied",
    });
  }



  const filePath="/me.png"
  const UserExist = await SingletonPrisma.users.findUnique({ where: { email } });

  if (UserExist) {
    return NextResponse.json({ error: "User exists", status: 500 });
  }

  const UserPassword = await bcryptjs.hash(password, 10);

  
try{

  const Results = await SingletonPrisma.$transaction(async (prisma) => {
    // Create the company
    const CreatedUser = await SingletonPrisma.users.create({
      data: {
        name,
        email,
        password: UserPassword,
        ProfileImage: filePath
       
      },
    });

    if (!CreatedUser) {
      return NextResponse.json({ message: "User not created", status: 500 });
    }

    // Update the user with the created company ID
    await prisma.users.update({
      where: {
        UserId: CreatedUser.UserId, // Assuming 'UserId' is the primary key or unique identifier for the user
      },
      data: {
        CompanyId: CompanyId,
      },
    });

   


    const CookieTokenResponse = await CreateCookieToken<ActiveUserType>({

      activeName:CreatedUser.name as string,
      activeEmail: CreatedUser.email as string,
      activeImagePath:CreatedUser.ProfileImage as string,
      activeId:CreatedUser.UserId,
      activeRole:CreatedUser.role,
      company:CreatedUser.CompanyId
    })
    
    return CookieTokenResponse
  
 


  });
 

  return NextResponse.json(Results, { status: 201 });


} catch (error) {
  return NextResponse.json({ error: "Transaction failed", details: error.message, status: 500 });
}

  
  
};

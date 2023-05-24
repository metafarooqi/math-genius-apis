import {NextRequest,NextResponse} from "next/server";
import {prisma} from '../../../db'

export async function POST(request:NextRequest){
  const { userName, age,password } = await request.json();
    console.log(userName);
    const result = await prisma.user.create({
      data: {
        name:userName,
        password:password,
        age :age
      },
    });

    const savedUser = await prisma.user.findFirst({
      where: {
        name: userName,
      },
      
    });

  return NextResponse.json({msg:userName,user:savedUser});
}


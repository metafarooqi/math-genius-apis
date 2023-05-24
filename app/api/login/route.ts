import {NextRequest,NextResponse} from "next/server";
import {prisma} from '../../../db'

export async function POST(request:NextRequest){
  const { userName, password } = await request.json();

    const savedUser = await prisma.user.findFirst({
      where: {
        name: {
          contains : userName,
          mode: 'insensitive',
        }
      },
      
    });

    if(!savedUser)
    return NextResponse.json({status:false,error:"invalid user"});

    if(password.toLowerCase() != savedUser.password.toLowerCase())
    return NextResponse.json({status:false, error:"wrong password"})

  return NextResponse.json({msg:userName,user:savedUser});
}


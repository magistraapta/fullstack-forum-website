import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try {
        const requestBody = await req.json()
        const {title, body, userEmail} = requestBody
        
        const user = await db.user.findUnique({
            where:{
                email:userEmail
            }
        })

        if (!user) {
            return NextResponse.json({message:"user not found"}, {status:401})
        }
        const res = await db.post.create({
            data:{
                title: title,
                body:body,
                user: {connect:{email:user.email}}
            }
        })

        return NextResponse.json({message: 'success', post:res}, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:'internal server error'}, {status:500})
    }
}
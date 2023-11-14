import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const res = await db.post.findMany({
            include:{
                user:{
                    select:{
                        name:true
                    }
                }
            }
        })
        return NextResponse.json({message:'success', post:res}, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:'internal server error'}, {status: 500})
    }
}
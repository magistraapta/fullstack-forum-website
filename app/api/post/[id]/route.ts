import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, {params}:{params:{id:string}}){
    try {
        const id = params.id
        const res = await db.post.findUnique({
            where:{
                id:Number(id)
            },
            include:{
                comment: {
                    select:{
                        comment: true,
                        user: {
                            select:{
                                name: true
                            }
                        }
                    }
                },
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
        return NextResponse.json({message:'internal server error'}, {status:500})
    }
}
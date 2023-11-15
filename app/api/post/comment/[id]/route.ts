import { db } from "@/lib/db";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest,{params}:{params:{id:string}}){
    try {
        const reqBody = await req.json()
        const id = params.id
        const {comment, userEmail} = reqBody
        const findPost = await db.post.findUnique({

            where:{
                id: Number(id)
            }
        })

        if (!findPost) {
            return NextResponse.json({message:'post not found'}, {status: 401})
        }

        const findUser = await db.user.findUnique({
            where:{
                email: userEmail
            }
        })

        if (!findUser) {
            return NextResponse.json({message:'user not found'}, {status: 401}) 
        }

        const res = await db.comment.create({
            data:{
                comment: comment,
                post: {connect:{id:findPost.id}},
                user: {connect:{email:findUser.email}}
            },
            include:{
                user:{
                    select:{
                        name: true
                    }
                }
            }
        })

        return NextResponse.json({
            message:'success',
            comment: res
        }, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: 'internal server error'}, {status: 500})
    }
}
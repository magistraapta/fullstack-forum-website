import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {hash} from 'bcrypt'
import * as z from 'zod'



export async function POST(req: NextRequest, ) {
    
    try {
        const body = await req.json()
        const {username,email, password} = body;

        const existingEmail = await db.user.findUnique({
            where: {
                email: email
            }
        })

        if (existingEmail) {
            return NextResponse.json({message: 'email already used'}, {status: 401})
        }
        const existingUsername = await db.user.findUnique({
            where: {
                username: username
            }
        })

        if (existingUsername) {
            return NextResponse.json({message: 'username already used'}, {status: 401})
        }

        const hashPassword = await hash(password, 10)
        const result = await db.user.create({
            data:{
                username,
                email,
                password: hashPassword
            }
        })

        return NextResponse.json({user: result, message: 'sucess create user'}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: 'internal server error'}, {status: 500})
    }
    
}
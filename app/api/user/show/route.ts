import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(){
    try {
        const getAllUser = await db.user.findMany()

        return NextResponse.json({message: 'success', user: getAllUser}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: 'internal server error'}, {status: 500})
    }
}
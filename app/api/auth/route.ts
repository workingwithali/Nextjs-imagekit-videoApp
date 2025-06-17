import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request:NextRequest) {
    try {
        const{email, password}= await request.json()
        if(!email || !password){
            return NextResponse.json(
                {error:"email and password is required!"},
                {status:400}
            )
        }
        await connectToDatabase()
        
        const exitingUser = await User.findOne({email})
        if(exitingUser){
            return NextResponse.json(
                { error: "User is already registered!" },
                { status: 400 }
            )
        }
        
    } catch (error) {
        
    }
    
}
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/schemas/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        await dbConnect();

        const body = await request.json();
        const { email, password } = body;

        if (!email) {
            throw new Error("Email field is empty")
        }
        if (!password) {
            throw new Error("Password field is empty")
        }

        const user = await UserModel.findOne({ email })

        if (!user) {
            throw new Error("User not found")
        }

        if (user.password != password) {
            throw new Error("Invalid password")
        }

        return Response.json({
            success: true,
            message: "Login successful",
        }, { status: 200 });

    } catch (error) {
        let message = ""

        if (error instanceof Error) {
            console.log(error.message);
            message = error.message
        } else {
            message = "Unknown error occurred";
            console.log('An unknown error occurred');
        }

        return Response.json(
            {
                success: false,
                message,
            },
            { status: 400 }
        );
    }
}

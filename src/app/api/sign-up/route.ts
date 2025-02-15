import dbConnect from "@/lib/dbConnect";
import UserModel from "@/schemas/user";


export async function POST(request:Request){

    await dbConnect()

    try {
        console.log("Hello");
        const body =  await request.json()
        console.log(body);
        
        const { username, email, password} = body

        // field validation, 
        if(!username){
           throw new Error("username field is empty")
        } 
        if(!email){
            throw new Error("Email field is empty")
        }  
        
        if(!password){
            throw new Error("Password field is empty")
        } 

        // email validation
        const existingEmail = await UserModel.findOne({
            email
        })

        if (existingEmail) {
           throw new Error("Email is already existed")
        }

        // create user

        const newUser = await UserModel.insertOne({
            email,
            username,
            password
        })
        // return user response

        return Response.json({
            success: true,
            message: "User created successfully",
            user: newUser
        },{
            status: 201
        })
        
    } catch (error) {
        let message = ''

        if (error instanceof Error) {
            console.log(error.message);
            message = error.message
        } else {
            message = "unknown error occured"
            console.log('An unknown error occurred');
        }

        return Response.json(
            {
                success: false,
                message,
            },
            { status: 400}
        )
        
    }

}
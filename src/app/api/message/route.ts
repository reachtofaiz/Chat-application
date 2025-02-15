import dbMessage from "@/lib/dbMessage";


export async function POST(request: Request) {
    try {
        await dbMessage();

        const body = await request.json();
        const { input } = body;
        console.log("yahan aaya kie nhiii");


        if (input === '') {
            throw new Error("Message field is empty")
        }

        return Response.json({
            success: true,
            message: "Message sent successful",
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

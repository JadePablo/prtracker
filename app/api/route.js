import Gym from "@models/gym";
import { connectToDB } from "@utils/database";

//fetches all verified gyms
export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const gyms = await Gym.find()

        
        return new Response(JSON.stringify(gyms), { status: 200 })
    } catch (error) {
        return new Response("Failed to get gyms", { status: 500 })
    }
}

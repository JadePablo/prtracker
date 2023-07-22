import User from "@models/user";
import { connectToDB } from "@utils/database";

// Fetches all verified gyms
export const GET = async (request, { params }) => {
    try {
        await connectToDB();

        const { email } = params;
        const user = await User.findOne({ email });

        if (!user) {
            return new Response("User not found", { status: 404 });
        }

        const isBanned = user.banned === true;

        return new Response(JSON.stringify(isBanned), { status: 200 });
    } catch (error) {
        return new Response("Failed to get gyms", { status: 500 });
    }
};

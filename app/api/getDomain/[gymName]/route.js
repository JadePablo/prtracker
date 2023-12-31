import Gym from "@models/gym";
import { connectToDB } from "@utils/database";

// Fetches prs belonging to [gymName]
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const { gymName } = params;

    // Find the gym with the given gymName
    const gym = await Gym.findOne({ gymName: gymName });

    if (!gym) {
      return new Response("Gym not found", { status: 404 });
    }

    return new Response(JSON.stringify(gym), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch Pr documents", { status: 500 });
  }
};
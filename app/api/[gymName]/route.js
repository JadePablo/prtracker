import Gym from "@models/gym";
import Pr from "@models/pr";
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

    // Fetch all Pr documents where location is equal to the gym's _id and verified is true
    const prs = await Pr.find({ location: gym.gymName, verified: true });

    return new Response(JSON.stringify(prs), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch Pr documents", { status: 500 });
  }
};

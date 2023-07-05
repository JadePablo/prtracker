import Gym from "@models/gym";
import Pr from "@models/pr";
import { connectToDB } from "@utils/database";

// Fetches prs belonging to [gymName]
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const { gymName } = params;

    // Find the gym with the given gymName
    const gym = await Gym.findOne({ name: gymName });

    if (!gym) {
      return new Response("Gym not found", { status: 404 });
    }
    
    // Fetch all Pr documents where location is equal to the gym's _id
    const prs = await Pr.find({ location: gym._id });

    return new Response(JSON.stringify(prs), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch Pr documents", { status: 500 });
  }
};

// Creates a new Pr document
export const POST = async (request, { params }) => {
  try {
    await connectToDB();

    const { gymName } = params;

    // Find the gym with the given gymName
    const gym = await Gym.findOne({ gymName: gymName });
    if (!gym) {
      return new Response("Gym not found", { status: 404 });
    }
    const {lift,weight,location} = await request.json();
    // Create a new Pr document with the provided data
   const newPr = new Pr({ lift, weight, location });

    // Set the location to the gym's _id
    newPr.location = gym._id;

    // Save the new Pr document to the database
    const savedPr = await newPr.save();
    // Add the _id of the new Pr to the undecided_prs array of the gym
    

    return new Response(JSON.stringify(savedPr), { status: 201 });
  } catch (error) {
    return new Response("Failed to create Pr document", { status: 500 });
  }
};

//add the new pr 
export const PATCH = async (request, { params }) => {
  // PATCH function code...
};

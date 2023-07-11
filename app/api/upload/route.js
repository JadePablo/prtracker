import Pr from "@models/pr";
import { connectToDB } from "@utils/database";

export const POST = async (request, { params }) => {
    try {

      await connectToDB();

      //get the info from the request body
      const {lifter,lift,weight,location,date,source,verified} = await request.json();

      // Create a new Pr document with the provided data
     const newPr = new Pr({ lift, weight, location, lifter,date,verified,source });

      // Save the new Pr document to the database
      const savedPr = await newPr.save();
  
      return new Response(JSON.stringify(savedPr), { status: 201 });
    } catch (error) {
      return new Response("Failed to create Pr document", { status: 500 });
    }
  };
import { connectToDB } from "@utils/database";
import Pr from "@models/pr";

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    const { id } = params;
    
    // Find the document with the specified _id and delete it
    const deletedPr = await Pr.findByIdAndDelete(id);

    if (!deletedPr) {
      return new Response('PR not found', { status: 404 });
    }

    return new Response('PR deleted successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to delete PR', { status: 500 });
  }
};

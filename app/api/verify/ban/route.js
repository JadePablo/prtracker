import { connectToDB } from "@utils/database";
import User from "@models/user";
import Pr from "@models/pr";

export const PATCH = async (request, { params }) => {
  try {
    await connectToDB();
    const { email, id} = await request.json();

    // Find the user with the specified email and update the 'banned' value
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { banned: true },
      { new: true }
    );

    const deletedPr = await Pr.findByIdAndDelete(id);
    
    if (!deletedPr) {
        return new Response('failed to delete pr',{status:404});
    }
    if (!updatedUser) {
      return new Response('User not found', { status: 404 });
    }

    return new Response('User updated successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to update user', { status: 500 });
  }
};

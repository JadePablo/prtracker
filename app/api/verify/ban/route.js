import { connectToDB } from "@utils/database";
import User from "@models/user";

export const PATCH = async (request, { params }) => {
  try {
    await connectToDB();
    const { email } = await request.json();
    console.log(email);
    // Find the user with the specified email and update the 'banned' value
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { banned: true },
      { new: true }
    );

    if (!updatedUser) {
      return new Response('User not found', { status: 404 });
    }

    return new Response('User updated successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to update user', { status: 500 });
  }
};

import { connectToDB } from "@utils/database";
import Pr from "@models/pr";

// Fetches all PRs associated with the email
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const {name} = params;
    const user_prs = await Pr.find({ lifter: name });

    if (user_prs.length > 0) {
      return new Response(JSON.stringify(user_prs), { status: 200 });
    } else {
      return new Response("No PRs associated with the email", { status: 404 });
    }
  } catch (error) {
    return new Response("Failed to get your PRs", { status: 500 });
  }
};

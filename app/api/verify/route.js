import { connectToDB } from "@utils/database";
import Pr from "@models/pr";

// Fetches all PRs associated with the email
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const unverified_prs = await Pr.find({ verified: false });

    return new Response(JSON.stringify(unverified_prs), { status: 200 });

  } catch (error) {
    return new Response("Failed to get your PRs", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  try {
    await connectToDB();
    const { id, status } = await request.json();
    console.log(id);
    console.log(status);

    // Find the PR with the specified _id and update the verified value
    const updatedPr = await Pr.findByIdAndUpdate(id, { verified: status });

    if (!updatedPr) {
      return new Response('PR not found', { status: 404 });
    }

    return new Response('PR updated successfully', { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to update PR', { status: 500 });
  }
};



import Pr from "@models/pr";
import countPrs from "@profile_helpers/countPrs";
import getBestLift from "@profile_helpers/getBestLift";
import getUnbeatenPrs from "@profile_helpers/getUnbeatenPrs";

import { connectToDB } from "@utils/database";

// Fetches prs belonging to [gymName]
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const { post_id } = params;
    // Find the Pr document with a matching _id
    const prDocument = await Pr.findById(post_id);

    if (!prDocument) {
      return new Response("Pr document not found", { status: 404 });
    }
    // Find the User document with a matching lifterEmail
    const user_prs = await Pr.find({ lifterEmail: prDocument.lifterEmail, verified: true });

    const prCount = countPrs(user_prs);
    const bestLifts = getBestLift(user_prs);
    const unbeatenPrs = getUnbeatenPrs(user_prs);
    
    const responseData = {
      prCount: prCount,
      bestLifts: bestLifts,
      unbeatenPrs: unbeatenPrs,
      user_prs: user_prs,
    };



    return new Response(JSON.stringify(responseData), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch Pr documents", { status: 500 });
  }
};

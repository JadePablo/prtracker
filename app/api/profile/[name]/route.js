import { connectToDB } from "@utils/database";
import Pr from "@models/pr";
import countPrs from "@profile_helpers/countPrs";
import getBestLift from "@profile_helpers/getBestLift";
import getUnbeatenPrs from "@profile_helpers/getUnbeatenPrs";


// Fetches all PRs associated with the email
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const {name} = params;
    const user_prs = await Pr.find({ lifterEmail: name, verified: true });

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
    return new Response("Failed to get your PRs", { status: 500 });
  }
};

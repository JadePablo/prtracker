import notifyWeaker from '@email_helpers/notifyWeaker.js';
import notifyVerification from '@email_helpers/notifyVerification.js';
import Pr from "@models/pr";
import { connectToDB } from '@utils/database.js';

/*
breakdown of this handler:
- tell the lifter he got verified
- find matching gym of potential unbeaten prs that this pr will top
- find same lifts of less weight, are verified, and haven't been beaten already
- if its empty do nothing
- if it isn't email the closest guy that the guy in the request body beat them :)
- change the beaten status of the beaten lift
*/
export const POST = async (request, { params }) => {
    try {
        
        await connectToDB();

        const {email,pr} = await request.json();

        //tell the lifter he got verified
        const verified_response = await notifyVerification(email,pr);
        if (verified_response !== 200) {
            return new Response('failed to send email',{status:400})
        };

        //find the closest unbeaten verified lift at the same gym
        const queryCriteria = {
            location: pr.location,
            verified: pr.verified,
            lift: pr.lift,
            weight: { $lt: pr.weight },
            beaten: false
          };
        const prs = await Pr.find(queryCriteria).sort({ weight: 1 }).limit(1);

        //its empty do nothing
        if (prs.length === 0) {
            return new Response ('no unbeaten prs of less weight found',{status: 200});
        }

        //email the closest guy that hasnt been beaten yet
        const humbledLifterEmail = prs[0].lifterEmail;
        const email_response = await notifyWeaker(humbledLifterEmail,pr.lift,pr.weight,pr.lifter);
        if (email_response === 200) {
            //change the beaten status of the beaten lift
            prs[0].beaten = true; // Set the 'beaten' value of prs[0] to true
            await prs[0].save(); // Save the updated PR document
            return new Response('successfully sent email',{status:200});
        } else {
            return new Response('failed to send email',{status:400})
        }

        //change the beaten status of the beaten lift
    
    } catch (error) {
      return new Response("Failed to send emails", { status: 400 });
    }
  };
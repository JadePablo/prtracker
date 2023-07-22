import notifyBan from "@email_helpers/notifyBan";

export const POST = async (request, { params }) => {
    try {

        const {email,pr} = await request.json();
 
        const email_response = await notifyBan(email,pr);

        if (email_response === 200) {
            return new Response('successfully sent email',{status:200});
        } else {
            return new Response('failed to send emails',{status:400})
        }
    
    } catch (error) {
      return new Response("Failed to send emails", { status: 400 });
    }
  };
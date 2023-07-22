import auto_email from '../../../email_helpers/auto_email.js';


export const POST = async (request, { params }) => {
    try {

        const {email} = await request.json();

        const email_response = await auto_email(email,'testing');

        if (email_response === 200) {
            return new Response('successfully sent email',{status:200});
        } else {
            return new Response('failed to send emails',{status:400})
        }
    
    } catch (error) {
      return new Response("Failed to send emails", { status: 400 });
    }
  };
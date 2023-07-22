import auto_email from "./auto_email.js";

export default async function notifyBan(email, pr) {

    const banMessage = `
    Your Pr Submission:
    ${pr.lift}
    ${pr.weight}
    @ ${pr.location}

    is responsible for your ban. You know what you did.
    You won't be able to post in any gym from now on.

    from, a prtracker judge
    `;

    const email_response = await auto_email(email, banMessage);

    return email_response;
}
import auto_email from "./auto_email.js";

export default async function notifyRejection(email, pr) {
    const rejectionMessage = `
    Your Pr Submission:
    ${pr.lift}
    ${pr.weight}
    @ ${pr.location}

    got rejected. These reasons might be why:
    - you didn't hit depth
    - what you say you lifted and what you actually lifted didn't match
    - you pulled sumo 

    from, a prtracker judge
    `;

    const email_response = await auto_email(email, rejectionMessage);

    return email_response;
}
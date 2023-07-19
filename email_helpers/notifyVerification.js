import auto_email from "./auto_email.js";

export default async function notifyVerification(email, pr) {
    const verificationMessage = `
    Your Pr Submission:
    ${pr.lift}
    ${pr.weight}
    @ ${pr.location}

    got verified. You'll now be able to see your pr on the website.

    from, a prtracker judge
    `;

    const email_response = await auto_email(email, verificationMessage);

    return email_response;
}
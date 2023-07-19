export default async function notifyVerification(email, pr) {
    const verificationMessage = `
    Your Pr Submission:
    ${pr.lift}
    ${pr.weight}
    @ ${pr.gymName} , ${pr.location}

    got verified. You'll now be able to see your pr on the website.

    from, a prtracker judge
    `;

    const email_response = await auto_email(email, verificationMessage);
    if (email_response == 404) {
        return 404;
    }
    const email_weaker_response = await notifyWeaker(email,pr.lift,pr.weight,pr.lifter);

    return email_weaker_response;
}
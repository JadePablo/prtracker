export default async function notifyJudge(email, pr) {
    const judgeMessage = `
    New Pr Submitted
    -------------------
    Info:
    ${pr}
    `;

    const email_response = await auto_email(email, judgeMessage);

    return email_response;
}
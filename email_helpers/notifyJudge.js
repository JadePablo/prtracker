import auto_email from "./auto_email";

export default async function notifyJudge(email, pr) {
    const judgeMessage = `
    New Pr Submitted
    -------------------
    Info:
    ${JSON.stringify(pr, null, 2)}
    `;

    const email_response = await auto_email(email, judgeMessage);
    return email_response;
}
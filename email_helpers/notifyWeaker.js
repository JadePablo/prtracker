export default async function notifyWeaker(email,lift,weight,lifter) {
    const weakerMessage = `
    Someone beat your lift.
    ${lifter} beat you with a ${weight} ${lift}

    from, a prtracker judge.
    `

    const email_response = auto_email(email,weakerMessage);

    return email_response;
}
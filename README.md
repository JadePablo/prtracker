# PRTracker

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

Web app to rank prs against other people at your local gym.
[Try it](https://prtracker.vercel.app/)

## Features
- See SBD prs for the provided gyms
- Visit other user profiles to see their all-time & unbeaten prs by clicking their name on a post
- Automatic emailing system whenever you beat someone's pr or someone else beats yours at the same gym
- All pr submissions go through a verification pipeline before being viewable on the app

## Verification Pipeline
1. At the form, the user must be logged in with a domain accepted by the gym before submission
2. Judges are notified via email when there is a submission for their gym 
3. Judges access a private dashboard where they can verify/reject the lift based on the submission guidelines and/or personal judgement. Judges also have the option to ban the user, preventing them from posting in any gym ever.
4. The user is notified via email of the judge's decision when its made. Their post is made viewable if verified by a judge.

## Technologies Used
- Next.js/React: frontend
- Material-UI: UI component library for styling and layout
- Node.js: backend
- Next auth & Google Cloud: Authentication
- MongoDB: store user info
- Cloudinary: store pr video submissions

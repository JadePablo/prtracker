export default function countPrs(prs) {
    let squat = 0; let bench = 0; let deadlift = 0;

    prs.forEach(pr => {
        if (pr.verified) {
            if (pr.lift === 'squat') {
                squat++;
            } else if (pr.lift === 'bench') {
                bench++;
            } else if (pr.lift === 'deadlift') {
                deadlift++;
            }
        }

    });

    return {squat,bench,deadlift}
} 
export default function getBestLift(prs) {
    let squat; 
    let bench; 
    let deadlift;

    prs.forEach(pr => {
        if (pr.verified) {
            if (pr.lift === 'squat') {
                if (!squat || pr.weight >= squat.weight) { // Check if squat is undefined or if the current weight is greater
                    squat = pr;
                }
            } else if (pr.lift === 'bench') {
                if (!bench || pr.weight >= bench.weight) { // Check if bench is undefined or if the current weight is greater
                    bench = pr;
                }
            } else if (pr.lift === 'deadlift') {
                if (!deadlift || pr.weight >= deadlift.weight) { // Check if deadlift is undefined or if the current weight is greater
                    deadlift = pr;
                }
            }
        }

    });

    return {squat, bench, deadlift};
}
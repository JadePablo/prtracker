export default function getUnbeatenPrs(prs) {
    const currentDate = new Date();
  
    // Create a new array with deep copies of the objects and the additional 'daysUndefeated' property
    const unbeatenPrs = prs
      .filter(pr => pr.verified && !pr.beaten)
      .map(pr => {
        // Create a deep copy of the pr object
        const prCopy = JSON.parse(JSON.stringify(pr));
  
        const prDate = new Date(pr.date);
        const timeDifference = currentDate.getTime() - prDate.getTime();
        const daysUndefeated = Math.floor(timeDifference / (1000 * 3600 * 24));
  
        prCopy.daysUndefeated = daysUndefeated;
        return prCopy;
      });
  
    return unbeatenPrs;
  }
  
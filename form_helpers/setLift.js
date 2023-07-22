export default function setLift(formData, targetValue) {
    switch (targetValue) {
      case 'squat':
        return { ...formData, lift: targetValue };
      case 'deadlift':
        return { ...formData, lift: targetValue };
      case 'bench':
        return { ...formData, lift: targetValue };
      default:
        return { ...formData, lift: '' };
    }
  }
import submitVideo from './submitVideo.js'

export default async function handleSubmit(formData, setShowPrompt, video, setLoading) {
    if (!formData.lift || formData.weight <= 0 || formData.weight >= 1500 || video === null) {
      setShowPrompt(true);
      return;
    }
  
    setLoading(true);
  
    // Upload video to cloudinary here
    const url = await submitVideo(video);
    const updatedFormData = { ...formData, source: url };
  
    const response = await fetch('api/upload', {
      method: 'POST',
      body: JSON.stringify(updatedFormData)
    });
    console.log(response);
    
    const email_response = await fetch('/api/send-email/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({pr: updatedFormData})
    });
    console.log(email_response);

    setLoading(false);
  
    window.location.reload();
  }
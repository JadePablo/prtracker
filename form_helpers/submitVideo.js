export default async function submitVideo(file) {
    console.log('submitting video...');
    const videoData = new FormData();
    videoData.append('file', file);
    videoData.append('upload_preset', 'prs_preset');
    const response = await fetch('https://api.cloudinary.com/v1_1/prtracker/video/upload', {
      method: 'POST',
      body: videoData
    }).then(r => r.json());
  
    return response.url;
  }
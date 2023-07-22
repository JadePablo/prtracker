export default function handleFileChange(setVideo, e) {
    const file = e.target.files[0];
    setVideo(file);
  }
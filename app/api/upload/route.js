export default function handler(req, res) {
    if (req.method === 'POST') {
      // Process a POST request
      console.log('you reached me');
    } else {
      // Handle any other HTTP method
    }
  }
document.getElementById('downloadButton').addEventListener('click', function () {
  const songUrl = document.getElementById('songUrl').value;
  const statusMessage = document.getElementById('statusMessage');
  const downloadLink = document.getElementById('downloadLink');

  if (!songUrl) {
    statusMessage.textContent = 'Please enter a valid Spotify song URL.';
    return;
  }

  statusMessage.textContent = 'Processing your request...';

  // Send request to your back-end server (e.g., Heroku or AWS Lambda)
  fetch('https://your-backend-server.com/api/download', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: songUrl }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        downloadLink.style.display = 'block';
        downloadLink.querySelector('a').href = data.downloadUrl;
        statusMessage.textContent = 'Download ready!';
      } else {
        statusMessage.textContent = 'Failed to fetch the song.';
      }
    })
    .catch(error => {
      statusMessage.textContent = 'Error processing the request.';
    });
});

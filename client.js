document.getElementById('dataForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const dataInput = document.getElementById('dataInput').value;

    fetch('/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ data: dataInput })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerText = `Server received: ${data.receivedData.data}`;
    })
    .catch(error => {
        document.getElementById('response').innerText = `Error: ${error.message}`;
    });
});
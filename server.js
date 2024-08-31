const http = require('http');
const { parse } = require('querystring');

const port = 3000;

// Create an HTTP server
const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Serve the HTML page for the client
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Simple Client-Server App</title>
            </head>
            <body>
                <h1>Client-Server Example</h1>
                <form id="dataForm">
                    <input type="text" id="dataInput" placeholder="Enter some data" />
                    <button type="submit">Send</button>
                </form>
                <div id="response"></div>
                <script src="client.js"></script>
            </body>
            </html>
        `);
    } else if (req.method === 'POST' && req.url === '/data') {
        // Handle POST request and respond with received data
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const parsedData = parse(body);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ receivedData: parsedData }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

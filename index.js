const http = require('http');
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32); // Use a consistent key in practice
const port = 3000;

function parseJSONRequest(req, callback) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        try {
            callback(null, JSON.parse(body));
        } catch (e) {
            callback(e);
        }
    });
}

function encryptMessage(message) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(message, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        encryptedMessage: encrypted,
        iv: iv.toString('hex')
    };
}

function decryptMessage(encryptedMessage, iv) {
    const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(iv, 'hex'));
    let decrypted = decipher.update(encryptedMessage, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        const url = new URL(req.url, `http://${req.headers.host}`);
        if (url.pathname === '/api/encryptMessage') {
            parseJSONRequest(req, (err, data) => {
                if (err || !data.message) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid request' }));
                    return;
                }
                const { encryptedMessage, iv } = encryptMessage(data.message);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ encryptedMessage, iv }));
            });
        } else if (url.pathname === '/api/decryptMessage') {
            parseJSONRequest(req, (err, data) => {
                if (err || !data.encryptedMessage || !data.iv) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid request' }));
                    return;
                }
                const decryptedMessage = decryptMessage(data.encryptedMessage, data.iv);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: decryptedMessage }));
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not Found' }));
        }
    } else {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    }
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// Helper function to serve files
function serveFile(respond, filePath, contentType) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            respond.writeHead(500, {'Content-Type': 'application/json'});
            respond.end(JSON.stringify({ error: 1, message: 'Internal Server Error' }));
        } else {
            respond.writeHead(200, {'Content-Type': contentType});
            respond.end(data);
        }
    });
}

const server = http.createServer((request, respond) => {
    const requestUrl = request.url;
    
    if (requestUrl === '/') {
        //Serve index.html
        const filePath = path.join(__dirname, 'index.html');
        serveFile(respond, filePath, 'text/html');
    } else if (requestUrl === '/image.jpg') {
        const filePath = path.join(__dirname, 'image.jpg');
        serveFile(respond, filePath, 'image/jpeg');
    } else {
        // Return JSON response for unsupported paths
        respond.writeHead(404, {'Content-Type': 'application/json'});
        respond.end(JSON.stringify({ error: 1, message: 'The path is not supported' }));
    }
});
// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Node.js sẽ đi kèm với framework Express vì Express đi kèm với MERN(M - MongoDB, E - Express, R - React, N - Node)
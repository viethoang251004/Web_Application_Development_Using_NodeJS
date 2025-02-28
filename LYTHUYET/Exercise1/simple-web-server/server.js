const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware for authentication
const authMiddleware = (req, res, next) => {
    const password = req.query.password;
    if (password === '123456') {
        next();
    } else {
        res.status(403).send('Forbidden: Incorrect password');
    }
};

// Serve static files (HTML, CSS, images) from the root folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes

// Home route: serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Admin route: protected by authMiddleware
app.get('/admin', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Profile route: protected by authMiddleware
app.get('/profile', authMiddleware, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'profile.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

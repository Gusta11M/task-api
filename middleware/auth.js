const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get token from headers
    let token = req.header('x-auth-token');

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Separate the token from 'Bearer ' prefix if present
    const tokenParts = token.split(' ');
    if (tokenParts.length > 1) {
        token = tokenParts[1]; // Use the second part if 'Bearer ' prefix is present
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ message: 'Token is not valid' });
    }
}

module.exports = authMiddleware;
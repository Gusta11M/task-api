const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // Get token from headers
    const headerToken = req.header('x-auth-token');

    if (!headerToken) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Extrair o token de um possível "Bearer xxxxx"
    const token = headerToken.startsWith('Bearer ')
        ? headerToken.split(' ')[1]
        : headerToken;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;

const asyncHandler = require('express-async-Handler');
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: "User is not authorized" });
                return;
            }
            req.user = decoded.user;
            next();
        });
    } else {
        res.status(401).json({ error: "Bearer token not found in Authorization header" });
    }
});

module.exports = validateToken;
import createError from "http-errors"
import jwt from "jsonwebtoken"
import User from '../models/User.js'


const verifyToken = (req, res, next) => {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
        return res.status(401).json({ error: 'Unauthorized - Missing Token' });
    }

    const token = tokenHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.user = decoded; // Attach the decoded payload to the request object
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Unauthorized - Invalid Token' });
    }
};


export default verifyToken
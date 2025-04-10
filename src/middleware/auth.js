const jwt = require('jsonwebtoken');
const { User } = require('../model/user.model');

const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token; 
        if (!token) return res.status(401).send('Access Denied');

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified.id);
        if (!user) return res.status(404).send('User not found');
        
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

module.exports = auth;

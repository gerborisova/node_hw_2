import jwt from 'jsonwebtoken';

module.exports = (req, res, next) => {
    const bearerHeader = req.headers.authorization;

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        return verifyToken(req, res, next);
    }
    return res.sendStatus(401);
};

function verifyToken(req, res, next) {
    jwt.verify(req.token, 'secretkey', (err) => {
        if (err) {
            return res.sendStatus(403);
        }
        return next();
    });
}

const authorization = (req, res, next) => {
    const user = req.user;
    const role = user.role;

    if (role != 'admin')
        return res.status(401).json({ message: 'Unauthorized Access' });

    next();
}

module.exports = authorization;
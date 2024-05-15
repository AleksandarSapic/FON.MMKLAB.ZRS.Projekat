require('dotenv').config;
const userRequestCounts = new Map();

function userRateLimiter(req, res, next) {
    const { username } = req.body;

    // Initialize request count for new users
    if (!userRequestCounts.has(username))
        userRequestCounts.set(username, { count: 0, lastReset: Date.now() });

    const userData = userRequestCounts.get(username);

    // Reset request count if more than 1 minute has passed since last reset
    if (Date.now() - userData.lastReset > process.env.RESET_INTERVAL) {
        userData.count = 0;
        userData.lastReset = Date.now();
    }

    // Increment request count for the user
    userData.count++;

    // Check if request count exceeds limit
    if (userData.count > process.env.CAPACITY) {
        return res.status(429).send("Too many requests from this user, please try again later");
    }

    next();
}

module.exports = userRateLimiter;
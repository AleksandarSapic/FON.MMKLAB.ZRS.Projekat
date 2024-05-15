const TokenBucket = require("../models/TokenBucket");

// Create a token bucket with a capacity of 100 tokens and a fill rate of 0.1 tokens per millisecond
const serverTokenBucket = new TokenBucket(100, 0.1);

// Middleware function for server rate limiting using token bucket algorithm
function serverRateLimiter(req, res, next) {
    if (serverTokenBucket.consume(1)) {
        next();
    } else {
        return res.status(429).send("Too many requests from this server, please try again later");
    }
}

module.exports = serverRateLimiter;
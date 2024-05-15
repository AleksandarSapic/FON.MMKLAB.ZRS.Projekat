class TokenBucket {
    constructor(capacity, fillRate) {
        this.capacity = capacity; // Maximum number of tokens the bucket can hold
        this.tokens = capacity; // Current number of tokens in the bucket
        this.fillRate = fillRate; // Rate at which tokens are added to the bucket (tokens per millisecond)
        this.lastFilled = Date.now(); // Timestamp of the last time tokens were added to the bucket

        // Refill the bucket continuously
        setInterval(() => {
            this.refillBucket();
        }, 1000); // Refill every second
    }

    refillBucket() {
        const now = Date.now();
        const timePassed = now - this.lastFilled;
        const tokensToAdd = timePassed * this.fillRate;
        this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
        this.lastFilled = now;
    }

    consume(tokens) {
        if (this.tokens >= tokens) {
            this.tokens -= tokens;
            return true; // Tokens consumed successfully
        } else {
            return false; // Not enough tokens in the bucket
        }
    }
}

module.exports = TokenBucket;
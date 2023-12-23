const crypto = require('crypto');

// Generate a random JWT secret (32 bytes, 64 characters)
const jwtSecret = crypto.randomBytes(32).toString('hex');

console.log('Generated JWT Secret:', jwtSecret);

const path = require('path');
const getEnv = (key) => process.env[key];
const resolvePath = (p) => path.resolve(__dirname, p);

module.exports = { getEnv, resolvePath };
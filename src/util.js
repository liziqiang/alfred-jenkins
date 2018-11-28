const path = require('path');
const getEnv = (key) => process.env[key];
const resolvePath = (p) => path.resolve(__dirname, p);

// 支持xxxx dev 格式，等同于xxxx_dev
function convertInput(input) {
    return input.trim().replace(/\s+/g, '_');
}

module.exports = { getEnv, resolvePath, convertInput };

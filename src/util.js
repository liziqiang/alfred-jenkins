import url from 'url';
import path from 'path';
const getEnv = (key) => process.env[key];
const resolvePath = (p) => path.resolve(url.fileURLToPath(new URL('.', import.meta.url)), p);

export default {
    getEnv,
    resolvePath
}

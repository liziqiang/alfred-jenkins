// 生成Jenkins实例
const UTIL = require('./util');
const JENKINS_URL = UTIL.getEnv('JENKINS_URL');
const jenkins = require('jenkins')({ baseUrl: JENKINS_URL, crumbIssuer: true, promisify: true });
module.exports = jenkins;

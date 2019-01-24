const alfy = require('alfy');
// 生成Jenkins实例
const UTIL = require('./util');
const JENKINS_URL = UTIL.getEnv('JENKINS_URL');
const jenkins = require('jenkins')({ baseUrl: JENKINS_URL, crumbIssuer: true });

// 初始化获取Jenkins任务列表
jenkins.fetchJobs = function() {
    let promise = new Promise((resolve) => {
        let cachedJobs = alfy.cache.get('jobs');
        if (cachedJobs) {
            resolve(cachedJobs);
        } else {
            jenkins.job.list((err, jobs) => {
                if (err) throw err;
                if (jobs) {
                    // cache 5分钟内有效
                    alfy.cache.set('jobs', jobs, { maxAge: 60 * 5 * 1000 });
                    resolve(jobs);
                }
            });
        }
    });
    return promise;
};

module.exports = jenkins;

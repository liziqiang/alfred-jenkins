import alfy from 'alfy';
import util from './util.js';
import Jenkins from 'jenkins';
// 生成Jenkins实例
const JENKINS_URL = util.getEnv('JENKINS_URL');
const jenkins = new Jenkins({ baseUrl: JENKINS_URL, crumbIssuer: true });

export default {
    ...jenkins,
    // 初始化获取Jenkins任务列表
    async fetchJobs() {
        const cachedJobs = alfy.cache.get('jobs');
        if (cachedJobs) {
            return cachedJobs;
        }
        const jobs = await jenkins.job.list();
        if (jobs) {
            alfy.cache.set('jobs', jobs, { maxAge: 60 * 5 * 1000 });
            return jobs;
        }
    }
}

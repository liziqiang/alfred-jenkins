const alfy = require('alfy');
const UTIL = require('./util');
const jenkins = require('./jenkins');
let cache = alfy.cache.get('jobs');
if (!cache) {
    fetchJobs();
} else {
    outputJobs(cache);
}

// 初始化获取Jenkins任务列表
function fetchJobs() {
    jenkins.job.list().then((err, jobs) => {
        if (err) throw err;
        if (jobs) {
            alfy.cache.set('jobs', jobs);
            outputJobs(jobs);
        }
    });
}

// 过滤结果并输出到Alfred
function outputJobs(jobs) {
    let items = alfy.matches(alfy.input, jobs, 'name').map((job) => {
        let jobName = job.name;
        let jobPage = job.url;
        return {
            title: jobName,
            subtitle: jobName,
            arg: jobName,
            mods: {
                'cmd': {
                    arg: jobPage,
                    subtitle: `Open Page: ${jobPage}`
                }
            },
            icon: {
                path: UTIL.resolvePath(`./images/${job.color}.png`)
            }
        };
    });
    if (!items.length) {
        items = [{ title: '未找到Jenkins任务', icon: { path: alfy.icon.error } }];
    }
    alfy.output(items);
}

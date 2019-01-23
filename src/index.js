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
    jenkins.job.list((err, jobs) => {
        if (err) throw err;
        if (jobs) {
            alfy.cache.set('jobs', jobs);
            outputJobs(jobs);
        }
    });
}

// 过滤结果并输出到Alfred
function outputJobs(jobs) {
    const split_name = UTIL.getEnv('JENKINS_SPLIT_NAME') || '-_';
    let items = alfy.matches(alfy.input, jobs, (item, input) => {
        item.shortName = item.name.split('_deploy')[0];
        let inputs = input.split(/\s+/);
        return new RegExp(inputs.join(`[${split_name}]`)).test(item.shortName);
    }).map((job) => {
        let jobName = job.name;
        let jobPage = job.url;
        let shortName = job.shortName;
        return {
            title: shortName,
            // subtitle: jobName,
            arg: jobName,
            variables: {
                jobName,
                shortName
            },
            mods: {
                'cmd': {
                    arg: jobPage,
                    subtitle: `Open Jenkins Build Page: ${jobPage}`
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

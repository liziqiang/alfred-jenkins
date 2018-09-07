const alfy = require('alfy');
const jenkins = require('./jenkins');
jenkins.job.build(alfy.input, { delay: '0sec'});

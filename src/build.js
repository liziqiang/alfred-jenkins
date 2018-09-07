const alfy = require('alfy');
const jenkins = require('./jenkins');
jenkins.job.build({ name: alfy.input, parameters: { delay: '0sec'} });

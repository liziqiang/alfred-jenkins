import alfy from 'alfy';
import util from './util.js';
import jenkins from './jenkins.js';
const DELAY = util.getEnv('DELAY') || 0;
jenkins.job.build(alfy.input, { delay: `${DELAY}sec`});

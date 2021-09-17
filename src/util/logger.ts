import pino from 'pino';

const log = pino({
  level: process.env.NODE_ENV === 'development' ? 'debug' : process.env.LOG_LEVEL,
});

export default log;
export { log };

import pino from 'pino';

const log = pino({
  // if env.NODE_ENV == 'development' => 'debug'
  // if env.LOG_LEVEL == undefined && env.NODE_ENV !== 'development => 'info'
  // else log level => env.LOG_LEVEL
  level: (process.env.NODE_ENV === 'development' ? 'debug' : process.env.LOG_LEVEL) ?? 'info',
});

export default log;
export { log };

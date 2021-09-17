# sensible-typescript-starter-node 

<div align="center">

[![Modified Semistandard](https://img.shields.io/badge/code%20style-typescript%20semistandard-brightgreen.svg?style=flat)](https://github.com/standard/eslint-config-standard-with-typescript)

</div>


# Logging with Pino 7+
*I strongly recommend checking out the pino docs on https://getpino.io/, but here is a quick overview of the essentials:*

## Logging options
You can set your options in ``src/util/logger.ts``. You will most likely only use the level, which you can also set with the env var ``LOG_LEVEL``. Check out the ``.env.example`` for more information and the pino logger options if you need **child loggers, custom levels or redactions**: https://getpino.io/#/docs/api?id=options
```typescript
const log = pino({
  level: 'error', // One of 'fatal', 'error', 'warn', 'info', 'debug', 'trace' or 'silent'.
})
```


## Log rotation
Use a separate tool for log rotation, e.g. [logrotate](https://github.com/logrotate/logrotate).
Consider we output our logs to `/var/log/myapp.log` like so:

```
$ npm start > /var/log/myapp.log
```

We would rotate our log files with logrotate, by adding the following to `/etc/logrotate.d/myapp`:

```
/var/log/myapp.log {
       su root
       daily
       rotate 7
       delaycompress
       compress
       notifempty
       missingok
       copytruncate
}
```

The `copytruncate` configuration has a very slight possibility of lost log lines due
to a gap between copying and truncating - the truncate may occur after additional lines
have been written. To perform log rotation without `copytruncate`, see [Reopening log files in the pino help documentation](https://github.com/pinojs/pino/blob/master/docs/help.md#reopening-log-files).

## Unicode and Windows Terminal
> Pino uses sonic-boom to speed up logging. Internally, it uses fs.write to write log lines directly to a file descriptor. On Windows, unicode output is not handled properly in the terminal (both cmd.exe and powershell), and as such the output could be visualized incorrectly if the log lines include utf8 characters. It is possible to configure the terminal to visualize those characters correctly with the use of chcp by executing in the terminal ``chcp 65001``. This is a known limitation of Node.js.  
> https://github.com/pinojs/pino/blob/master/docs/help.md#unicode-and-windows-terminal


## Code style
This repo uses a modified version of [semistandard](https://github.com/standard/eslint-config-standard-with-typescript) aiming for best practises and a modern ecmascript experience. Three rules in total were modified.

The following modifications are applied in ``.eslintrc.js``:
  - ``'@typescript-eslint/semi': ['error', 'always']`` - semicolon at end of line
```typescript
// ❌
console.log('hello world') 

// ✅
console.log('hello world'); 
```

  - ``'comma-dangle': ['error', { arrays: 'always-multiline', objects: 'always-multiline' }]`` comma at the end of multi line arrays and objects
```typescript
// ❌
const arr = [1,2,];

// ❌
const foo = {
    bar: 'baz',
    qux: 'quux'
};

// ✅
const arr = [1,2,];

// ✅
foo({
  bar: 'baz',
  qux: 'quux',
});

// ✅
const arr = [
    1,
    2,
];

```
  - ``curly: ['error', 'multi', 'consistent']``
```typescript
// ❌
if (true) { return false; }

// ✅
if (true)
  return false;

// ✅
if (true) {
  foo();
  return true;
}
```
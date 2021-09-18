# sensible-typescript-starter-node 
  - [Overview](#overview)
  - [Get Started](#get-started)
  - [Writing Tests with Tap](#writing-tests-with-tap)
    - [Test Example](#test-example)
  - [Logging with Pino 7+](#logging-with-pino-7)
    - [Logging options](#logging-options) 
    - [Log rotation](#log-rotation) 
  - [Unicode and Windows Terminal](#unicode-and-windows-terminal)
  - [Code Style](#code-style)

# Overview
This starter template includes [tap](https://node-tap.org) for tests and [pino](https://getpino.io) for logging.  
ESLint is configured for Typescript in [Standard.js](https://standardjs.com/) semi style (semicolons) and a few [quality of life modifications](#codestyle).  
Standard.js is widely used at vercel, heroku, node, elastic, npm, nearform, fastify and more!

# Get Started
1. Generate new repository from this template: https://github.com/VIEWVIEWVIEW/sensible-typescript-starter-node/generate
2. Clone repo to your local machine: ``git clone https://github.com/username/generated-repo``
3. Run ``npm i`` and install the [ESLint Extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for vscode.  
(ESLint Extension is included in the ``.vscode`` workspace recommendations too!)

# Writing Tests with Tap

Tests are written with the [tap testing framework](https://node-tap.org/).  
Put all your tests into ``test/`` and make sure your file name ends in ``*.test.ts``.

To run a your tap-tests, simply execute ``npm run test``.

When the output in the terminal gets to messy, you can also let tap create a coverage report, which you can inspect in the browser: ``npm run coverage``. This will create a new folder called ``coverage`` with an ``index.html``.  
You can inspect a screenshot of a sample output here:
 - [Coverage Overview](https://raw.githubusercontent.com/VIEWVIEWVIEW/sensible-typescript-starter-node/main/docs/coverage_index.png)
 - [Coverage Animal.ts](https://raw.githubusercontent.com/VIEWVIEWVIEW/sensible-typescript-starter-node/main/docs/coverage_animal.png) 

### Test Example:
```typescript
// /test/Animal.test.ts
import tap from 'tap';

import { Cat, Dog } from '../src/Animal';

tap.test('Cat', async (t) => {
  const testCat = new Cat();
  t.equal(testCat.playSound(), 'meow');

  t.equal(testCat.sleep(), '💤');
});

tap.test('Dog', async (t) => {
  const testDog = new Dog();
  t.equal(testDog.playSound(), 'woof');
  t.equal(testDog.sleep(), '💤');
});
```


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


## Code Style
This repo uses a modified version of [semistandard](https://github.com/standard/eslint-config-standard-with-typescript) aiming for best practises and a modern ecmascript experience. Three rules in total were modified.

### Linting
  - To **lint** your code, run ``npm run lint``
  - To **lint and _fix_** your code, run ``npm lint:fix`` 

### Modifications

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

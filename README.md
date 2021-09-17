# sensible-typescript-starter-node 

<div align="center">

[![Modified Semistandard](https://img.shields.io/badge/code%20style-typescript%20semistandard-brightgreen.svg?style=flat)](https://github.com/standard/eslint-config-standard-with-typescript)

</div>


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
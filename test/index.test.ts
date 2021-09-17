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

import { log } from './util/logger';

import { Cat, Dog } from './Animal';

const Baghira = new Cat();
log.info({ sound: Baghira.playSound() });

const Lassie = new Dog();
log.info({
  sound: Lassie.playSound(),
  sleep: Lassie.sleep(),
});

log.debug('I am only logged when \'process.env.NODE_ENV\' is set to \'development\' :)');

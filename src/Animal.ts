abstract class Animal {
  abstract playSound (): string;

  sleep (): string {
    return '💤';
  }
}

export class Cat extends Animal {
  playSound (): string {
    return 'meow';
  }
}

export class Dog extends Animal {
  playSound (): string {
    return 'woof';
  }
}

import { ValueObject } from './ValueObject';

interface ValueObjectProps {
  foo: string;
  bar?: object;
}

class AbstractClass extends ValueObject<ValueObjectProps> {
  constructor(props: ValueObjectProps) {
    super(props);
  }
}

describe('ValueObject with AbstractClass', () => {
  it('should be defined', () => {
    expect(AbstractClass).toBeDefined();
  });

  it('should be equal', () => {
    const tclass = new AbstractClass({ foo: 'bar' });
    const tclass2 = new AbstractClass({ foo: 'bar' });
    expect(tclass.equals(tclass2)).toBeTruthy();
  });

  it('should be equal with nested object', () => {
    const tclass = new AbstractClass({ foo: 'bar', bar: { foo: true, bar: true } });
    const tclass2 = new AbstractClass({ foo: 'bar', bar: { foo: true, bar: true } });
    expect(tclass.equals(tclass2)).toBeTruthy();
  });

  it('should not be equal when one is undefined', () => {
    const tclass = undefined;
    const tclass2 = new AbstractClass({ foo: 'bar' });

    expect(tclass2.equals(tclass)).toBeFalsy();
  });
});

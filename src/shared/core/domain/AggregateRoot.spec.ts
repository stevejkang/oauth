import { AggregateRoot } from './AggregateRoot';

interface AggregateObjectProps {
  foo: string;
}

class AbstractClass extends AggregateRoot<AggregateObjectProps, number> {
  constructor(props: AggregateObjectProps, id: number) {
    super(props, id);
  }
}

describe('AggregateRoot with AbstractClass', () => {
  it('should be defined', () => {
    expect(AbstractClass).toBeDefined();
  });

  it('should return id', () => {
    const tclass = new AbstractClass({ foo: 'bar' }, 1);
    expect(tclass.id).toEqual(1);
  });
});

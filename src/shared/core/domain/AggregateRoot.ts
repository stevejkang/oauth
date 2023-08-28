/* eslint-disable @typescript-eslint/no-explicit-any */
interface AggregateObjectProps {
  [index: string]: any;
}

export abstract class AggregateRoot<T extends AggregateObjectProps, U> {
  public props: T;
  protected readonly _id: U;

  protected constructor(props: T, id: U) {
    this.props = { ...props };
    this._id = id;
  }

  get id(): U {
    return this._id as U;
  }
}

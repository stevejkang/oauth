import { ControllerRequestAuthCommonHeader } from './ControllerRequest';

describe('ControllerRequest', () => {
  it('should be defined', () => {
    const uut = new ControllerRequestAuthCommonHeader();

    uut.authorization = 'authorization';

    expect(uut).toBeDefined();
    expect(uut).toBeInstanceOf(ControllerRequestAuthCommonHeader);
    expect(uut.authorization).toBe('authorization');
  });
});

import { ControllerResponse, ControllerResponseOnError } from './ControllerResponse';

describe('ControllerResponse', () => {
  it('should be defined (ControllerResponse)', () => {
    const controllerResponse = new ControllerResponse();

    controllerResponse.statusCode = 200;
    controllerResponse.timestamp = 'timestamp';
    controllerResponse.path = 'path';
    controllerResponse.ok = true;

    expect(controllerResponse).toBeDefined();
    expect(controllerResponse).toBeInstanceOf(ControllerResponse);
    expect(controllerResponse.statusCode).toBe(200);
    expect(controllerResponse.timestamp).toBe('timestamp');
    expect(controllerResponse.path).toBe('path');
    expect(controllerResponse.ok).toBe(true);
  });

  it('should be defined (ControllerResponseOnError)', () => {
    const controllerResponseOnError = new ControllerResponseOnError();

    controllerResponseOnError.statusCode = 200;
    controllerResponseOnError.timestamp = 'timestamp';
    controllerResponseOnError.path = 'path';
    controllerResponseOnError.ok = true;
    controllerResponseOnError.error = {
      message: 'message',
      stack: ['stack'],
    };

    expect(controllerResponseOnError).toBeDefined();
    expect(controllerResponseOnError).toBeInstanceOf(ControllerResponseOnError);
    expect(controllerResponseOnError.statusCode).toBe(200);
    expect(controllerResponseOnError.timestamp).toBe('timestamp');
    expect(controllerResponseOnError.path).toBe('path');
    expect(controllerResponseOnError.ok).toBe(true);
    expect(controllerResponseOnError.error.message).toBe('message');
    expect(controllerResponseOnError.error.stack).toStrictEqual(['stack']);
  });
});

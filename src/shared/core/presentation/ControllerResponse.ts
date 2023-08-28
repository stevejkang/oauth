import { ApiProperty } from '@nestjs/swagger';

export class ControllerResponseErrorObject {
  @ApiProperty({
    name: 'message',
    description: 'An error message',
    required: true,
  })
  message: string;

  @ApiProperty({
    name: 'stack',
    type: Array,
    description: 'An error stack (development environment only)',
    required: true,
  })
  stack: string[];
}

export class ControllerResponse {
  @ApiProperty({
    name: 'statusCode',
    description: 'HTTP status code',
    required: true,
  })
  statusCode: number;

  @ApiProperty({
    name: 'timestamp',
    description: 'Response timestamp (ISO)',
    required: true,
  })
  timestamp: string;

  @ApiProperty({
    name: 'path',
    description: 'Requested path',
    required: true,
  })
  path: string;

  @ApiProperty({
    name: 'trackingId',
    description: 'Tracking ID',
    required: false,
  })
  trackingId?: string;

  @ApiProperty({
    name: 'ok',
    description: 'Response success',
    required: true,
  })
  ok: boolean;
}

export class ControllerResponseOnError extends ControllerResponse {
  @ApiProperty({
    type: ControllerResponseErrorObject,
  })
  error: ControllerResponseErrorObject;
}

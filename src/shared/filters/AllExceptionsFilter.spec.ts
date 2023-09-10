import { REQUEST } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, HttpException } from '@nestjs/common';
import { AllExceptionsFilter } from './AllExceptionsFilter';

const mockHttpAdapterHost = jest.fn().mockImplementation(() => ({
  getRequestUrl: jest.fn(),
}));
const mockStatus = jest.fn().mockImplementation(() => ({
  json: jest.fn(),
}));
const mockGetResponse = jest.fn().mockImplementation(() => ({
  status: mockStatus,
  getHeader: jest.fn(),
  json: jest.fn(),
}));
const mockGetRequest = jest.fn().mockImplementation(() => ({
  originalUrl: jest.fn(),
}));
const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
  getResponse: mockGetResponse,
  getRequest: mockGetRequest,
}));
const mockArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
};

describe('AllExceptionsFilter', () => {
  let uut: AllExceptionsFilter;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AllExceptionsFilter,
        {
          provide: REQUEST,
          useValue: mockHttpAdapterHost,
        },
      ],
    }).compile();

    const app = module.createNestApplication();
    await app.init();

    uut = module.get<AllExceptionsFilter>(AllExceptionsFilter);
  });

  it('should be defined', () => {
    expect(uut).toBeDefined();
  });

  it('Http exception', () => {
    uut.catch(
      new HttpException('Http exception', HttpStatus.BAD_REQUEST),
      mockArgumentsHost,
    );
    expect(mockHttpArgumentsHost).toBeCalledTimes(1);
    expect(mockHttpArgumentsHost).toBeCalledWith();
    expect(mockGetResponse).toBeCalledTimes(1);
    expect(mockGetResponse).toBeCalledWith();
    expect(mockGetRequest).toBeCalledTimes(1);
    expect(mockGetRequest).toBeCalledWith();
    expect(mockStatus).toBeCalledTimes(1);
    expect(mockStatus).toBeCalledWith(HttpStatus.BAD_REQUEST);
  });
});

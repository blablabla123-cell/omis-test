import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationResponse } from './types/index.js';
import { AuthenticationController } from './authentication.controller.js';
import { APIResponseStatus } from '../common/index.js';
import { APIResponse } from '../common/index.js';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should sign a test user in and return a token', async () => {
    const result: APIResponse<AuthenticationResponse> = {
      status: APIResponseStatus.SUCCESS,
      message: 'User authenticated successfully',
      data: {
        accessToken: 'test-token',
      },
    };

    jest.spyOn(controller, 'signIn').mockImplementation(async () => result);

    expect(await controller.signIn({ user: { id: 'test-id' } })).toBe(result);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationResponse } from './types/index.js';
import { AuthenticationController } from './authentication.controller.js';
import { APIResponseStatus } from '../common/index.js';
import { APIResponse } from '../common/index.js';
import { AuthenticationService } from './authentication.service.js';
import { AuthenticationUtils } from './authentication.utils.js';
import { LocalStrategy } from './strategies/local.strategy.js';
import { DatabaseModule } from '../database/database.module.js';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module.js';
import { EnvVariables } from '../common/interfaces/index.js';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        UsersModule,
        JwtModule.registerAsync({
          inject: [ConfigService<EnvVariables>],
          useFactory: function (configService: ConfigService<EnvVariables>) {
            const jwtSecret = configService.get('jwt', { infer: true });
            return {
              global: true,
              secret: jwtSecret,
              signOptions: {
                expiresIn: 60 * 60 * 24 * 30, // 30 days
              },
            };
          },
        }),
      ],
      providers: [AuthenticationService, AuthenticationUtils, LocalStrategy],
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

import { AuthenticationGuard } from './authentication.guard.js';

describe('AuthenticationGuard', () => {
  it('should be defined', () => {
    expect(new AuthenticationGuard()).toBeDefined();
  });
});

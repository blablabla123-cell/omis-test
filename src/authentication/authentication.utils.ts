import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthenticationUtils {
  async hash(value: string): Promise<string> {
    return await bcrypt.hash(value, 10);
  }

  async validate(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash);
  }
}

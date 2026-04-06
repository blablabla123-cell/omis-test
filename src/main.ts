import {
  ConsoleLogger,
  ValidationPipe,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module.js';
import 'dotenv/config';
import { LoggerService } from './logger/logger.service.js';
import { AllExceptionsFilter } from './common/index.js';
import { GlobalInterceptor } from './common/interceptors/global.interceptor.js';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new ConsoleLogger({ colors: true }),
    cors: true,
    abortOnError: false,
  });

  const config = new DocumentBuilder()
    .setTitle('OMIS API')
    .setDescription('A list of endpoints to interact with OMIS KPI system')
    .setVersion('1.0')
    .build();

  const documentFactory = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  const loggerService = app.get(LoggerService);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT', 3000);

  app.useGlobalFilters(new AllExceptionsFilter(loggerService));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      validateCustomDecorators: true,
      forbidNonWhitelisted: true,
      exceptionFactory: (errors) => {
        const messages = errors.map((error) => error.constraints);
        return new BadRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: messages.join(', '),
        });
      },
    }),
  );

  app.useGlobalInterceptors(new GlobalInterceptor(loggerService));

  app.setGlobalPrefix('api/v1');

  await app.listen(port);
}
bootstrap();

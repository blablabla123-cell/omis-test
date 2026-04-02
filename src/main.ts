import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ConsoleLogger, HttpStatus, ValidationPipe } from '@nestjs/common';
import { ExceptionsFilter } from './filters/exceptions.filter.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({ colors: true }),
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

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionsFilter(httpAdapter));

  app.useGlobalPipes(new ValidationPipe({
    stopAtFirstError: true,
    exceptionFactory(errors) {
      const firstError = errors[0];
      const firstConstraint = Object.values(firstError.constraints!)[0];
      return new BadRequestException({
        message: firstConstraint,
        statusCode: HttpStatus.BAD_REQUEST,
      });
    },
  }));

  app.setGlobalPrefix('api/v1');

  await app.listen(3000);
}
bootstrap();

import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const initSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Cats API')
    .addTag('cat')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  return SwaggerModule.setup('api', app, document);
};

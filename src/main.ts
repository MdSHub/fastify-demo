// import { NestFactory } from '@nestjs/core';
// import {FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify'
// import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';
// import * as functions from 'firebase-functions';

// async function bootstrap() {
//   const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
//   app.useGlobalPipes(
//     new ValidationPipe({
//       whitelist: true,
//       forbidNonWhitelisted: true,
//       transform: true,
//     }),
//   );

//   await app.listen(process.env.PORT || 3000, '0.0.0.0');
// }
// bootstrap();
// export const api = functions.https.onRequest(bootstrap);

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


const expressServer = express();
const createFunction = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  app.useGlobalPipes(
        new ValidationPipe({
          whitelist: true,
          forbidNonWhitelisted: true,
          transform: true,
        }),
      );
await app.init();
};
export const api = functions.https.onRequest(async (request, response) => {
  await createFunction(expressServer);
  expressServer(request, response);
});
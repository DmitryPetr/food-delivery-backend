import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { FRONTEND_APP_URL, FRONTEND_SECURE_APP_URL } from '@/config/mainConfig';

const whitelist = [FRONTEND_APP_URL, FRONTEND_SECURE_APP_URL];

export const corsOptions = {
  credentials: true,
  // eslint-disable-next-line @typescript-eslint/ban-types
  origin(origin: string, callback: Function) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error(`${origin} not allowed by CORS`));
    }
  }
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: corsOptions });
  await app.listen(3000);
}
bootstrap();

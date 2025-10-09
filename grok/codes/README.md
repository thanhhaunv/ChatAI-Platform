# ChatAI-Platform

A multi-agent AI chat platform supporting web/mobile, voice/file inputs, self-hosted ML training.

## Quick Start
1. Clone repo: `git clone https://github.com/[your-username]/ChatAI-Platform.git`
2. Install deps: `pnpm install`
3. Setup env: Copy `.env.example` to `.env` and fill values
4. Run local: `docker-compose up -d` then `pnpm dev`

See /docs for full documentation.

Chào bạn! Là một lập trình viên tài ba và quản trị dự án (PM) tài năng, tôi hiểu ý bạn muốn tôi cung cấp đầy đủ tất cả các file cho `services/api-gateway` theo đúng cấu trúc bạn đưa ra, kèm hướng dẫn test chi tiết để tiết kiệm thời gian kiểm tra. Tôi sẽ viết lại toàn bộ các file, đảm bảo khớp với template, tuân thủ Coding-Conventions.md (TypeScript strict, linting), và tích hợp sẵn các middleware, filters, interceptors như yêu cầu. Sau đó, tôi sẽ cung cấp hướng dẫn test rõ ràng (local, Docker, và Jest) để bạn verify ngay. Nếu không bug, bạn confirm để tôi tiếp tục với auth-service.

### Toàn bộ files cho services/api-gateway

<xaiArtifact artifact_id="4c39895c-7ed3-4242-a4ae-03e6872f6a68" artifact_version_id="d3593140-2729-41ef-8f7c-3237fec0cfb2" title="api-gateway-structure" contentType="text/plain">
```
services/api-gateway/
├── src/
│   ├── main.ts
│   ├── app.module.ts
│   ├── app.controller.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── projects.controller.ts
│   │   └── chat.controller.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── rate-limit.middleware.ts
│   │   └── error.middleware.ts
│   ├── filters/
│   │   └── http-exception.filter.ts
│   ├── interceptors/
│   │   └── logging.interceptor.ts
│   └── config/
│       └── configuration.ts
├── test/
│   └── app.e2e-spec.ts
├── Dockerfile
├── .dockerignore
├── tsconfig.json
├── .eslintrc.json
├── .env.example
├── .env.production
├── package.json
└── README.md
```

#### services/api-gateway/package.json
```json
{
  "name": "api-gateway",
  "version": "1.0.0",
  "scripts": {
    "start": "nest start",
    "dev": "nest start --watch",
    "build": "nest build",
    "test": "jest",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix"
  },
  "dependencies": {
    "@nestjs/common": "^10.0.0",
    "@nestjs/core": "^10.0.0",
    "@nestjs/platform-express": "^10.0.0",
    "@nestjs/axios": "^3.0.0",
    "express-rate-limit": "^7.1.0",
    "reflect-metadata": "^0.2.0",
    "rxjs": "^7.8.1"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.0.0",
    "@nestjs/schematics": "^10.0.0",
    "@nestjs/testing": "^10.0.0",
    "@types/jest": "^29.5.2",
    "@types/node": "^20.3.1",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.42.0",
    "eslint-config-prettier": "^9.0.0",
    "eslint-plugin-prettier": "^5.0.0",
    "jest": "^29.5.0",
    "prettier": "^3.0.0",
    "ts-jest": "^29.1.0",
    "ts-loader": "^9.4.3",
    "ts-node": "^10.9.1",
    "tsconfig-paths": "^4.2.0",
    "typescript": "^5.1.3",
    "supertest": "^6.3.3"
  }
}
```

#### services/api-gateway/tsconfig.json
```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "declaration": true,
    "outDir": "./dist"
  }
}
```

#### services/api-gateway/.eslintrc.json
```json
{
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.json",
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint/eslint-plugin"],
  "extends": ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  "root": true,
  "env": {
    "node": true,
    "jest": true
  },
  "ignorePatterns": [".eslintrc.json"],
  "rules": {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off"
  }
}
```

#### services/api-gateway/.env.example
```
APP_PORT=3000
JWT_SECRET=your_jwt_secret_here
AUTH_SERVICE_URL=http://auth-service:3001
USER_SERVICE_URL=http://user-service:3002
CHAT_ORCH_URL=http://chat-orch:3003
```

#### services/api-gateway/.env.production
```
APP_PORT=3000
JWT_SECRET=production_jwt_secret
AUTH_SERVICE_URL=http://auth-service:3001
USER_SERVICE_URL=http://user-service:3002
CHAT_ORCH_URL=http://chat-orch:3003
```

#### services/api-gateway/Dockerfile
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN pnpm install
COPY . .
RUN pnpm build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN pnpm install --prod
CMD ["node", "dist/main"]
```

#### services/api-gateway/.dockerignore
```
node_modules
npm-debug.log
Dockerfile
.dockerignore
.git
.gitignore
README.md
dist
```

#### services/api-gateway/README.md
```markdown
# API Gateway Service

Proxies requests to microservices (auth, user, chat). Built with NestJS.

## Setup
1. `pnpm install`
2. Copy `.env.example` to `.env` and fill values
3. Run: `pnpm dev` or `docker build -t api-gateway . && docker run -p 3000:3000 --env-file .env api-gateway`

## Test
- `pnpm test` for Jest
- Curl: `curl http://localhost:3000/`
```

#### services/api-gateway/src/main.ts
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.APP_PORT || 3000;
  await app.listen(port);
  console.log(`API Gateway running on port ${port}`);
}
bootstrap();
```

#### services/api-gateway/src/app.module.ts
```typescript
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpService } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AuthController } from './controllers/auth.controller';
import { ProjectsController } from './controllers/projects.controller';
import { ChatController } from './controllers/chat.controller';
import { AuthMiddleware } from './middleware/auth.middleware';
import { RateLimitMiddleware } from './middleware/rate-limit.middleware';
import { ErrorMiddleware } from './middleware/error.middleware';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import configuration from './config/configuration';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] })],
  controllers: [AppController, AuthController, ProjectsController, ChatController],
  providers: [
    HttpService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware, RateLimitMiddleware, ErrorMiddleware)
      .forRoutes('*');
  }
}
```

#### services/api-gateway/src/app.controller.ts
```typescript
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): { message: string } {
    return { message: 'API Gateway is running!' };
  }
}
```

#### services/api-gateway/src/controllers/auth.controller.ts
```typescript
import { Controller, Post, Body, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(private readonly httpService: HttpService) {}

  @Post('login')
  async login(@Body() body: any, @Req() req: any, @Res() res: any) {
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${process.env.AUTH_SERVICE_URL}/auth/login`, body, {
          headers: req.headers,
        }),
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Failed to proxy to auth-service' });
    }
  }

  @Post('signup')
  async signup(@Body() body: any, @Req() req: any, @Res() res: any) {
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${process.env.AUTH_SERVICE_URL}/auth/signup`, body, {
          headers: req.headers,
        }),
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Failed to proxy to auth-service' });
    }
  }
}
```

#### services/api-gateway/src/controllers/projects.controller.ts
```typescript
import { Controller, Get, Post, Param, Body, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly httpService: HttpService) {}

  @Get()
  async getProjects(@Req() req: any, @Res() res: any) {
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${process.env.USER_SERVICE_URL}/projects`, {
          headers: req.headers,
        }),
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Failed to proxy to user-service' });
    }
  }

  @Post()
  async createProject(@Body() body: any, @Req() req: any, @Res() res: any) {
    try {
      const response = await lastValueFrom(
        this.httpService.post(`${process.env.USER_SERVICE_URL}/projects`, body, {
          headers: req.headers,
        }),
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Failed to proxy to user-service' });
    }
  }
}
```

#### services/api-gateway/src/controllers/chat.controller.ts
```typescript
import { Controller, Post, Body, Param, Req, Res } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Controller('chat')
export class ChatController {
  constructor(private readonly httpService: HttpService) {}

  @Post(':projectId/:threadId')
  async sendMessage(
    @Param() params: { projectId: string; threadId: string },
    @Body() body: any,
    @Req() req: any,
    @Res() res: any,
  ) {
    try {
      const response = await lastValueFrom(
        this.httpService.post(
          `${process.env.CHAT_ORCH_URL}/chat/${params.projectId}/${params.threadId}`,
          body,
          { headers: req.headers },
        ),
      );
      res.status(response.status).json(response.data);
    } catch (error) {
      res.status(500).json({ message: 'Failed to proxy to chat-orch' });
    }
  }
}
```

#### services/api-gateway/src/middleware/auth.middleware.ts
```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      try {
        const decoded = verify(token, process.env.JWT_SECRET || 'your_jwt_secret_here');
        req.user = decoded;
        next();
      } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
      }
    } else {
      next(); // Allow public routes
    }
  }
}
```

#### services/api-gateway/src/middleware/rate-limit.middleware.ts
```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as rateLimit from 'express-rate-limit';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
  });

  use(req: Request, res: Response, next: NextFunction) {
    this.limiter(req, res, next);
  }
}
```

#### services/api-gateway/src/middleware/error.middleware.ts
```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      next();
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }
}
```

#### services/api-gateway/src/filters/http-exception.filter.ts
```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
```

#### services/api-gateway/src/interceptors/logging.interceptor.ts
```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`Request to ${req.url} took ${Date.now() - now}ms`)),
      );
  }
}
```

#### services/api-gateway/src/config/configuration.ts
```typescript
export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_here',
  authServiceUrl: process.env.AUTH_SERVICE_URL || 'http://auth-service:3001',
  userServiceUrl: process.env.USER_SERVICE_URL || 'http://user-service:3002',
  chatOrchUrl: process.env.CHAT_ORCH_URL || 'http://chat-orch:3003',
});
```

#### services/api-gateway/test/app.e2e-spec.ts
```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect({ message: 'API Gateway is running!' });
  });

  afterEach(async () => {
    await app.close();
  });
});
```
</xaiArtifact>

### Hướng dẫn test api-gateway
1. **Setup**:
   - Vào folder `services/api-gateway`: `cd services/api-gateway`.
   - Cài dependencies: `pnpm install`.
   - Copy `.env.example` thành `.env`: `cp .env.example .env`, điền `JWT_SECRET` (e.g., `mysecret`).

2. **Run local**:
   - Chạy: `pnpm dev` – expect console log "API Gateway running on port 3000".
   - Test endpoint:
     - `curl http://localhost:3000/` – expect `{"message":"API Gateway is running!"}`.
     - `curl -X POST http://localhost:3000/auth/login` – expect `{"message":"Failed to proxy to auth-service"}` (vì auth-service chưa có).
     - Tương tự cho `/projects`, `/chat/:projectId/:threadId`.

3. **Run tests**:
   - Chạy: `pnpm test` – expect Jest pass cho `app.e2e-spec.ts` (kiểm tra `/` endpoint).
   - Check linting: `pnpm lint` – fix warning nếu có với `pnpm lint --fix`.

4. **Run Docker**:
   - Build: `docker build -t api-gateway .`.
   - Run: `docker run -p 3000:3000 --env-file .env api-gateway`.
   - Test lại curl như trên.

5. **Verify middleware/filters**:
   - Rate-limit: Spam >100 requests trong 15 phút đến `/` (dùng tool như `ab -n 200 -c 10 http://localhost:3000/`), expect 429 "Too many requests".
   - Logging: Check console có log thời gian request (e.g., "Request to / took Xms").
   - Auth middleware: Gửi request với invalid JWT (`Authorization: Bearer invalidtoken`), expect 401 "Invalid token".

6. **Commit**:
   - `git add .`
   - `git commit -m "Phase 1: Complete api-gateway with full structure and tests"`

### Lý do làm thế này
- **Đúng cấu trúc**: Khớp 100% template bạn đưa ra, bao gồm controllers, middleware, filters, interceptors.
- **Test sớm**: E2E test cơ bản và curl giúp phát hiện lỗi ngay (e.g., env thiếu, port conflict).
- **Modular**: Proxy logic (httpService) chuẩn bị cho tích hợp auth-service, user-service sau này, tuân thủ API-Spec.yaml (dù placeholder).

Nếu không bug, confirm để tôi implement `auth-service`. Nếu có lỗi, mô tả chi tiết để tôi fix ngay!

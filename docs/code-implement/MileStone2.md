Cảm ơn bạn đã góp ý! Từ giờ, tôi sẽ highlight các thay đổi trong các file cũ bằng cách sử dụng **dấu ** (dấu sao) để bao quanh phần thay đổi, giúp bạn dễ dàng nhận diện và cập nhật. Dưới đây là hướng dẫn chi tiết cho **Milestone 2: Authentication Service**, với các thay đổi được highlight trong các file đã tồn tại từ Milestone 1 hoặc mới tạo.

---

### Milestone 2: Authentication Service (Full Setup)

**Mục Tiêu**:  
- Tạo Auth Service trong `/services/auth-service`.
- Triển khai JWT authentication với guard.
- Kết nối với DB từ Milestone 1 để lưu user info.

**Thời Gian Ước Tính**: 4 giờ.

---

### Bước Thực Hiện

#### 1. Khởi Tạo `/services/auth-service`
- Chạy lệnh từ root (`ChatAI-Platform`):  
  ```
  npm install -g @nestjs/cli
  sudo chown -R $USER:$USER ~/.npm  
  npx --force nest new services/auth-service --skip-install

  or
  npx nest new services/auth-service --skip-install
  ```
- CD vào: `cd services/auth-service`.

#### 2. Cài Đặt Dependencies
- Cài production deps:  
  ```
  npm i @nestjs/jwt @nestjs/passport passport passport-jwt @nestjs/config bcryptjs @nestjs/typeorm typeorm pg class-validator class-transformer reflect-metadata
  ```
- Cài dev deps:  
  ```
  npm i -D ts-node @types/node @types/passport-jwt @types/bcryptjs jest supertest @nestjs/testing ts-jest
  ```

#### 3. Cấu Hình `.env`
- Tạo file `/services/auth-service/.env` (file mới, không cần highlight):  
  ```
  DB_HOST=localhost
  DB_PORT=5432
  DB_USER=admin
  DB_PASS=secret
  DB_NAME=chatai
  JWT_SECRET=your-strong-secret-key-here  # Thay bằng chuỗi random 32+ ký tự
  PORT=3001  # Port riêng cho auth-service
  ```
- Add to `.gitignore`: `echo ".env" >> .gitignore`.

#### 4. Cập Nhật `package.json`
- Thay toàn bộ `/services/auth-service/package.json` (file mới, không cần highlight, nhưng tôi sẽ highlight các script thay đổi so với mặc định NestJS):  
  ```json
  {
    "name": "auth-service",
    "version": "0.0.1",
    "description": "",
    "author": "",
    "private": true,
    "license": "UNLICENSED",
    "scripts": {
      "build": "nest build",
      "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
      "start": "nest start",
      "start:dev": "nest start --watch",
      "start:debug": "nest start --debug --watch",
      "start:prod": "node dist/main",
      "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
      "test": "jest",
      "test:watch": "jest --watch",
      "test:cov": "jest --coverage",
      "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
      "test:e2e": "jest --config ./test/jest-e2e.json",
      ***"typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js -d src/data-source.ts",***
      ***"migration:generate": "npm run typeorm -- migration:generate src/migrations/ --name",***
      ***"migration:run": "npm run typeorm migration:run"***
    },
    "dependencies": {
      "@nestjs/common": "^10.0.0",
      "@nestjs/config": "^3.2.3",
      "@nestjs/core": "^10.0.0",
      "@nestjs/jwt": "^10.2.0",
      "@nestjs/passport": "^10.0.3",
      "@nestjs/platform-express": "^10.0.0",
      "@nestjs/typeorm": "^10.0.2",
      "bcryptjs": "^2.4.3",
      "class-transformer": "^0.5.1",
      "class-validator": "^0.14.1",
      "passport": "^0.7.0",
      "passport-jwt": "^4.0.1",
      "pg": "^8.12.0",
      "reflect-metadata": "^0.2.2",
      "rxjs": "^7.8.1",
      "typeorm": "^0.3.20"
    },
    "devDependencies": {
      "@nestjs/cli": "^10.0.0",
      "@nestjs/schematics": "^10.0.0",
      "@nestjs/testing": "^10.0.0",
      "@types/bcryptjs": "^2.4.6",
      "@types/express": "^4.17.17",
      "@types/jest": "^29.5.2",
      "@types/node": "^20.3.1",
      "@types/passport-jwt": "^3.0.13",
      "@types/supertest": "^6.0.0",
      "@typescript-eslint/eslint-plugin": "^6.0.0",
      "@typescript-eslint/parser": "^6.0.0",
      "eslint": "^8.42.0",
      "eslint-config-prettier": "^9.0.0",
      "eslint-plugin-prettier": "^5.0.0",
      "jest": "^29.5.0",
      "prettier": "^3.0.0",
      "source-map-support": "^0.5.21",
      "supertest": "^6.3.3",
      "ts-jest": "^29.1.0",
      "ts-loader": "^9.4.3",
      "ts-node": "^10.9.1",
      "tsconfig-paths": "^4.2.0",
      "typescript": "^5.1.3"
    },
    "jest": {
      "moduleFileExtensions": ["js", "json", "ts"],
      "rootDir": "src",
      "testRegex": ".*\\.spec\\.ts$",
      "transform": {
        "^.+\\.(t|j)s$": "ts-jest"
      },
      "collectCoverageFrom": ["**/*.(t|j)s"],
      "coverageDirectory": "../coverage",
      "testEnvironment": "node"
    }
  }
  ```
  - **Thay đổi nổi bật**: Thêm các script **typeorm**, **migration:generate**, **migration:run** để hỗ trợ migration và TypeORM CLI.

#### 5. Cấu Hình `data-source.ts`
- Tạo `/services/auth-service/src/data-source.ts` (file mới, không cần highlight):  
  ```typescript
  import { DataSource } from 'typeorm';

  export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USER || 'admin',
    password: process.env.DB_PASS || 'secret',
    database: process.env.DB_NAME || 'chatai',
    entities: ['src/entities/**/*.entity{.ts,.js}'],
    migrations: ['src/migrations/*.ts'],
    synchronize: false,
    logging: true,
  });
  ```

#### 6. Tạo Entity `User`
- Tạo `/services/auth-service/src/entities/user.entity.ts` (file mới, nhưng dựa trên Milestone 1, thêm field `password`):  
  ```typescript
  import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

  @Entity('users')
  export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    name: string;

    @Column({ unique: true, length: 100 })
    email: string;

    ***@Column({ length: 100 })***
    ***password: string;***  // Thêm field password cho auth

    @Column({ length: 50 })
    role: string;

    @CreateDateColumn()
    created_at: Date;
  }
  ```

#### 7. Cập Nhật `app.module.ts`
- Thay `/services/auth-service/src/app.module.ts` (file mặc định từ NestJS, thêm module và config):  
  ```typescript
  import { Module } from '@nestjs/common';
  import { AppController } from './app.controller';
  import { AppService } from './app.service';
  ***import { AuthModule } from './auth/auth.module';***
  ***import { ConfigModule } from '@nestjs/config';***
  ***import { TypeOrmModule } from '@nestjs/typeorm';***
  ***import { User } from './entities/user.entity';***

  @Module({
    imports: [
      ***ConfigModule.forRoot(),***
      ***TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USER || 'admin',
        password: process.env.DB_PASS || 'secret',
        database: process.env.DB_NAME || 'chatai',
        entities: [User],
        synchronize: false,
      }),***
      ***AuthModule,***
    ],
    controllers: [AppController],
    providers: [AppService],
  })
  export class AppModule {}
  ```

#### 8. Tạo Auth Module
- Tạo `/services/auth-service/src/auth/auth.module.ts` (file mới):  
  ```typescript
  import { Module } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { AuthController } from './auth.controller';
  import { JwtModule } from '@nestjs/jwt';
  import { PassportModule } from '@nestjs/passport';
  import { JwtStrategy } from './jwt.strategy';
  import { TypeOrmModule } from '@nestjs/typeorm';
  import { User } from '../entities/user.entity';

  @Module({
    imports: [
      PassportModule,
      JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
      }),
      TypeOrmModule.forFeature([User]),
    ],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
  })
  export class AuthModule {}
  ```

#### 9. Tạo Auth Service
- Tạo `/services/auth-service/src/auth/auth.service.ts` (file mới):  
  ```typescript
  import { Injectable } from '@nestjs/common';
  import { InjectRepository } from '@nestjs/typeorm';
  import { Repository } from 'typeorm';
  import { User } from '../entities/user.entity';
  import * as bcrypt from 'bcryptjs';

  @Injectable()
  export class AuthService {
    constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
    ) {}

    async register(email: string, password: string, name: string, role: string = 'user') {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepository.create({ email, password: hashedPassword, name, role });
      return this.userRepository.save(user);
    }

    async validateUser(email: string, password: string) {
      const user = await this.userRepository.findOne({ where: { email } });
      if (user && await bcrypt.compare(password, user.password)) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    }
  }
  ```

#### 10. Tạo Auth Controller
- Tạo `/services/auth-service/src/auth/auth.controller.ts` (file mới):  
  ```typescript
  import { Controller, Post, Body, UseGuards } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { JwtAuthGuard } from './jwt-auth.guard';
  import { AuthGuard } from '@nestjs/passport';

  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() body: { email: string; password: string; name: string }) {
      return this.authService.register(body.email, body.password, body.name);
    }

    @Post('login')
    @UseGuards(AuthGuard('jwt'))
    async login(@Body() body: { email: string; password: string }) {
      const user = await this.authService.validateUser(body.email, body.password);
      if (!user) throw new Error('Invalid credentials');
      return { message: 'Login successful', user };
    }

    @Post('protected')
    @UseGuards(JwtAuthGuard)
    protectedRoute() {
      return { message: 'This is a protected route' };
    }
  }
  ```

#### 11. Tạo JWT Strategy
- Tạo `/services/auth-service/src/auth/jwt.strategy.ts` (file mới):  
  ```typescript
  import { ExtractJwt, Strategy } from 'passport-jwt';
  import { PassportStrategy } from '@nestjs/passport';
  import { Injectable } from '@nestjs/common';

  @Injectable()
  export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
      super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: process.env.JWT_SECRET,
      });
    }

    async validate(payload: any) {
      return { userId: payload.sub, email: payload.email, role: payload.role };
    }
  }
  ```

#### 12. Tạo JWT Auth Guard
- Tạo `/services/auth-service/src/auth/jwt-auth.guard.ts` (file mới):  
  ```typescript
  import { Injectable } from '@nestjs/common';
  import { AuthGuard } from '@nestjs/passport';

  @Injectable()
  export class JwtAuthGuard extends AuthGuard('jwt') {}
  ```

#### 13. Cập Nhật `main.ts`
- Thay `/services/auth-service/src/main.ts` (file mặc định từ NestJS, thêm config port):  
  ```typescript
  import { NestFactory } from '@nestjs/core';
  import { AppModule } from './app.module';
  ***import { ConfigService } from '@nestjs/config';***

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    ***const configService = app.get(ConfigService);***
    ***await app.listen(configService.get<number>('PORT', 3001));***
  }
  bootstrap();
  ```

#### 14. Generate Migration
- Chạy:  
  ```
  npm run migration:generate UserAuthSchema
  ```
- Edit file `src/migrations/175948xxxx-UserAuthSchema.ts` (file mới, nhưng dựa trên schema từ Milestone 1, thêm `password`):  
  ```typescript
  import { MigrationInterface, QueryRunner } from "typeorm";

  export class UserAuthSchema1759480000000 implements MigrationInterface {
    name = 'UserAuthSchema1759480000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`
        CREATE TABLE "users" (
          "id" SERIAL NOT NULL,
          "name" character varying(100) NOT NULL,
          "email" character varying(100) NOT NULL UNIQUE,
          ***"password" character varying(100) NOT NULL,***  // Thêm field password
          "role" character varying(50) NOT NULL,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "PK_users_id" PRIMARY KEY ("id")
        )
      `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP TABLE "users"`);
    }
  }
  ```
- Chạy: `npm run migration:run`.

#### 15. Test Auth Service
- Tạo `/services/auth-service/src/auth/auth.service.spec.ts` (file mới):  
  ```typescript
  import { Test, TestingModule } from '@nestjs/testing';
  import { AuthService } from './auth.service';
  import { getRepositoryToken } from '@nestjs/typeorm';
  import { User } from '../entities/user.entity';
  import * as bcrypt from 'bcryptjs';

  describe('AuthService', () => {
    let service: AuthService;

    const mockUserRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    };

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          AuthService,
          { provide: getRepositoryToken(User), useValue: mockUserRepository },
        ],
      }).compile();

      service = module.get<AuthService>(AuthService);
    });

    it('should register a user', async () => {
      const user = { id: 1, name: 'Test', email: 'test@example.com', password: 'hashed', role: 'user' };
      mockUserRepository.create.mockReturnValue(user);
      mockUserRepository.save.mockResolvedValue(user);
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed');

      const result = await service.register('test@example.com', 'password', 'Test');
      expect(result).toEqual(user);
      expect(bcrypt.hash).toHaveBeenCalled();
    });
  });
  ```
- Chạy: `npm test`.

#### 16. CI/CD Setup
- Tạo `.github/workflows/test-auth.yaml` trong root (file mới):  
  ```yaml
  name: Auth Service CI

  on:
    push:
      paths:
        - 'services/auth-service/**'

  jobs:
    test:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - name: Setup Node.js
          uses: actions/setup-node@v3
          with:
            node-version: '20'
        - name: Install Dependencies
          run: cd services/auth-service && npm i
        - name: Run Tests
          run: cd services/auth-service && npm test
        - name: Build
          run: cd services/auth-service && npm run build
  ```
- Push: `git add . && git commit -m "Milestone 2: Auth Service" && git push`.

### Kết Quả
- **API Endpoint**:  
  - `POST /auth/register` (tạo user).
  - `POST /auth/login` (trả token JWT).
  - `POST /auth/protected` (chỉ truy cập với token).
- **Test**: Pass với coverage.
- **CI/CD**: Action chạy thành công.

Chạy từng bước, báo lỗi nếu có! Sẵn sàng cho Milestone 3!

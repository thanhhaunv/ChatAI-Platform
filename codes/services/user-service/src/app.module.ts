import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Project } from './entities/project.entity';
import { ProjectMember } from './entities/project_member.entity';
import { Conversation } from './entities/conversation.entity';
import { Agent } from './entities/agent.entity';
import { Message } from './entities/message.entity';
import { BillingLog } from './entities/billing_log.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USER || 'admin',
        password: process.env.DB_PASS || 'secret',
        database: process.env.DB_NAME || 'chatai',
        entities: [User, Project, ProjectMember, Conversation, Agent, Message, BillingLog],
        synchronize: false,
        logging: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
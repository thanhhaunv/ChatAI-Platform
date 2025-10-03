import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';
import { Conversation } from './conversation.entity';
import { Agent } from './agent.entity';

@Entity('billing_log')
export class BillingLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.billingLogs)
  user: User;

  // @ManyToOne(() => Project, project => project.billingLogs)  // Assume relation if needed
  // project: Project;

  // @ManyToOne(() => Conversation, conversation => conversation.billingLogs)  // Assume relation
  // conversation: Conversation;

  @ManyToOne(() => Agent, agent => agent.billingLogs)
  agent: Agent;

  @Column('float')
  cost: number;

  @Column('float')
  tokens: number;

  @CreateDateColumn()
  timestamp: Date;
}
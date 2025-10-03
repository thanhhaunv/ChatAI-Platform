import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Conversation } from './conversation.entity';
import { User } from './user.entity';
import { Agent } from './agent.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Conversation, conversation => conversation.messages)
  conversation: Conversation;

  @ManyToOne(() => User, user => user.messages)
  user: User;

  @ManyToOne(() => Agent, agent => agent.messages)
  agent: Agent;

  @Column({ type: 'text' })
  user_message: string;

  @Column({ type: 'text' })
  agent_response: string;

  @Column({ type: 'json', nullable: true })
  attachments: object[];

  @Column('float')
  tokens_used: number;

  @CreateDateColumn()
  created_at: Date;
}